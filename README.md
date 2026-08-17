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

## Experimental runtime and dependable fallback

The intended architecture and the simpler fallback share one task interface but
retain separate identities. PTCNA is selected by default. A target error raises
unless the caller explicitly enables fallback routing; every receipt records the
backend actually used.

```python
from ptcna import PTCNARuntime

runtime = PTCNARuntime()
target = runtime.infer("question")
fallback = runtime.infer("question", backend="fallback")
continued = runtime.infer("question", fallback_on_error=True)
runtime.reward(continued, outcome=1.0)
```

The default target consumes the bundled UCNS candidate receipt pinned to
`The-Interdependency/ucns@b7b6f35cce69c273860923489a1c8b5372d14eb0`.
It independently materializes and verifies the exact `157×7×7×53` positive-zero
state before inference. Inspect or validate a persisted receipt explicitly:

```python
import json
from pathlib import Path
from ptcna import consume_ucns_receipt

status = consume_ucns_receipt(json.loads(Path("ucns-receipt.json").read_text()))
assert status.adapter_active
```

Receipt success establishes compatible construction only. It does not select
continuous seven-fold geometry or establish efficacy or production privacy.

Freeze a representative labeled workload before inspecting outcomes:

```python
from ptcna import EvaluationCase, EvaluationPlan, evaluate

plan = EvaluationPlan(
    plan_id="representative-workload-v1",
    workload=(EvaluationCase("case-1", "input", "phi"),),
    minimum_target_accuracy=0.80,
    maximum_target_deficit_vs_fallback=0.00,
    training_epochs=3,
    reward_outcome=1.0,
    repetitions=3,
    max_training_steps=9,
    max_case_evaluations=3,
    max_seconds=30.0,
    backend_error_status="FALSIFIED",
)
print(plan.digest)  # preserve this with the plan before execution
receipt = evaluate(plan)
```

The repository does not ship a pretend representative workload. Until one is
frozen and executed, whether PTCNA works remains `hmmm`.

## Status

Alpha (`0.1.1`). All four layers import and the repository test suite passes.
The exact default state now carries producer-validated UCNS candidate
provenance; nonmatching shapes remain explicitly suspended and PTCNA-local.
The layer boundary is now executable rather than only descriptive:

- `ptcna.circle.CircleTensor` is the one circle type used by circle, seed, and
  core composition.
- `ptcna.neural.NeuralScalar` is the only PTCNA type that owns reverse-mode
  gradients; structural hosts carry it opaquely.
- UCNS integration validates the exact candidate receipt for the default shape;
  mismatched shapes report typed `suspended` state and remain locally attributed.
- EDCM remains an external authority. `ZetaEngine` accepts an explicitly
  injected measurement provider; PTCNA contains no shadow EDCM module.
- `PTCNAEngine` joins the live neural engine to the complete local core and
  reports all four layers. `PTCNARuntime` keeps that experimental path distinct
  from `HashedLinearFallback`; failover is explicit and attributed.
- `EvaluationPlan` freezes workload, training schedule, comparator, metric,
  thresholds, resource limits, stopping, and failure propagation before
  `evaluate` emits
  `FALSIFIED`, `SURVIVED — not proved`, or `UNRESOLVED`.

The core layer still intentionally exposes PTCA-named public objects such as
`PTCATensor` and `PTCAInstance`; those names live in the correct layer.
History and unresolved evidence boundaries live in `docs/architecture.md`.

License: MPL-2.0.
