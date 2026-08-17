"""Checks for the frozen critical-evaluation plan and receipt sealing."""

from ptcna.critical_evaluation import _canonical_digest, load_frozen_plan

# === CHECKS ===
# id: check_ptcna_critical_plan_digest
#   proves: ptcna_critical_plan_digest_locked
#   call: self::test_critical_plan_is_balanced_and_digest_locked
#   requires: python3
#   timeout: 30
#   mutates: none
#   cleanup: none
#
# id: check_ptcna_critical_result_digest
#   proves: ptcna_critical_result_content_addressed
#   call: self::test_result_digest_is_content_sensitive
#   requires: python3
#   timeout: 30
#   mutates: none
#   cleanup: none
# === END CHECKS ===


def test_critical_plan_is_balanced_and_digest_locked() -> None:
    plan, artifact = load_frozen_plan()
    counts = {ring: 0 for ring in ("phi", "psi", "omega")}
    for case in plan.workload:
        counts[case.expected_winner] += 1
    assert counts == {"phi": 6, "psi": 6, "omega": 6}
    assert plan.digest == artifact["plan_digest"]
    assert plan.minimum_target_accuracy == 0.75
    assert plan.minimum_target_advantage_vs_fallback == 0.05
    assert artifact["claim_rules"]["parity"] == "FALSIFIED for superiority only"
    assert len(_canonical_digest(artifact)) == 64


def test_result_digest_is_content_sensitive() -> None:
    first = {"plan_digest": "a" * 64, "usefulness_status": "FALSIFIED"}
    second = {"plan_digest": "a" * 64, "usefulness_status": "UNRESOLVED"}
    assert _canonical_digest(first) == _canonical_digest(dict(first))
    assert _canonical_digest(first) != _canonical_digest(second)
