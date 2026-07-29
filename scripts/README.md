# scripts

Verification annexes that are not part of the packaged `ptcna` suite.

- `proof_check.py` — empirical spectral-graph comparison of the 7:1 ring vs the
  7:3 heptagram (circulant adjacency, algebraic connectivity). Relocated
  verbatim from `The-Interdependency/pcna:proof_check.py` (pcna@e384b32) during
  the 2026-07-28 archival sweep. Requires `numpy` and `scipy`; run directly with
  `python scripts/proof_check.py`. Empirical support for the heptagram adjacency
  choice — no theorem status is claimed or transferred.
