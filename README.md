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
| circle | *new* (audit extracted from the neural engine — see `docs/architecture.md`) | previously unnamed |

## Install & test

```bash
pip install -e ".[dev]"      # neural layer needs numpy; seed/core are stdlib-only
pytest                       # testpaths = ptcna
```

## Status

Alpha (`0.1.1`). All four layers import and the repository test suite passes.
The layer boundary is now executable rather than only descriptive:

- `ptcna.circle.CircleTensor` is the one circle type used by circle, seed, and
  core composition.
- `ptcna.neural.NeuralScalar` is the only PTCNA type that owns reverse-mode
  gradients; structural hosts carry it opaquely.
- UCNS integration reports a typed `suspended` state and fails closed until a
  reviewed PTCNA-specific higher-gonol producer profile exists.
- EDCM remains an external authority. `ZetaEngine` accepts an explicitly
  injected measurement provider; PTCNA contains no shadow EDCM module.

The core layer still intentionally exposes PTCA-named public objects such as
`PTCATensor` and `PTCAInstance`; those names live in the correct layer.
History and unresolved evidence boundaries live in `docs/architecture.md`.

License: MPL-2.0.
