# ratios: loc_comments=45:62 imports_exports=5:6 calls_definitions=6:6
"""Typed PTCNA boundary for the not-yet-available UCNS producer profile.

PTCNA needs higher-gonol circle/seed/core composition. The current public UCNS
profiles do not authorize that construction, so this module exposes an
explicit suspended state instead of probing package names or archived APIs.

Usage:

    from ptcna.ucns_integration import ucns_integration_status

    status = ucns_integration_status()
    assert status.adapter_active is False

Call ``require_ucns_integration()`` only at a boundary that cannot operate
without the future producer. It raises a typed error carrying the same status.
Local PTCNA star-polygon composition remains usable while this integration is
suspended; it is not labeled as UCNS output.
"""
from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import NoReturn

# === MODULE_BUILD ===
# id: ptcna_ucns_integration
#   module_name: ucns_integration
#   module_kind: adapter
#   summary: exposes a typed suspended UCNS state until a PTCNA-specific higher-gonol producer profile exists
#   owner: Erin Spencer
#   public_surface: UCNSIntegrationState, UCNSIntegrationStatus, UCNSIntegrationSuspended, ucns_integration_status, require_ucns_integration
#   internal_surface: _STATUS
#   auth_boundary: none
#   storage_boundary: none
#   network_boundary: none
#   user_data_boundary: none
#   admin_only: false
#   tests: ptcna/tests/test_ucns_integration.py
#   rollout: always suspended until an exact reviewed PTCNA producer profile replaces this module
#   rollback: remove the integration export; local PTCNA composition remains available
#   requires: none
#   since: 0.1.1
#   unresolved: exact PTCNA-specific UCNS producer profile identity and higher-gonol composition law
# === END MODULE_BUILD ===

# === CONTRACTS ===
# id: ptcna_ucns_fails_closed_without_profile
#   given: any installed package named ucns, including one exposing archived a0_safe or UCNSObject surfaces
#   then: PTCNA reports a suspended inactive adapter and never activates by package-name discovery
#   class: safety
#
# id: ptcna_ucns_suspension_is_typed
#   given: a caller requires UCNS integration before a PTCNA-specific producer profile exists
#   then: UCNSIntegrationSuspended is raised with the inspectable suspended status
#   class: correctness
# === END CONTRACTS ===

# === BOUNDARIES ===
# id: ptcna_ucns_integration_runtime_boundary
#   summary: declares an inactive local integration boundary and performs no UCNS import, network, storage, or user-data access
#   auth_boundary: none
#   storage_boundary: none
#   network_boundary: none
#   user_data_boundary: none
#   admin_only: false
#   pii: none
#   secrets: none
#   owner: Erin Spencer
#   since: 0.1.1
# === END BOUNDARIES ===


class UCNSIntegrationState(str, Enum):
    """Lifecycle state for the PTCNA-specific UCNS adapter."""

    SUSPENDED = "suspended"


@dataclass(frozen=True)
class UCNSIntegrationStatus:
    """Inspectable status returned without importing or probing UCNS."""

    state: UCNSIntegrationState
    adapter_active: bool
    reason: str
    required_scope: str
    producer_profile: None
    rejected_legacy_surfaces: tuple[str, ...]


class UCNSIntegrationSuspended(RuntimeError):
    """Raised when a caller requires the unavailable producer integration."""

    def __init__(self, status: UCNSIntegrationStatus) -> None:
        self.status = status
        super().__init__(status.reason)


_STATUS = UCNSIntegrationStatus(
    state=UCNSIntegrationState.SUSPENDED,
    adapter_active=False,
    reason=(
        "awaiting an exact reviewed PTCNA-specific UCNS higher-gonol "
        "producer profile"
    ),
    required_scope="ptcna circle->seed->core higher-gonol composition",
    producer_profile=None,
    rejected_legacy_surfaces=(
        "ucns.a0_safe",
        "UCNSObject",
        "factor_search",
        "pre-reset serialization identity",
    ),
)


def ucns_integration_status() -> UCNSIntegrationStatus:
    """Return the immutable fail-closed integration status."""

    return _STATUS


def require_ucns_integration() -> NoReturn:
    """Fail with a typed boundary object while integration is suspended."""

    raise UCNSIntegrationSuspended(_STATUS)


__all__ = [
    "UCNSIntegrationState",
    "UCNSIntegrationStatus",
    "UCNSIntegrationSuspended",
    "ucns_integration_status",
    "require_ucns_integration",
]
# ratios: loc_comments=45:62 imports_exports=5:6 calls_definitions=6:6
