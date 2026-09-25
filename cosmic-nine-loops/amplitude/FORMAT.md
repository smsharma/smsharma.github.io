# The nine-loop six-gluon MHV symbol E^(9): files and formats

The object is the symbol of E^(9), the g^18 coefficient of the BDS-like normalised six-gluon MHV amplitude
E(uh,vh,wh) = sum_L g^{2L} E^(L) of Dixon and Liu, arXiv:2308.08199, with g^2 = g_YM^2 N_c/(16 pi^2); the
normalisation factor rho(g^2) is independent of the kinematics (its coefficients are zeta values), so it is invisible at
symbol level. Letters, index 0..8:

    ah = uh/(vh wh),  bh = vh/(wh uh),  ch = wh/(uh vh),  dh = (1-uh)/uh,  eh = (1-vh)/vh,  fh = (1-wh)/wh,
    yu = (uh - z+)/(uh - z-) and cyclic,  z+- = [-1 + uh + vh + wh +- sqrt(Delta)]/2,
    Delta = (1 - uh - vh - wh)^2 - 4 uh vh wh   (Delta = 0 <=> yu = yv = yw = 1).

Words are written first letter first (first entry on the left, final entry on the right). Coefficients refer to the
letters as written, not to square roots. Residues are non-negative representatives modulo p1 = 2147483647 = 2^31-1 and
p2 = 2147483629.

## 1. The representation

    E^(9) = sum_{alpha=1..424} E_alpha (x) S_alpha

* `S_alpha`: the 424 MHV quintuple final entries, a word-pivot basis of the tail space W_5 constructed as in arXiv:2308.08199,
  given as exact rationals in `../hexagon_space/MHV_final_entry_spaces.txt` (the lines beginning `5 `; the same file gives
  W_1..W_4, of dimensions 6, 21, 62, 166; the 111 quintuples of layer 0, whose pivot words contain no y letter, are the "y-free" quintuples of
  ../conventions.md, section 6). Each line:
  `k pivot_word layer parity : coeff*word coeff*word ...` (word = the last k letters, left to right).
* `E_alpha`: an element of the weight-13 extended-Steinmann hexagon symbol space H_13 (dimension 5431), given by its
  coordinates in the nested coproduct basis of `../hexagon_space/hexspace_p2147483647_w14.npz` (first prime, to weight 14)
  or `../hexagon_space/hexspace_p2147483629.npz` (second prime, to weight 13):
  F^(n)_i = sum_{k,j} T_n[k][i,j] F^(n-1)_j (x) phi_k (letter phi_k appended at the end; k = 0..8 = ah..yw).
  The tensors T_n[k] are the arrays `T_<n>_<k>` (d_n x d_{n-1}, int32 residues); `dims` = [1,3,6,13,26,51,98,184,340,
  613,1085,1887,3224,5431(,9014)]; `parity_<n>` = +1/-1 per basis element.

## 2. Files in this directory

* `E9_symbol_complete_mod2147483647.npz`, `E9_symbol_complete_mod2147483629.npz` — the primary data: `E0` (424 x 5431,
  int64 residues mod p) = coordinates of E_alpha; `pivots` (424 x 5) = the pivot word of each row, in the order of the
  tails file; `p`, `n` = 13, `L` = 9; `V` (an empty 424 x 5431 x 0 array: no direction is left) and `tau_N3LL` (the
  value fixing the last direction, an internal coordinate); `log` and `fix_note` are internal notes of the program (the
  stages, ranks and free counts they record are described in section 4 of `../validation/method_and_validation.md`, where
  the stages are called layers; the tau values are internal coordinates of the directions).
  1,018,297 of the 2,302,744 coordinates are nonzero at both primes; every E_alpha is nonzero.
* Rational form of the coordinates: not distributed as a file. Each coordinate follows from its two residues by Chinese
  remaindering and rational reconstruction, certified by the rule of section 3 (see ../conventions.md, section 9.4).
  Reconstruction finds a fraction with |n|, d < 2^30 for 1,014,740 of the 1,018,297 nonzero coordinates; the 1,014,476
  of these with power-of-two denominators (99.62% of all nonzero coordinates) are certified. With the box |n| ≤ 2^44,
  1 ≤ d ≤ 2^16 it reconstructs all 1,018,297 coordinates uniquely, always with power-of-two denominators (this is not a
  certification; see ../conventions.md, section 9.4).
* `E9_lift_quintuples_mod2147483647.npz` — the lift before the OPE step (the origin condition imposed), with its five
  directions: `E0` (a particular solution) and `V` (424 x 5431 x 5) the five directions left after the origin condition
  (eight directions remain before the origin step); the complete symbol is E0 plus a combination of the five, fixed by
  the flux-tube data (a check that the complete symbol lies in this span is recorded in
  `../validation/records/03_output.txt`).
* `symlift_seam_L9_mod2147483629.npz` — the second-prime counterpart of `E9_lift_quintuples_mod2147483647.npz` (the lift
  before the OPE step, with its five directions; same keys).

## 3. The coefficient of an explicit word

    coeff(x_1 ... x_18) = sum_alpha S_alpha[x_14..x_18] * ( E0[alpha] . T_13[x_13] . T_12[x_12] ... T_1[x_1] . [1] )  (mod p)

evaluated right-to-left as 13 matrix products (exact modular products of 31-bit residues can be formed in floating point by
splitting each residue into 16-bit halves). The rational coefficient follows from the two residues by Chinese remaindering and
rational reconstruction; it is certified when the fraction has height < 2^30 and a power-of-two denominator, as it is for every
word of the distributed sample (`../samples/E9_sample_coefficients.txt`, 20,630 words with their residues and rationals).

## 4. Symmetries (as verified on the data)

Cycle `ah->bh->ch->ah, dh->eh->fh->dh, yu->1/yv, yv->1/yw, yw->1/yu`; flip `ah<->bh, dh<->eh, yu<->yv`; E is parity
even (y_i -> 1/y_i), so words with an odd number of y letters have coefficient 0. First entries in {ah, bh, ch}; MHV
final entries (never ah, bh, ch); extended Steinmann: ah, bh, ch never adjacent to one another, and the pairs
ah dh, dh ah, bh eh, eh bh, ch fh, fh ch never occur.
