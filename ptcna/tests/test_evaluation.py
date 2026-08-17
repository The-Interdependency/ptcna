"""Executable evidence for frozen evaluation and terminal verdicts."""

from ptcna.evaluation import (
    FALSIFIED,
    SURVIVED_NOT_PROVED,
    EvaluationCase,
    EvaluationPlan,
    evaluate,
)
from ptcna.runtime import FALLBACK_BACKEND, PTCNA_BACKEND

# === CHECKS ===
# id: check_ptcna_plan_digest
#   proves: ptcna_evaluation_plan_freezes_verdict_inputs
#   call: self::test_plan_digest_is_stable_and_criteria_sensitive
#   requires: python3
#   timeout: 30
#   mutates: none
#   cleanup: none
#
# id: check_ptcna_frozen_verdicts
#   proves: ptcna_evaluation_verdict_uses_frozen_thresholds
#   call: self::test_frozen_thresholds_produce_survival_and_falsification
#   requires: python3
#   timeout: 30
#   mutates: none
#   cleanup: none
#
# id: check_ptcna_failure_propagation
#   proves: ptcna_evaluation_propagates_backend_failure
#   call: self::test_backend_failure_stops_with_preselected_status
#   requires: python3
#   timeout: 30
#   mutates: none
#   cleanup: none
# === END CHECKS ===


class _ScriptedBackend:
    def __init__(self, identity: str, winners: dict[str, str]) -> None:
        self.identity = identity
        self._winners = winners
        self._last_text = ""

    def infer(self, text: str) -> dict:
        self._last_text = text
        return {"winner": self._winners[text], "backend": self.identity}

    def reward(self, winner: str, outcome: float) -> dict:
        return {"winner": winner, "outcome": outcome, "backend": self.identity}

    def state(self) -> dict:
        return {"backend": self.identity}


class _ErrorBackend(_ScriptedBackend):
    def infer(self, text: str) -> dict:
        raise RuntimeError("frozen failure")


class _LearningBackend(_ScriptedBackend):
    def reward(self, winner: str, outcome: float) -> dict:
        self._winners[self._last_text] = winner
        return super().reward(winner, outcome)


def _plan(**changes) -> EvaluationPlan:
    values = {
        "plan_id": "fixture-v1",
        "workload": (
            EvaluationCase("one", "one", "phi"),
            EvaluationCase("two", "two", "psi"),
        ),
        "minimum_target_accuracy": 1.0,
        "maximum_target_deficit_vs_fallback": 0.0,
        "training_epochs": 0,
        "reward_outcome": 1.0,
        "repetitions": 1,
        "max_training_steps": 0,
        "max_case_evaluations": 2,
        "max_seconds": 10.0,
        "backend_error_status": FALSIFIED,
    }
    values.update(changes)
    return EvaluationPlan(**values)


def test_plan_digest_is_stable_and_criteria_sensitive() -> None:
    first = _plan()
    second = _plan()
    changed = _plan(minimum_target_accuracy=0.5)
    assert first.digest == second.digest
    assert first.digest != changed.digest
    assert first.to_dict()["stopping_rule"] == (
        "complete_or_first_backend_error_or_resource_limit"
    )


def test_frozen_thresholds_produce_survival_and_falsification() -> None:
    target_correct = lambda: _ScriptedBackend(
        PTCNA_BACKEND, {"one": "phi", "two": "psi"}
    )
    target_wrong = lambda: _ScriptedBackend(
        PTCNA_BACKEND, {"one": "omega", "two": "omega"}
    )
    fallback = lambda: _ScriptedBackend(
        FALLBACK_BACKEND, {"one": "phi", "two": "psi"}
    )
    survived = evaluate(
        _plan(), target_factory=target_correct, comparator_factory=fallback
    )
    falsified = evaluate(
        _plan(), target_factory=target_wrong, comparator_factory=fallback
    )
    assert survived.status == SURVIVED_NOT_PROVED
    assert survived.target_accuracy == 1.0
    assert falsified.status == FALSIFIED
    assert falsified.target_accuracy == 0.0
    assert falsified.comparator_accuracy == 1.0

    learning_target = lambda: _LearningBackend(
        PTCNA_BACKEND, {"one": "omega", "two": "omega"}
    )
    learning_fallback = lambda: _LearningBackend(
        FALLBACK_BACKEND, {"one": "omega", "two": "omega"}
    )
    learned = evaluate(
        _plan(training_epochs=1, max_training_steps=2),
        target_factory=learning_target,
        comparator_factory=learning_fallback,
    )
    assert learned.status == SURVIVED_NOT_PROVED
    assert learned.training_steps == 2
    assert learned.target_accuracy == 1.0


def test_backend_failure_stops_with_preselected_status() -> None:
    target = lambda: _ErrorBackend(PTCNA_BACKEND, {})
    fallback = lambda: _ScriptedBackend(
        FALLBACK_BACKEND, {"one": "phi", "two": "psi"}
    )
    receipt = evaluate(
        _plan(backend_error_status=FALSIFIED),
        target_factory=target,
        comparator_factory=fallback,
    )
    assert receipt.status == FALSIFIED
    assert receipt.training_steps == 0
    assert receipt.case_evaluations == 0
    assert receipt.failure_reason == "backend_error:RuntimeError"
