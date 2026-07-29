# PTCNA agent guide

PTCNA is one four-layer architecture:

```text
neural -> circle -> seed -> core
```

Authority and invariants:

- `ptcna.neural` is the only differentiable layer and the only owner of
  back-propagation.
- Circle, seed, and core objects are non-differentiating auditing and timing
  tensors. They may carry neural payloads opaquely; carrying a payload does not
  transfer gradient ownership.
- Every circle, seed, and core is itself a tensor. Composition counts are
  variable.
- Fiqs gate internal core propagation according to Fickian field motion. That
  is timing, not gradient descent.
- UCNS integration is suspended until a PTCNA-specific higher-gonol producer
  profile exists. Do not activate archived surfaces such as `a0_safe`,
  `UCNSObject`, or `factor_search`.
- EDCM measurement authority belongs to `The-Interdependency/edcm`. PTCNA may
  consume an explicitly injected measurement provider; it must not maintain a
  shadow EDCM implementation.

Before changing code, load the applicable repo-local skills under
`.agents/skills/`. All new or materially revised modules need self-declared
`MODULE_BUILD`, `CONTRACTS`, and actual runtime `BOUNDARIES` metadata when the
corresponding skill applies. Tests own `CHECKS` evidence. Unknowns remain
`hmmm`.

## Usage

Install and verify:

```bash
python -m pip install -e ".[dev]"
python -m pytest
python scripts/check_contracts.py
python .agents/skills/ratios/ratios_check.py --root ptcna --strict
PYTHONPATH=.agents/skills python .agents/skills/msdmd/collect.py \
  --root . --repo ptcna --out /tmp/ptcna_msdmd.ts
cmp /tmp/ptcna_msdmd.ts ptcna_msdmd.ts
```

Build and inspect the release:

```bash
python -m build
python -m twine check dist/*
python -m pip install --force-reinstall dist/ptcna-*.whl
python -c "import ptcna; print(ptcna.__version__)"
```

Do not publish from a dirty tree or before the repository tests, metadata
collection check, ratios gate, wheel smoke test, and downstream
`interdependent-lib` compatibility check all pass.

## hmmm

- A PTCNA-specific UCNS higher-gonol producer identity does not yet exist.
- Training and timing behavior across the complete four-layer seam remains
  unfalsified under sustained load.
