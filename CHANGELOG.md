# Changelog

## 0.1.1 — 2026-07-29

- Added the shared `ptcna.circle.CircleTensor` and one structural composition
  path across circle, seed, and core layers.
- Moved reverse-mode scalar ownership to `ptcna.neural.NeuralScalar`; core and
  fiq objects are now opaque, non-differentiating structural hosts.
- Made seed/core composition counts variable and preserved neural payloads
  without transferring gradient ownership.
- Added a typed, fail-closed suspended UCNS integration boundary.
- Removed `ptcna.neural.edcm`; Zeta now consumes an explicitly injected
  external measurement provider or reports measurement suspension.
- Added repository-local doctrine, machine-readable work-graph inputs,
  executable contracts, drift collection, and release gates.

## 0.1.0 — 2026-07-28

- Consolidated the neural, circle, seed, and core architecture into the
  `ptcna` package.
