# Presenter Guide

## Suggested duration

25–30 minutes, followed by questions.

## Slide-by-slide guidance

### 1. RL Engineering Tools

Set expectations immediately: this is an architecture-oriented landscape, not an exhaustive hands-on benchmark. The objective is to explain why different engineering layers exist and which framework represents each layer.

### 2. How to Read This Landscape

State the evidence boundary clearly. The review uses official documentation, repository organization, supported backends, and examples. Avoid universal speed or reliability claims without controlled experiments.

### 3. One RL Stack, Multiple Engineering Layers

Use this as the organizing map. Gymnasium, CleanRL, RLlib, TRL, veRL, and AReaL are not direct substitutes; each introduces a new abstraction as the workload scales.

### 4. Gymnasium

Emphasize that Gymnasium standardizes interaction through `reset`, `step`, spaces, wrappers, and vector environments. It does not provide PPO, replay buffers, or distributed learning.

### 5. CleanRL vs. Stable-Baselines3

Present a design trade-off rather than a winner. CleanRL exposes the complete training path and is excellent for implementation research. Stable-Baselines3 provides a compact, tested API for reliable baselines.

### 6. RLlib

Explain that RLlib's main contribution is distributed execution: environment runners, learners, multi-agent support, placement, and fault handling. The complexity is justified only when sampling or cluster orchestration is genuinely required.

### 7. Why LLM RL Needs a Different Stack

This is the transition slide. In LLM RL, the action is a token sequence, generation is expensive, the policy is large, multiple models may coexist, and weights must move between training and inference layouts.

### 8. TRL

Frame TRL as the lowest-friction entry point for modern post-training. It is ideal when the research question is an objective, reward function, or dataset rather than multi-model cluster orchestration.

### 9. veRL

Focus on its architecture: RL dataflow is separated from concrete training and rollout backends. Mention OpenRLHF as a neighboring Ray + DeepSpeed + vLLM stack, without presenting one as universally superior.

### 10. AReaL

Explain the synchronous barrier and the asynchronous alternative. The core trade-off is utilization versus policy freshness. Agentic workloads make this important because tool calls and environment durations vary widely.

### 11. Where Other Frameworks Fit

Clarify that this is a conceptual positioning diagram, not a performance ranking. The horizontal and vertical axes reflect dominant abstractions and operational complexity.

### 12. Representative 25-Minute Presentation

Show the recommended pacing. The full framework catalog belongs in backup material and the repository, not in the main verbal narrative.

### 13. Takeaways

End with evidence-aware language. A strong claim is: “The official architecture supports these backends and execution modes.” Avoid claims such as “Framework A is faster than Framework B” without a controlled comparison.

### 14. Primary Sources

Keep this slide available for questions. All links are official documentation or project repositories.

## Recommended evidence labels

Before presenting, optionally add one of these labels beside each tool based on your own experience:

- **Hands-on** — executed or reproduced locally.
- **Source-reviewed** — official documentation and code organization reviewed.
- **Mention-only** — included only to position the design space.

## Optional minimum demonstrations

A full multi-framework benchmark is unnecessary. Two small demonstrations are sufficient:

1. Gymnasium CartPole with Stable-Baselines3 PPO.
2. A minimal TRL SFT, DPO, or GRPO configuration with dataset loading and trainer initialization.

Large-scale veRL, OpenRLHF, NeMo RL, and AReaL systems can be presented at the architecture level unless equivalent cluster experiments are available.
