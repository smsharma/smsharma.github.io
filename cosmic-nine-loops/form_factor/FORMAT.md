# The nine-loop three-point form factor symbol E_c^(9): files and formats

(All files named here are in this directory; the hexagon-space files in ../hexagon_space/.)

E_c^(9) is the BDS-like normalised form factor symbol at nine loops (weight 18), planar N=4 SYM, in the conventions of
arXiv:2204.11901 and its ancillary file Esymb.txt: alphabet a..f with a = u/(vw), b = v/(wu), c = w/(uv), d = (1−u)/u,
e = (1−v)/v, f = (1−w)/w, u+v+w = 1, no √ rescaling of a, b, c; words are written first letter first. All residues are
non-negative representatives mod the stated prime; p₁ = 2147483647, p₂ = 2147483629, p₃ = 2147483587.

## 1. The rational coefficient matrix: E9_C5xB13_rational_3primes.npz

E_c^(9) = Σ_{i=0..107} Σ_{j=0..4170} c[i, j] · F_i ⊗ B_j

* **`E9_C5xB13_rational_3primes.npz`** (primary): `num`, `den` — (108 × 4171) arrays of decimal strings (numerator,
  denominator) of c[i, j], certified by three-prime Wang reconstruction (p₁p₂p₃ ≈ 9.9·10²⁷; all 450 468 entries certified;
  denominators are powers of 2 ≤ 2¹⁴, |numerators| ≤ 1.33·10¹¹; `ok` = all True; statistics in the .json).
  
* `E9_C5xB13_solution_modp.npz` / `_modp2.npz` / `_modp3.npz`: the same matrix as residues, key `c` (int64), plus `p`.
  Also in these files: `C5_words`, `C5_coeffs_indptr/indices/data` (the C₅ basis as a CSR matrix over `C5_words`),
  `X_dihedral_basis` (60 × 108 × 4171, the sewn dihedral-invariant basis in internal eigen coordinates) and
  `part_solution` (coefficients selecting E_c^(9) in that basis) — internal, not needed to read the result.

### Row index i — the weight-5 front basis F_i (C₅, 108 elements)
`C5_basis_rational.txt` (exact; `C5_basis_modp.txt`/`_modp2.txt` are its residues): 108 blocks `# F_i`, one line per term
`<num>/<den> <5-letter word>`, i.e. F_i = Σ coeff · (l₁ ⊗ l₂ ⊗ l₃ ⊗ l₄ ⊗ l₅). The basis is the RREF-kernel basis of the
local constraints restricted to the coaction-restricted space C₅; it is not dihedrally symmetric element by element.

### Column index j — the weight-13 final-entry basis B_j (4171 elements)
B_j is defined by the nested coproduct tables of the amplitude side, `FF_final_entry_tables_w9-13_mod<p>.npz` at p₂ and p₃
and `FF_final_entry_tables_w9-14_mod2147483647.npz` at p₁ (keys `p`, `weights`, `pivots_s` (N_s × s, letters 0..5 = a..f), `table_s` (N_s × 6·N_{s−1}), s = 9..13 (9..14 at p₁); `pivots_8` = the
279 independent octuples of FFmultifinalentry.txt in the order of Esymb.txt/octindep279):

B^(s)_j = Σ_{y=0..5} Σ_{k=0..N_{s−1}−1} table_s[j, y·N_{s−1} + k] · ( y ⊗ B^(s−1)_k ),   s = 13, 12, …, 9,

with the letter y prepended in front of the weight-(s−1) tail, and the recursion terminating at the weight-8 octuple
basis B^(8)_k given EXACTLY (rationals) in `B8_octuple_basis_exact.txt` (279 blocks `# B_<8-letter string>`, lines
`<num>/<den> <8-letter word>`, same order as `pivots_8`). Row j of `table_s` has a 1 in the column of its word pivot
`pivots_s[j]` (pivot = first letter pivots_s[j][0] prepended to the tail whose pivot is pivots_s[j][1:]) and zeros in
the other pivot columns (word-pivot RREF form), so the basis is canonical over Q; the residues of the same canonical basis
are supplied mod each prime, and the column order j is the row order of `table_13` (= `pivots_13` order) in every prime.
The table entries themselves are rationals with large numerators/denominators, so they are supplied as residues; with the
three primes the Wang bound (~7·10¹³) may still be insufficient for some entries — hence the explicit octuple symbols below
are the recommended route to explicit words.

## 2. Explicit symbols: the 279 octuple components (E9_octuples_rational.npz)

E_c^(9) = Σ_{s ∈ octindep279} E^s ⊗ B^(8)_s, where E^s is the weight-10 symbol multiplying the octuple final entry s
(the {10,8} coproduct component). `E9_octuples_rational.npz`: `strings` (279 octuple strings, octindep279 order), `offsets`
(int64, length 280) and one flat array each for `words` (int64 base-6 words, first letter most significant, digits
0..5 = a..f), `num` (int64) and `log2den` (uint8); the terms of octuple `strings[s]` are entries `offsets[s]` to
`offsets[s+1]-1` of each flat array, with coefficient = num / 2^log2den, reconstructed from the three primes (see the .json
for the certification statistics; the word supports were identical at all three primes); `primes`, `weight` = 10.
Total 295 186 924 terms. No array in this file is an object
array, so `numpy.load` reads it with its default `allow_pickle=False`.

To obtain the full weight-18 symbol in words: E_c^(9) = Σ_s Σ_{t ∈ words(E^s)} Σ_{r ∈ B^(8)_s} coef_t · λ_{rs} · (t ⊗ r)
(≈ 295 M × average 6000 words per B_s — very large; prefer the factorised form).

## 3. Other data

* `E9_spans.json`: {n,1,…,1} coproduct-span dimensions n = 1..10 (3, 9, 21, 48, 108, 242, 517, 809, 487, 279), and the
  weight-9 final entries: the {9,1,…,1} components span 487 of the 1674 candidate nine-letter final strings (each of the
  six letters followed by one of the 279 independent octuple final entries, 6 × 279), so the form factor satisfies 1674 − 487 = 1187 relations among
  them; the space predicted by antipodal duality has dimension 491 (`hexagon_predicted_independent`; also the weight-9 column of the header of
  `FFmultifinalentry_w9-13_predicted_mod2147483647.txt`), i.e. 1183
  relations, so the nine-loop form factor satisfies four relations beyond the predicted ones.
* `cascade_L9_w5_W13.json`: the parameter count after each constraint of the nine-loop cascade; `seam9_stages.json`: the
  dimensions at each stage of the seam (the ansatz, the pair and triple kernel, the branch cuts).
