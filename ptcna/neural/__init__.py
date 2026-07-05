"""Neural layer — the only differentiable layer of PTCNA.

Neural tensors arranged as a back-propagating network (weights). Circle, seed,
and core layers consume neural tensors as auditing/timing tensors; they do not
differentiate. Migrated verbatim from The-Interdependency/pcna (core/).

hmmm: `ptca_core.PTCACore` retains its pre-consolidation filename; the
seed/circle audit helpers (`_ptca_seed_audit`, `_pcta_circle_audit`) inside
`pcna.py` still carry bare layer prefixes and are slated to move to
`ptcna.seed` / `ptcna.circle` during audit-logic reconciliation.
"""
