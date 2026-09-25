# E_c^(9) as a C_5 x B_13 coefficient matrix (mod p = 2147483647)

E_c^(9) = sum_{i,j} c[i, j]  F_i (x) B_j   (symbol level; all residues in [0, p)).

* c (a.k.a. X_full): int64 (108, 4171).  i indexes the weight-5 C-space basis F_i (108 elements), j indexes the weight-13
  final-entry basis B_j of FF_final_entry_tables_w9-14_mod2147483647.npz (pivots_13 order, i.e. B_j = the
  table-basis element whose word-pivot is pivots_13[j], exactly the nested table rows tau_j).
* C_5 basis: F_i = sum_t C5_coeffs[i, t] * word(C5_words[t]);  C5_coeffs is CSR (indptr/indices/data) of shape
  (108, len(C5_words)); C5_words are base-6 integers, first letter most significant, digits 0..5 = a..f
  (a=u/(vw), b=v/(wu), c=w/(uv), d=(1-u)/u, e=(1-v)/v, f=(1-w)/w; Esymb.txt normalization, no sqrt rescaling).
  The basis is the RREF-kernel basis of the local constraints (pairs, triples, branch cuts) restricted to the
  48-dimensional weight-4 C-space; it is NOT dihedrally symmetric element by element.
* X_dihedral_basis: (60, 108, 4171) dihedral-invariant sewn basis in the cyclic-eigen coordinates used internally
  (cyclic-eigen bases of the weight-5 C-space and of B_13, which are not distributed); part_solution: the coefficient vector selecting
  E_c^(9) in that basis.  X_full is the letter-basis conversion of the same object.
* Derived: the 279 octuple coproduct components (weight-10 symbols), with rational coefficients, are in
  E9_octuples_rational.npz (format in FORMAT.md, section 2); their term counts are in E9_octuple_terms.json.
