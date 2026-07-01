# Asynchronous and Agentic Reinforcement Learning

> Frameworks and system designs for asynchronous rollouts, tool use, long-horizon environments, and training-agent decoupling.

[← Back to README](../README.md) · [Classical RL](classical-rl.md) · [Distributed RL](distributed-rl.md) · [LLM RL](llm-rl.md) · [Agentic RL](agentic-rl.md) · [Learning Resources](learning-resources.md)

---

## Asynchronous and Agentic RL

### AReaL

**Best for:** fully asynchronous RL for reasoning and agentic language models.

[AReaL](https://github.com/areal-project/AReaL) decouples generation and training:

```text
rollout workers continuously generate trajectories
                         ↓
                  trajectory stream
                         ↓
trainers update whenever enough data is available
```

Its central systems problem is balancing:

- higher throughput;
- policy freshness;
- rollout-worker utilization;
- trainer utilization;
- stability under stale trajectories.

AReaL is especially relevant when rollout length varies greatly or external environments create stragglers.

### SkyRL

**Best for:** a full-stack LLM RL platform with long-horizon agent support.

[SkyRL](https://github.com/novasky-ai/skyrl) brings together:

- model training;
- agent execution;
- tool-use environments;
- asynchronous dispatch;
- long-horizon evaluation;
- interoperable training backends.

Its ecosystem includes an agent layer and environment collection for tasks such as:

- coding;
- terminal use;
- search;
- SQL;
- software engineering;
- other multi-turn tool workflows.

### rLLM

**Best for:** defining language agents and environments independently of the underlying RL backend.

[rLLM](https://rllm-project.readthedocs.io/) allows users to:

- define custom agents;
- define interactive environments;
- collect trajectories;
- connect to scalable RL training loops;
- reuse agent code for training and evaluation;
- integrate external task and benchmark protocols.

This separation is useful when the environment and agent harness should not be tightly coupled to one trainer implementation.

### Agent Lightning

**Best for:** adding RL training to existing agent applications with minimal changes to the agent code.

[Agent Lightning](https://github.com/microsoft/agent-lightning) emphasizes:

- separation of agent execution and model training;
- standardized trajectory interfaces;
- agent observability;
- credit assignment over complex workflows;
- compatibility with agents built using different application frameworks.

It is particularly relevant for agents that already contain:

- retrieval;
- planning;
- database calls;
- tool use;
- dynamic workflows;
- multi-agent interactions.

### Emerging projects to watch

The agentic RL ecosystem is evolving quickly. Additional projects worth monitoring include:

- [Agent-R1](https://github.com/AgentR1/Agent-R1), which models multi-step agent interaction with explicit step-level transitions;
- [AgentGym-RL](https://github.com/woooodyy/AgentGym-RL), which focuses on diverse long-horizon interactive environments;
- specialized agent layers built on top of veRL, OpenRLHF, or custom rollout services.

These projects are promising, but their APIs and system boundaries may change faster than those of established classical RL libraries.

---

---

[← Back to README](../README.md) · [Classical RL](classical-rl.md) · [Distributed RL](distributed-rl.md) · [LLM RL](llm-rl.md) · [Agentic RL](agentic-rl.md) · [Learning Resources](learning-resources.md)

*Last reviewed: June 30, 2026.*
