/* Hawk Hill marine-layer inversion predictor: feature building, GBM, lead-dependent calibration, uncertainty band, climatology. */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory(require('./model_data.js').HH_MODEL);
  else root.HHPredictor = factory(root.HH_MODEL);
})(typeof self !== 'undefined' ? self : (typeof window !== 'undefined' ? window : globalThis), function (M) {
  'use strict';
  const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
  const logit = p => { p = clamp(p, 1e-4, 1 - 1e-4); return Math.log(p / (1 - p)); };
  const sigm = z => 1 / (1 + Math.exp(-z));
  const Z10 = 1.2815515655446004;

  function dayOfYearUTC(d) {
    return Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 1)) / 86400000) + 1;
  }
  function timeFeats(d) {
    const doy = dayOfYearUTC(d), hr = d.getUTCHours();
    const a = 2 * Math.PI * doy / 365.25, b = 2 * Math.PI * hr / 24;
    return { sdoy: Math.sin(a), cdoy: Math.cos(a), sdoy2: Math.sin(2 * a), cdoy2: Math.cos(2 * a), shr: Math.sin(b), chr: Math.cos(b) };
  }
  // climatological logit from the harmonic model (25 coefficients)
  function climLogit(d) {
    const doy = dayOfYearUTC(d), hr = d.getUTCHours();
    const a = 2 * Math.PI * doy / 365.25, b = 2 * Math.PI * hr / 24;
    const A = [1, Math.sin(a), Math.cos(a), Math.sin(2 * a), Math.cos(2 * a)];
    const B = [1, Math.sin(b), Math.cos(b), Math.sin(2 * b), Math.cos(2 * b)];
    let z = 0, k = 0;
    for (const x of A) for (const y of B) z += M.clim.coef[k++] * x * y;
    return z;
  }
  // build the feature vector from hourly values at Hawk Hill (hh) and Sacramento (sac)
  function features(d, hh, sac) {
    const wd = hh.wd * Math.PI / 180;
    const f = {
      t2m: hh.t2m, td: hh.td, dd: hh.t2m - hh.td, rh: hh.rh, ws: hh.ws,
      u: -hh.ws * Math.sin(wd), v: -hh.ws * Math.cos(wd), msl: hh.msl, cc: hh.cc,
      t_sac: sac.t2m, dT_sac: sac.t2m - hh.t2m, dP_sac: hh.msl - sac.msl, td_sac: sac.td,
      ...timeFeats(d)
    };
    return M.gbm.features.map(k => f[k]);
  }
  function gbmLogit(x) {
    let out = M.gbm.baseline;
    for (const t of M.gbm.trees) {
      let n = 0;
      while (!t.leaf[n]) {
        const v = x[t.feat[n]];
        if (v == null || Number.isNaN(v)) n = t.mgl[n] ? t.left[n] : t.right[n];
        else n = v <= t.thr[n] ? t.left[n] : t.right[n];
      }
      out += t.value[n];
    }
    return out;
  }
  const lerp = (a, b, w) => a + (b - a) * w;
  const lerpObj = (A, B, w) => { const o = {}; for (const k in A) o[k] = lerp(A[k], B[k], w); return o; };
  const CLIM_CAL = { a: 0, b: 0, g: 1 };
  const IDENT_BAND = { a: 0, b: 1, g: 0, sigma: 0 };
  const FULL_CLIM_LEAD = 14;   // beyond this lead the forecast is given no weight
  function calibParams(L) {
    if (L <= 0) return M.calib['0'];
    if (L <= 7) { const i = Math.floor(L); return i === L ? M.calib[String(i)] : lerpObj(M.calib[String(i)], M.calib[String(i + 1)], L - i); }
    if (L <= FULL_CLIM_LEAD) return lerpObj(M.calib['7'], CLIM_CAL, (L - 7) / (FULL_CLIM_LEAD - 7));
    return CLIM_CAL;
  }
  function bandParams(L) {
    if (L <= 0) return IDENT_BAND;
    if (L <= 1) return lerpObj(IDENT_BAND, M.band['1'], L);
    if (L <= 7) { const i = Math.floor(L); return i === L ? M.band[String(i)] : lerpObj(M.band[String(i)], M.band[String(i + 1)], L - i); }
    if (L <= FULL_CLIM_LEAD) return lerpObj(M.band['7'], M.band.clim, (L - 7) / (FULL_CLIM_LEAD - 7));
    return M.band.clim;
  }
  /** Predict for target time d (Date) given hourly forecast values (or null for climatology-only). leadDays = (target - now) in days. */
  function predict(d, hh, sac, leadDays) {
    const zc = climLogit(d), clim = sigm(zc);
    if (!hh || !sac || [hh.t2m, hh.td, hh.rh, hh.ws, hh.wd, hh.msl, hh.cc, sac.t2m, sac.msl, sac.td].some(v => v == null || Number.isNaN(v))) {
      const bp = M.band.clim, mu = bp.a + bp.g * zc, p = clim;
      return { p, lo: Math.min(p, sigm(mu - Z10 * bp.sigma)), hi: Math.max(p, sigm(mu + Z10 * bp.sigma)), clim, mode: 'climatology', lead: leadDays, zRaw: null };
    }
    const L = Math.max(0, leadDays);
    const z = gbmLogit(features(d, hh, sac));
    const c = calibParams(L);
    const zcal = c.a + c.b * z + c.g * zc;
    const p = sigm(zcal);
    const bp = bandParams(L);
    const mu = bp.a + bp.b * zcal + bp.g * zc;
    let lo = sigm(mu - Z10 * bp.sigma), hi = sigm(mu + Z10 * bp.sigma);
    if (L > 0.02) { lo = Math.min(lo, p); hi = Math.max(hi, p); } else { lo = hi = p; }
    return { p, lo, hi, clim, mode: L > FULL_CLIM_LEAD ? 'climatology' : 'forecast', lead: leadDays, zRaw: z, pRaw: sigm(z) };
  }
  return { predict, climLogit, climProb: d => sigm(climLogit(d)), features, gbmLogit, timeFeats, calibParams, bandParams, model: M, sigm, logit };
});
