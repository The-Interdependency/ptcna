# ratios: loc_comments=22:12 imports_exports=2:1 calls_definitions=1:0
"""PTCNA — Prime Tensor Circled Neural Architecture.

One architecture, four layers. Each layer's tensors divide into the next; every
circle, seed, and core is itself a tensor.

    neural  → base neural tensors        (the ONLY back-propagating layer)
    circle  → neural tensors → circles   (auditing / timing tensors)
    seed    → circles → seeds            (auditing / timing tensors)
    core    → seeds → cores              (auditing / timing; fiqs gate internal
                                          propagation per Fick's law J = -D grad(phi))

Consolidates the former The-Interdependency repos pcna (neural), pcta (seed),
and pcsa (core). PCEA (encryption guardian) stays a separate, orthogonal repo.
PTCNA is the single upstream that feeds interdependent-lib.
"""

__version__ = "0.1.1"
__license__ = "MPL-2.0"

from . import neural, circle, seed, core  # noqa: F401
from .ucns_integration import (
    UCNSIntegrationState,
    UCNSIntegrationStatus,
    UCNSIntegrationSuspended,
    require_ucns_integration,
    ucns_integration_status,
)

__all__ = [
    "neural",
    "circle",
    "seed",
    "core",
    "UCNSIntegrationState",
    "UCNSIntegrationStatus",
    "UCNSIntegrationSuspended",
    "ucns_integration_status",
    "require_ucns_integration",
    "__version__",
]
# ratios: loc_comments=22:12 imports_exports=2:1 calls_definitions=1:0
