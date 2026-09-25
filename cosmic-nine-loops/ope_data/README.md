# Flux-tube (near-collinear OPE) data used to close the nine-loop lift

Conventions: the OPE variables of arXiv:1903.10890, u = F/D, v = F S^2/((1+T^2) D), w = T^2/(1+T^2),
D = F + F S^2 + S T + F^2 S T + F T^2; T = e^{-tau}, S = e^{sigma}, F = e^{i phi}; y = S^2, lny = ln y = 2 ln S.
Coupling g^2 = lambda/(16 pi^2), loop order L <-> g^{2L}. W = the framed hexagon Wilson loop of Basso, Sever and
Vieira, W = rho E exp[(Gamma_cusp/4)(X - E^(1))]; in every sector through order T^2, E|_{T^a F^b} = E|_{T^0} W|_{T^a F^b}
(derived exactly). The factor rho(g^2) is independent of the kinematics (its coefficients are zeta values), so it is invisible at symbol level;
`hexagon_OPE_series_allk.txt` gives rho E, for the reason and with the orders of rho stated in its header. The normalisation of the function files in `../function/`, including the g^18 coefficient of rho, is
stated in their headers.

| file | content |
|---|---|
| `hexagon_T1_OPE_LL_NLL.txt` | order T^1 (single gluon), closed forms: L = 1..6 all powers of ln T; L = 7, 8, 9 at LL and NLL |
| `hexagon_T2F2_OPE_LL_NLL.txt` | order T^2 F^{+-2} (two-gluon bound state W_[2]), closed forms, L = 1..9 at LL and NLL |
| `hexagon_T2F2_OPE_NNLL.txt` | the same at NNLL, closed forms, L = 7, 8, 9 |
| `hexagon_T2F2_N3LL_exact_y40.txt` | N^3LL at T^2 F^{+-2}: W_[2] at ln^{L-4} T, the Born-level two-gluon continuum W_[1,1], and their sum, exact series through y^40, L = 7, 8, 9 (this block fixed the last direction of the nine-loop lift) |
| `hexagon_T2F2_N3LL_mod2147483629.txt`, `hexagon_T2F2_N3LL_mod2305843009213693921.txt` | the same as long series modulo a prime (bound state through y^6000, W_[1,1] through y^10000) |
| `hexagon_T2F0_OPE_LL.txt` | the helicity-zero sector T^2 F^0 at LL, closed forms, L = 1..9 (only the effective twist-two excitation contributes) |
| `hexagon_T2F0_OPE_series_LL_NLL.txt` | T^2 F^0 at LL and NLL as exact series through y^40, split by contribution |
| `hexagon_OPE_series_allk.txt` | exact series for W_[1] (through S^81) and W_[2] (through y^41) for the four highest powers of ln T, L <= 9, and for rho E in both sectors |

The nine-loop form-factor OPE data that closed the form-factor bootstrap are in `../form_factor/T2terms9loops_LL_NLL.txt`
and `../form_factor/T2terms9loops_closed.txt`. At symbol level all zeta values are set to zero.
