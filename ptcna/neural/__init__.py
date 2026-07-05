"""Neural layer — the only differentiable layer of PTCNA.

Neural tensors arranged as a back-propagating network (weights). Circle, seed,
and core layers consume neural tensors as auditing/timing tensors; they do not
differentiate. Migrated verbatim from The-Interdependency/pcna (core/).

The seed/circle audit aggregation has been extracted to `ptcna.seed.seed_audit`
and `ptcna.circle.circle_audit`; the neural engine delegates to them.

hmmm: `ptca_core.PTCACore` retains its pre-consolidation filename/class name;
renaming it (it is the neural prime-ring tensor, not the core layer) is a
remaining reconciliation step tracked in docs/architecture.md.
"""
