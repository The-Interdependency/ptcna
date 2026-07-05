"""Circle layer — auditing/timing tensors: neural tensors → circles.

Every circle is itself a tensor. Non-differentiable (auditing/timing only).

hmmm: this layer had no pre-consolidation repo. Its logic currently lives as
`PCNAEngine._pcta_circle_audit` inside `ptcna.neural.pcna`; extraction into this
module is a reconciliation TODO, tracked in docs/architecture.md.
"""
