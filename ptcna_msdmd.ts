import { defineMsdmdCollection } from "./.agents/skills/msdmd/collection";

export default defineMsdmdCollection({
  "declarations": [
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_build_coherence_up_to, _is_prime, _prime_factors",
        "module_kind": "engine",
        "module_name": "constants",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "SEED_COUNT, CIRCLES_PER_SEED, TENSORS_PER_CIRCLE, TENSOR_DIM, TENSOR_LEAVES, PARAM_COUNT, CIRCLE_ROUTING_STEP, SEED_ROUTING_STEP, is_coherence_prime",
        "requires": "coherence_primes (mirrored from interdependent_lib, not imported \u2014 would invert the dependency graph)",
        "rollback": "revert is_coherence_prime to the prior frozen-universe implementation",
        "rollout": "default_enabled (imported by prime_core.core via prime_core.__init__)",
        "since": "2026-06-02 (manifest added; module predates the doctrine)",
        "storage_boundary": "none",
        "summary": "frozen PTCA composition counts plus the recursive coherence-prime guard",
        "tests": "prime_core.tests.test_constants_coherence_prime",
        "unresolved": "composition counts SEED_COUNT/TENSOR_DIM remain provisional pending the absent canon documents",
        "user_data_boundary": "none"
      },
      "file": "ptcna/core/prime_core/constants.py",
      "id": "prime_core_constants"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "edcm",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "compute_metrics, check_directives, check_alerts, delta_between, METRIC_NAMES, ALERT_HIGH, ALERT_LOW, DIRECTIVES",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Six-family EDCM coherence metrics (cm, da, drift, dvg, int_val, tbf) computed from response text, with alert thresholds and corrective directive firing.",
        "tests": "tests/test_edcm_engine.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/edcm.py",
      "id": "pcna_edcm"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "instrument",
        "module_name": "helix_vis",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "generate_helix_data, visualize",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "write",
        "summary": "Visualizes the spectral state of a 7-seed Meta Router by plotting the complex descriptor Z over a simulated trajectory and saving an animation.",
        "tests": "hmmm",
        "unresolved": "saves to hardcoded pcna_helix.gif with no config (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/helix_vis.py",
      "id": "pcna_helix_vis"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "seed_instance",
        "module_kind": "service",
        "module_name": "main",
        "network_boundary": "external",
        "owner": "Erin Spencer",
        "public_surface": "app, PCNASeed, health, topology, receive_delta, startup, shutdown, tick_loop",
        "requires": "pcna_topology, pcna_tensor_engine",
        "rollback": "do not launch this process; use root-level main.py seed runner instead",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Minimal FastAPI seed-runner process (compute/meta/sentinel/global) exposing health/topology/receive_delta routes with an aiohttp networking placeholder.",
        "tests": "hmmm",
        "unresolved": "BROKEN alt entry point \u2014 imports from non-existent src.core.* (do not use per CLAUDE.md)",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/main.py",
      "id": "pcna_core_main"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_recompute_hub_avg, _reset",
        "module_kind": "engine",
        "module_name": "memory_core",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "MemoryCore",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Parameterized in-memory ring (long-term N=19/seed=19, short-term N=17/seed=17) with round-robin write, content-addressed query, and flush_to() transfer on positive reward.",
        "tests": "hmmm",
        "unresolved": "query() is defined but never called anywhere (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/memory_core.py",
      "id": "pcna_memory_core"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_fed_avg, _blend_core",
        "module_kind": "engine",
        "module_name": "merge",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "InstanceMerge",
        "requires": "pcna_ring_core, pcna_pcna",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Stateless multi-instance merge operator for PCNAEngine meshes with three modes (absorb, fork, converge) via federated averaging; all output dicts use theta_* keys.",
        "tests": "hmmm",
        "unresolved": "fork() time-seeds its RNG \u2014 rapid calls may collide (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/merge.py",
      "id": "pcna_merge"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_tensor_to_b64, _b64_to_tensor, _CHECKPOINT_DIR, PCNAEngine._project, PCNAEngine._inject, PCNAEngine._propagate, PCNAEngine._seed_audit, PCNAEngine._circle_audit, PCNAEngine._coherence_score",
        "module_kind": "engine",
        "module_name": "pcna",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "PCNAEngine, RING_WEIGHTS, WINNER_RINGS",
        "requires": "pcna_ring_core, pcna_memory_core, pcna_theta",
        "rollback": "remove import and call sites; checkpoints under .checkpoints/ can be deleted",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "write",
        "summary": "Six-ring PCNA inference engine (phi/psi/omega/theta/memory_l/memory_s) running project->inject->propagate->seed-audit->circle-audit->coherence, with RING_WEIGHTS scoring and numpy checkpointing.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/pcna.py",
      "id": "pcna_pcna"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_adj_distances, RingCore._adjacents, _propagate_node, _recompute_coherence",
        "module_kind": "engine",
        "module_name": "ring_core",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "RingCore, DIMS, PHASES, HEPT_SITES",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Base prime-ring tensor (shape [N,DIMS=4,PHASES=7,HEPT_SITES=7]) with heptagram Euler-step propagation and coherence = 1 - |ring - hub|_mean; substrate for Phi/Psi/Omega/Sigma.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/ring_core.py",
      "id": "pcna_ring_core"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "worker",
        "module_name": "routing_loop",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "GlobalRouterZero",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Intended GlobalRouterZero routing loop worker \u2014 currently only a print stub that announces initialization.",
        "tests": "hmmm",
        "unresolved": "only a print stub \u2014 GlobalRouterZero not implemented (Known Stubs)",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/routing_loop.py",
      "id": "pcna_routing_loop"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_sigma, SigmaRing._core, SigmaRing._watched, SigmaRing._pending, SigmaRing._last_check",
        "module_kind": "engine",
        "module_name": "sigma",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "SigmaRing, get_sigma, N, SEED",
        "requires": "pcna_ring_core",
        "rollback": "remove import and call sites; callers already degrade gracefully if it raises",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "read",
        "summary": "N=41 filesystem observer ring wrapping RingCore; tracks watched file mtimes and drains content-changed events on a content_interval cadence, injecting coherence into Psi.",
        "tests": "hmmm",
        "unresolved": "structural_interval is stored but never acted on (Known Issues)",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/sigma.py",
      "id": "pcna_sigma"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "none",
        "module_kind": "engine",
        "module_name": "tensor_engine",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "TensorState, MarkovRecursion",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Tensor engine primitives \u2014 TensorState (E[a,t,m,c]) with spectral descriptor Z = Sum E.e^(i*theta), and a MarkovRecursion updater that enforces approximate mass conservation.",
        "tests": "tests/test_tensor_engine.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/tensor_engine.py",
      "id": "pcna_tensor_engine"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_gen_instance_id, _derive_key_id, _compute_blueprint_hash, _shard_blueprint, ThetaTensor._recompute_coherence",
        "module_kind": "engine",
        "module_name": "theta",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "ThetaTensor, GATE_THRESHOLD, N",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "N=29 standalone microkernel gate ring with ragged per-node circle counts, SHA-256 blueprint sharding, and gate control via GATE_THRESHOLD=0.45.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/theta.py",
      "id": "pcna_theta"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_initialize_topology, _heptagram_neighbors",
        "module_kind": "engine",
        "module_name": "topology",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "PCNATopology, Seed, SeedRole",
        "requires": "none",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "Stable seed-id topology \u2014 maps compute-shard neighbors to global seed IDs, computes heptagram neighbors and sentinel scan paths, and serializes to JSON for HTTP responses.",
        "tests": "tests/tests_topology.py",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/topology.py",
      "id": "pcna_topology"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_get_default_pcna, ZetaEngine._coherence_from_metrics, ZetaEngine._sigma_nudge_factors, ZetaEngine._theta_gate_factor",
        "module_kind": "engine",
        "module_name": "zeta",
        "network_boundary": "none",
        "owner": "Erin Spencer",
        "public_surface": "ZetaEngine, _zeta_engine",
        "requires": "pcna_edcm, pcna_pcna, pcna_sigma",
        "rollback": "remove import and call sites",
        "rollout": "default_enabled",
        "since": "2026-06-02",
        "storage_boundary": "none",
        "summary": "ZFAE evaluator that scores each assistant response via EDCM (no LLM) and nudges PCNAEngine.phi, with per-directory resolution control and a module-level singleton.",
        "tests": "hmmm",
        "unresolved": "none",
        "user_data_boundary": "none"
      },
      "file": "ptcna/neural/zeta.py",
      "id": "pcna_zeta"
    },
    {
      "block": "MODULE_BUILD",
      "fields": {
        "admin_only": "false",
        "auth_boundary": "none",
        "internal_surface": "_build_coherence_up_to, _is_prime, _prime_factors",
        "module_kind": "engine",
        "module_name": "constants",
        "network_boundary": "none",
        "owner": "Erin Patrick Spencer",
        "public_surface": "NOMINAL_CIRCLES_PER_SEED, SEED_ROUTING_STEP, HEPTAGRAM_VERTICES, is_coherence_prime, coherence_primes_up_to, nth_coherence_prime",
        "requires": "coherence_primes (mirrored from interdependent_lib, NOT imported \u2014 importing the aggregator would invert the dependency graph)",
        "rollback": "none (greenfield module; revert the file)",
        "rollout": "default_enabled (imported by seed.compose via ptcna.seed.__init__)",
        "since": "2026-06-05 (greenfield scaffold of the seed package, pre-consolidation `pcta`)",
        "storage_boundary": "none",
        "summary": "seed-layer heptagram routing motif and the recursive coherence-prime guard (composition counts are variable)",
        "tests": "tests.test_constants",
        "unresolved": "none (PCTA acronym, variable-count rule, and \"motion\" = Fickian flux J = \u2212D \u2207\u03c6 all resolved by maintainer)",
        "user_data_boundary": "none"
      },
      "file": "ptcna/seed/constants.py",
      "id": "seed_constants"
    }
  ],
  "edges": [
    {
      "from": "pcna_core_main",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_core_main",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_core_main",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_core_main",
      "to": "pcna_tensor_engine"
    },
    {
      "from": "pcna_core_main",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_core_main",
      "to": "pcna_topology"
    },
    {
      "from": "pcna_edcm",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_edcm",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_edcm",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_edcm",
      "to": "none"
    },
    {
      "from": "pcna_helix_vis",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_helix_vis",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_helix_vis",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_helix_vis",
      "to": "none"
    },
    {
      "from": "pcna_memory_core",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_memory_core",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_memory_core",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_memory_core",
      "to": "none"
    },
    {
      "from": "pcna_merge",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_merge",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_merge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_merge",
      "to": "pcna_pcna"
    },
    {
      "from": "pcna_merge",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_merge",
      "to": "pcna_ring_core"
    },
    {
      "from": "pcna_pcna",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_pcna",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "pcna_memory_core"
    },
    {
      "from": "pcna_pcna",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "pcna_ring_core"
    },
    {
      "from": "pcna_pcna",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_pcna",
      "to": "pcna_theta"
    },
    {
      "from": "pcna_ring_core",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_ring_core",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_ring_core",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_ring_core",
      "to": "none"
    },
    {
      "from": "pcna_routing_loop",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_routing_loop",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_routing_loop",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_routing_loop",
      "to": "none"
    },
    {
      "from": "pcna_sigma",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_sigma",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_sigma",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_sigma",
      "to": "pcna_ring_core"
    },
    {
      "from": "pcna_tensor_engine",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_tensor_engine",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_tensor_engine",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_tensor_engine",
      "to": "none"
    },
    {
      "from": "pcna_theta",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_theta",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_theta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_theta",
      "to": "none"
    },
    {
      "from": "pcna_topology",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_topology",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_topology",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_topology",
      "to": "none"
    },
    {
      "from": "pcna_zeta",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "Erin Spencer"
    },
    {
      "from": "pcna_zeta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "pcna_edcm"
    },
    {
      "from": "pcna_zeta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "pcna_pcna"
    },
    {
      "from": "pcna_zeta",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "pcna_zeta",
      "to": "pcna_sigma"
    },
    {
      "from": "prime_core_constants",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "prime_core_constants",
      "to": "Erin Spencer"
    },
    {
      "from": "prime_core_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "prime_core_constants",
      "to": "coherence_primes (mirrored from interdependent_lib"
    },
    {
      "from": "prime_core_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "prime_core_constants",
      "to": "not imported \u2014 would invert the dependency graph)"
    },
    {
      "from": "seed_constants",
      "kind": "owns",
      "source_block": "MODULE_BUILD",
      "source_id": "seed_constants",
      "to": "Erin Patrick Spencer"
    },
    {
      "from": "seed_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "seed_constants",
      "to": "NOT imported \u2014 importing the aggregator would invert the dependency graph)"
    },
    {
      "from": "seed_constants",
      "kind": "requires",
      "source_block": "MODULE_BUILD",
      "source_id": "seed_constants",
      "to": "coherence_primes (mirrored from interdependent_lib"
    }
  ],
  "gaps": [],
  "repo": "The-Interdependency/ptcna"
});
