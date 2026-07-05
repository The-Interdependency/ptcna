# CLAUDE.md — ptcna

AI-assistant guidance for `The-Interdependency/ptcna`.

## What this repo is

**PTCNA — Prime Tensor Circled Neural Architecture.** One package, four layers
(`neural`, `circle`, `seed`, `core`). It consolidates three formerly-separate
repos that were never actually separate things — they are layers of one
architecture:

- `neural/` ← `pcna` (`core/`) — neural tensors; **the only back-propagating layer**
- `seed/`   ← `pcta` — auditing/timing tensors, circles → seeds
- `core/`   ← `pcsa` (`ptca/` + `prime_core/`) — auditing/timing tensors, seeds → cores; fiqs
- `circle/` ← new — auditing/timing tensors, neural tensors → circles

`ptcna` is the single upstream that feeds `interdependent-lib` (one `ptcna`
registry key/extra replaces the former `pcna`/`pcta`/`pcsa` entries). `pcea`
(encryption guardian) is a separate, orthogonal repo — not a layer.

## Core invariants (do not violate)

- **Backprop only in the neural layer.** Circle/seed/core tensors are auditing
  and timing tensors; they are non-differentiable. Do not add gradient flow to
  them.
- **Every circle, seed, and core is itself a tensor.** Composition counts are
  variable; this invariant is not.
- **fiqs** gate core internal propagation per Fick's law `J = −D ∇φ` — timing,
  not gradient descent. The fiq substrate is `ptcna.core.prime_core`.
- No theorem/proof/empirical status transfers between layers or from UCNS by
  naming these terms.

## Layout

```text
ptcna/
  __init__.py            exposes neural, circle, seed, core
  neural/  (numpy)       pcna.py, ptca_core.py (PTCACore), tensor_engine, theta,
                         sigma, merge, memory_core, topology, zeta, edcm, ...
  circle/                extraction target (logic currently in neural.pcna)
  seed/    (stdlib)      compose.py, tensor.py, constants.py
  core/    (stdlib)      tensor, sentinels, exchange, instance, primes, provenance
    prime_core/          fiq.py (fiqs/Fick), core.py, constants.py
docs/architecture.md     consolidation spec + reconciliation TODOs
pyproject.toml           name=ptcna; deps=[numpy]; testpaths=ptcna
```

## Build / test

```bash
pip install -e ".[dev]"
pytest                   # 142 tests at consolidation milestone 1
```

## Migration status (hmmm — reconciliation TODOs)

- **Verbatim migration.** Each layer's code was moved with minimal edits: neural
  and seed used relative imports (rename-safe); core's `ptca.*` absolute imports
  were rewritten to relative. Test imports were repointed to `ptcna.<layer>`.
- **Not yet done:**
  - `circle/` is a stub; `_pcta_circle_audit` still lives in `neural/pcna.py`.
  - `neural/ptca_core.py` keeps its old filename; the `_ptca_seed_audit` /
    `_pcta_circle_audit` helpers still carry bare layer prefixes.
  - pcna's `backend/` app server (llm/server/sms) was **not** migrated — it is
    application infra, not architecture; its `test_edcm_engine.py` was dropped.
  - interdependent-lib rewiring (single `ptcna` key/extra; rewrite
    `docs/prime-tensor-stack.md`) is a follow-up in that repo.
  - Source repos `pcna`, `pcta`, `pcsa` are to be archived after this lands.

Do not hand-wave these as done. Mark unknowns `hmmm`.
