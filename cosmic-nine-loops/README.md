# Cosmic9 — the nine-loop six-gluon MHV amplitude in planar N=4 super-Yang–Mills: symbol and function

Computer-readable files for the symbol and the function of E^(9), the nine-loop coefficient of the BDS-like normalised
six-gluon MHV amplitude of planar N=4 super-Yang–Mills theory, in the conventions of arXiv:2308.08199 (Dixon and Liu),
together with the nine-loop three-point form factor from which the symbol in quintuple-coproduct form was obtained, the
intermediate data, the flux-tube data that closed that computation, and the recorded outputs of checks made on these
files. The method, its assumptions, the checks and what remains untested are described in
`validation/method_and_validation.md`; the conventions are stated in full in `conventions.md`.

The symbol in quintuple-coproduct form was computed by the form-factor route, the eight-loop route of arXiv:2308.08199
one loop higher: the nine-loop form factor is bootstrapped, antipodal duality maps it to the amplitude on the
parity-preserving surface Δ = 0, and a layered lift off that surface, closed by the flux-tube OPE data, gives the full
symbol. The septuple-coproduct file in `MHV9/` comes from a separate direct bootstrap of the nine-loop symbol in the
space of hexagon functions; the two computations agree on every coefficient compared. The amplitude as a function, in
`function/`, was obtained separately. Everything is at symbol level except the function-level files in `function/`.

## Conventions in one paragraph

(The full statement, with a table of the letter notations used in the different files, is `conventions.md`.)

Amplitude letters, index 0..8: ah = uh/(vh wh), bh, ch (cyclic), dh = (1−uh)/uh, eh, fh, and the parity-odd yu, yv, yw
(the hatted alphabet of arXiv:2308.08199; Δ = 0 ⇔ y_i = 1). Form-factor letters a..f = u/(vw), v/(wu), w/(uv), (1−u)/u,
(1−v)/v, (1−w)/w with u+v+w = 1 (the alphabet of arXiv:2204.11901, without square-root rescaling). Words are written
first entry first. Coupling g² = λ/(16π²); E^(L) is the coefficient of g^{2L}. Primes p1 = 2147483647, p2 = 2147483629,
p3 = 2147483587 (form factor only); residues are non-negative representatives. Antipodal map: reverse the word, relabel
a,b,c,d,e,f → dh,eh,fh,ah,bh,ch, and divide by 2 for each of d,e,f in the form-factor word (see amplitude/FORMAT.md and
form_factor/FORMAT.md).

## What is where

| directory | content |
|---|---|
| `amplitude/` | the nine-loop symbol: 424 quintuple coproducts over the weight-13 hexagon basis, mod p1 and mod p2, the lift before the OPE step, with its five directions, the second-prime lift; `FORMAT.md` |
| `hexagon_space/` | the extended-Steinmann hexagon symbol space to weight 13 (14 at p1) as nested coproduct tensors at p1 and p2, the same at four 21-bit primes with the exact reconstruction through weight 9, the 41 pair relations, the restriction to Δ = 0, and the exact MHV multiple-final-entry tails W_1..W_5 (6/21/62/166/424) |
| `samples/` | `E9_sample_coefficients.txt`: 20,630 random weight-18 words (20,400 with nonzero coefficient, 230 with zero) with their coefficients modulo each prime and as rationals, to check any other representation of the symbol against without computing anything |
| `form_factor/` | the nine-loop form factor: the certified rational coefficient matrix (108 × 4171) with the three per-prime solutions, the exact front basis, the predicted final-entry tables at weights 9–13 (9–14 at p1), the exact octuple basis, the 279 rational octuple components (295,186,924 terms), the coproduct spans, the parameter cascade, and the nine-loop form-factor OPE terms; `FORMAT.md` |
| `delta0/` | the amplitude on Δ = 0: the symbol mod p1, stored as its 279 octuple coproduct components, one file per form-factor octuple (1.97 GB), its projection onto the 111 y-free quintuples (those whose pivot word contains no y letter; `conventions.md`, section 6), the term counts |
| `ope_data/` | the flux-tube data of the amplitude side (single gluon, two-gluon bound state to N³LL, the Born-level two-gluon continuum, the helicity-zero sector); `README.md` |
| `lower_loops/` | the eight-loop lift before and after its OPE step (the control) |
| `validation/` | `method_and_validation.md` (the method and every check, with pointers); `records/` (the recorded outputs of checks made on the distributed files, among them the comparison of the two representations of the symbol on all 107,053 nonzero word coefficients that determine the septuple file; `oracle_validation_results.json` is the form-factor computation's own record of its symmetry, vanishing and Δ = 0 checks) |
| `function/` | the amplitude as a function: the septuple file with the exact zeta-valued completion (the symbol part plus 786,352 beyond-the-symbol coefficients), the 72 constants of integration at weights 12–18 (1,173 exact rational coefficients over a stated basis of multiple zeta values), the same constants as the full table of 1,548 independent tails, and E^(9)(1,1,1) alone; the function was obtained separately; it has been computed once, and there is no second, independent computation of it |
| `MHV9/` | the symbol in the septuple-coproduct format of MHV8quintuples.txt (arXiv:2308.08199): the 8,028 septuple final entries as exact rational combinations of the weight-11 basis functions YE(11,N)/YO(11,N) of SixGluonAmpsAndCops.m (arXiv:1903.10890), with the nested final-entry relations, and the same content as JSON (`E9_exact_levels.zip`, whose tables for levels 1–4, marked `"external": true`, are Dixon and Liu's relations from MHV8quintuples.txt); with that basis file this is a complete definition of the symbol; its exact coefficients come not from the form-factor route but from a separate direct bootstrap of the nine-loop symbol in the space of hexagon functions; that computation's word coefficients were reconstructed exactly from five primes and checked at a sixth. The septuple file and the quintuple representation agree on every coefficient compared: all 107,053 nonzero coefficients that determine the septuple file, 3,401 of them modulo the two primes only. A 2,000-word check is recorded in `validation/records/08_output.txt`. The full comparison, one row per coefficient, is recorded in `validation/records/09_septuple_vs_quintuple_107053_words.txt.gz`. |
| `conventions.md` | the conventions in full: kinematics, letters and the notations of the different files, normalisation, the coproduct bases and final-entry spaces, the form-factor alphabet, antipodal duality, and the finite-field and reconstruction rules |
| `MANIFEST.sha256`, `MANIFEST.sizes` | checksums and sizes of every file |

## Reading the files

* The coefficient of an explicit weight-18 word follows from the quintuple representation by thirteen matrix products (amplitude/FORMAT.md, section 3), or from the septuple-coproduct file with the coproduct tables of SixGluonAmpsAndCops.m (MHV9/, in the format of MHV8quintuples.txt). `samples/E9_sample_coefficients.txt` gives 20,630 words with their coefficients to test either reading against.
* To verify the download: `shasum -a 256 -c MANIFEST.sha256` from this directory. The eight files over 100 MB are hosted on
  Zenodo (DOI 10.5281/zenodo.22949278); download them into their listed paths first (for example
  `delta0/E9_octuples_Delta0_mod2147483647.tar.gz`), or the check reports them as missing.
* Checks made on these files, with their recorded outputs: `validation/method_and_validation.md` and `validation/records/`.

## What is not here

The programs of the computation; the exact rational form of 3,821 of the 1,018,297 nonzero basis coordinates of the
quintuple representation (3,557 for which the two residues give no fraction within the reconstruction bound, and 264 whose
reconstructed denominators are not powers of two), which its two primes do not certify. The septuple-coproduct
file in `MHV9/` gives the symbol exactly.

Nine-loop results by Claude (Anthropic). 16 September 2026.
