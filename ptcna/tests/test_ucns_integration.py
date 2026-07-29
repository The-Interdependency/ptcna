"""Executable evidence for the typed suspended UCNS boundary."""

import importlib
import sys
from types import ModuleType

import pytest

import ptcna.ucns_integration as integration

# === CHECKS ===
# id: check_ptcna_ucns_fails_closed
#   proves: ptcna_ucns_fails_closed_without_profile
#   call: self::test_archived_named_package_cannot_activate
#   requires: python3
#   timeout: 10
#   mutates: none
#   cleanup: module_restore
#
# id: check_ptcna_ucns_typed_suspension
#   proves: ptcna_ucns_suspension_is_typed
#   call: self::test_require_raises_typed_status
#   requires: python3
#   timeout: 10
#   mutates: none
#   cleanup: none
# === END CHECKS ===


def test_archived_named_package_cannot_activate() -> None:
    fake = ModuleType("ucns")
    fake.a0_safe = object()
    fake.UCNSObject = object()
    prior = sys.modules.get("ucns")
    try:
        sys.modules["ucns"] = fake
        reloaded = importlib.reload(integration)
        status = reloaded.ucns_integration_status()
        assert status.state is reloaded.UCNSIntegrationState.SUSPENDED
        assert status.adapter_active is False
        assert status.producer_profile is None
        assert "ucns.a0_safe" in status.rejected_legacy_surfaces
    finally:
        if prior is None:
            sys.modules.pop("ucns", None)
        else:
            sys.modules["ucns"] = prior


def test_require_raises_typed_status() -> None:
    with pytest.raises(integration.UCNSIntegrationSuspended) as caught:
        integration.require_ucns_integration()
    assert caught.value.status.adapter_active is False
    assert "PTCNA-specific" in caught.value.status.reason
