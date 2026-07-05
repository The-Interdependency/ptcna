# PTCNA — Prime Tensor Circled Neural Architecture

One architecture, four layers. Not four repos — four **layers of one thing**.
PTCNA consolidates the former The-Interdependency repos `pcna`, `pcta`, and
`pcsa` into a single package and is the single upstream that feeds
[`interdependent-lib`](https://github.com/The-Interdependency/interdependent-lib).

## The four layers

Each layer's tensors divide into the next; every circle, seed, and core **is
itself a tensor**.

| Module | Layer | Divides… → … | Tensor kind | Back-propagation |
|---|---|---|---|---|
| `ptcna.neural` | neural | (base) neural tensors | **neural** | **yes — the only differentiable layer** |
| `ptcna.circle` | circle | neural tensors → circles | auditing / timing | no |
| `ptcna.seed` | seed | circles → seeds | auditing / timing | no |
| `ptcna.core` | core | seeds → cores | auditing / timing | no |

- **Back-propagation lives only in the neural layer.** Circle, seed, and core
  tensors are **auditing and timing tensors** — they do not differentiate.
- **fiqs** gate *when cores propagate internally*, per Fick's first law
  `J = −D ∇φ` (structure diffusing down its field gradient). Timing, not
  gradient descent. The fiq substrate lives in `ptcna.core.prime_core`.
- **PCEA** (Prime Circular Encryption Algorithm) is **not** a layer — it stays a
  separate, orthogonal repo (the guardian: "last state as key" at every layer).

## Provenance

| Layer | Migrated from | Was |
|---|---|---|
| neural | `The-Interdependency/pcna` (`core/`) | Prime Circular Neural Architecture |
| seed | `The-Interdependency/pcta` | Prime Circled Tensor Architecture (circles → seeds) |
| core | `The-Interdependency/pcsa` (`ptca/` + `prime_core/`) | Prime Tensor Core Architecture (was `PTCA`) |
| circle | *new* (extraction target — see `docs/architecture.md`) | previously unnamed |

## Install & test

```bash
pip install -e ".[dev]"      # neural layer needs numpy; seed/core are stdlib-only
pytest                       # testpaths = ptcna
```

## Status

Alpha, consolidation milestone 1: all four layers import; **142 tests pass**
(seed/core/prime_core stdlib-only + neural under numpy). Reconciliation work
(circle-layer extraction from neural, audit-helper renames) is tracked in
`docs/architecture.md`.

License: MPL-2.0.
