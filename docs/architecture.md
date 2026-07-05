# PTCNA Consolidation Spec (draft)

**PTCNA** — *Prime Tensor Circled Neural Architecture*. One repository, one
architecture, four layers. Supersedes the separate `pcna` / `pcta` / `pcsa`
(and the never-shipped `ptsa`) repos, which were only ever layers of a single
thing. `pcea` remains a separate, orthogonal repo (encryption guardian, not a
layer). PTCNA is the single upstream that feeds `interdependent-lib`.

## Layers (top-down; each tensor divides into the next)

| Module | Layer name | Divides… → … | Tensor kind | Backprop? |
|---|---|---|---|---|
| `neural/` | neural (**pcna**) | (base) neural tensors | **neural** | **yes — the only differentiable layer** |
| `circle/` | circle (**ptca** = prime tensor circle arch) | neural tensors → circles | auditing / timing | no |
| `seed/` | seed (**ptsa** = prime tensor seed arch) | circles → seeds | auditing / timing | no |
| `core/` | core | seeds → cores | auditing / timing | no |

- Every circle, seed, and core **is itself a tensor** (invariant preserved).
- **Backprop lives only in the neural layer.** Circle/seed/core tensors are
  auditing and timing tensors — they do not participate in differentiation.
- **fiqs**: gate *when cores propagate internally*, per Fick's first law
  `J = −D ∇φ` (structure diffusing down its field gradient). This is timing,
  not gradient descent.
- **pcea** (Prime Circular Encryption Algorithm) stays a separate repo — the
  orthogonal guardian ("last state as key" at every layer), never a PTCNA layer.

## Naming — resolved

The old `pcta`/`ptca`/`ptca` transposition problem **dissolves** under
consolidation: these are no longer separate PyPI dists competing for one-letter
distinctions, they are module directories inside one package. `neural circle
seed core` are the module names that matter; `ptca`/`ptsa` survive only as the
descriptive layer expansions.

## Source → destination mapping (to verify against real trees)

| Destination | Source repo(s) | Notes |
|---|---|---|
| `ptcna/neural/` | `pcna` (`core/`: pcna.py, ptca_core→PTCACore substrate, theta, sigma, merge, memory_core, topology, zeta, helix_vis) | the backprop engine |
| `ptcna/circle/` | `pcna` circle-audit logic (`_pcta_circle_audit`) + current `pcta` repo | circle auditing/timing |
| `ptcna/seed/` | current `pcta` repo (was PCTA) + `pcna` seed-audit (`_ptca_seed_audit`) | seed auditing/timing |
| `ptcna/core/` | current `pcsa` repo (was PTCA) | core auditing/timing + fiqs/Fick gating |

> The internal symbol names in `pcna` mix `ptca_seed_*` (seed) and
> `pcta_circle_*` (circle). Under consolidation these become
> `seed.*` / `circle.*` module-qualified names — the bare `ptca`/`pcta`
> prefixes go away, killing the transposition risk at the source.

## interdependent-lib rewiring

- `_REGISTRY`: remove `pcna`, `pcta` (and the planned `pcsa`/`ptsa`); add a
  single `ptcna` → import name `ptcna`.
- Extras: one `ptcna` extra (once PTCNA ships to PyPI) replaces the intended
  per-layer extras; the never-added `prime-stack` extra is obsolete.
- `pcea` extra unchanged. `ucns` frozen. `metapat` unchanged (FLAR).
- `docs/prime-tensor-stack.md`: rewrite around the 4-layer single-repo model;
  keep the backprop-only-in-neural claim; reframe circle/seed/core as
  auditing/timing tensors; define fiqs = Fick-gated core internal propagation.
- `docs/naming-migration.md`: append the consolidation as the terminal state.

## Execution order

1. Create repo `The-Interdependency/ptcna` (public, MPL-2.0).
2. Scaffold package skeleton (`ptcna/{neural,circle,seed,core}/`, pyproject).
3. Migrate `pcna` → `neural/` (+ split its internal circle/seed audit into
   `circle/`, `seed/`).
4. Migrate `pcsa` (core) → `core/`; wire fiqs/Fick gating.
5. Migrate current `pcta` (seed) → `seed/`.
6. Reconcile duplicated audit logic; single import graph; tests.
7. Rewire interdependent-lib (`ptcna` key/extra; rewrite stack canon).
8. Archive `pcna`, `pcta`, `pcsa`.

## Blockers for me

- **Confirm I should create `The-Interdependency/ptcna`** (outward action).
- **Add `pcsa` to session scope** — I need the core-layer source to migrate it.
  (`pcna`, `pcta` already cloned.)

## Status log

- **2026-07-05 — circle/seed audit extraction (branch `claude/circle-extraction`).**
  Aggregation moved out of the neural engine into the layers that own it:
  `PCNAEngine._pcta_circle_audit` → `ptcna.circle.circle_audit`;
  `PCNAEngine._ptca_seed_audit` → `ptcna.seed.seed_audit`. Primitive methods
  renamed (`PTCACore.ptca_seed_audit` → `seed_audit`,
  `ThetaTensor.pcta_circle_audit` → `circle_audit`); engine delegates; inference
  step keys `step4_ptca_seed`/`step5_pcta_circle` → `step4_seed`/`step5_circle`.
  All bare `ptca_`/`pcta_` audit prefixes gone (class name `PTCACore` still
  pending its own rename). 146 tests pass.
  - Still open: `PTCACore` class/file rename; interdependent-lib single-`ptcna`
    rewiring; archive `pcna`/`pcta`/`pcsa`.

- **2026-07-05 — PTCACore rename (branch `claude/ring-core-rename`).**
  `neural/ptca_core.py` → `neural/ring_core.py`; class `PTCACore` → `RingCore`
  (the phi/psi/omega prime-ring tensors). MODULE_BUILD id `pcna_ptca_core` →
  `pcna_ring_core`; all imports/usages/`requires` edges updated. The neural
  layer now carries **no `ptca` token**. 146 tests pass.
  - Note: the core layer (ex-`pcsa`) still exposes `PTCATensor`/`PTCAInstance`
    and the `ptca-lib` dist name — those name the *core layer* (which "was
    PTCA"), so they are in the right layer, but a `core.*` rename is a possible
    later cleanup if desired.
  - Still open: interdependent-lib single-`ptcna` rewiring; archive
    `pcna`/`pcta`/`pcsa`.
