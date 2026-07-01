# Classical Reinforcement Learning Tools

> Environment standards, readable implementations, reusable libraries, and high-throughput training systems.

[← Back to README](../README.md) · [Distributed RL](distributed-rl.md) · [LLM RL](llm-rl.md) · [Agentic RL](agentic-rl.md) · [Learning Resources](learning-resources.md)

## Environment and dataset interfaces

### Gymnasium

[Gymnasium](https://gymnasium.farama.org/) is the standard single-agent environment API. It defines `reset`, `step`, termination, truncation, wrappers, and vectorized environments. Use it as the default interface for new classical RL environments.

### PettingZoo

[PettingZoo](https://pettingzoo.farama.org/) standardizes multi-agent environments through sequential AEC and parallel APIs. It is especially useful for turn-based games, cooperative tasks, competitive games, and self-play.

### Minari

[Minari](https://minari.farama.org/) provides a standard for offline RL datasets. It helps package trajectories, environment metadata, and dataset versions so that offline experiments can be reproduced.

### EnvPool

[EnvPool](https://github.com/sail-sg/envpool) is a high-throughput environment execution layer implemented largely in C++. It is useful when Python environment stepping becomes the main bottleneck.

## Minimal and educational implementations

### OpenAI Spinning Up

[Spinning Up](https://spinningup.openai.com/) remains a strong conceptual introduction to policy gradients, actor–critic methods, TRPO, PPO, DDPG, TD3, and SAC. Its code should be treated as educational reference rather than a modern production framework.

### CleanRL

[CleanRL](https://github.com/vwxyzjn/cleanrl) keeps complete algorithm variants in compact, self-contained files. It is one of the best choices for understanding exactly how an RL experiment is assembled and for modifying a paper implementation without navigating a large framework hierarchy.

### Dopamine

[Dopamine](https://github.com/google/dopamine) is a compact research framework centered on value-based RL, Atari, DQN variants, and distributional methods. It is especially useful for studying the design of value-learning experiments.

## General-purpose libraries

### Stable-Baselines3

[Stable-Baselines3](https://github.com/DLR-RM/stable-baselines3) offers mature PyTorch implementations of common algorithms such as PPO, DQN, SAC, TD3, DDPG, A2C, and HER.

Use it when:

- a trustworthy baseline is needed quickly;
- a custom Gymnasium environment requires a sanity check;
- algorithm internals are not the main research contribution;
- reproducible training and evaluation utilities matter.

### Tianshou

[Tianshou](https://github.com/thu-ml/tianshou) organizes RL around policies, collectors, replay buffers, vector environments, and trainers. It is more research-oriented than Stable-Baselines3 while retaining reusable infrastructure.

Use it when:

- collectors and buffers should be reused across several algorithms;
- the project is PyTorch-based;
- offline, multi-agent, or custom policy work is expected;
- a modular framework is preferred over single-file scripts.

### TorchRL

[TorchRL](https://github.com/pytorch/rl) is the PyTorch-native RL platform. Its key abstractions include TensorDict, transforms, collectors, replay buffers, objective modules, and model components.

Use it when:

- the project must integrate deeply with modern PyTorch;
- observations and trajectories are structured;
- new objectives and data pipelines will be composed frequently;
- long-term maintainability matters more than the easiest first run.

### DI-engine

[DI-engine](https://github.com/opendilab/DI-engine) is a broad decision-intelligence framework covering online RL, offline RL, imitation learning, model-based methods, multi-agent training, exploration, and distributed pipelines.

It is valuable for teams that need a configurable end-to-end RL system rather than only a collection of algorithms.

### ElegantRL and JoyRL

[ElegantRL](https://github.com/AI4Finance-Foundation/ElegantRL) provides compact PyTorch implementations and parallel-training examples. [JoyRL](https://github.com/datawhalechina/joyrl) is useful as a teaching-oriented framework and learning path. Both are best viewed as complementary resources rather than default choices for every production workload.

## Comparison

| Framework | Best use | Transparency | Modularity | Scale | Beginner friendly |
|---|---|---:|---:|---:|---:|
| CleanRL | Read and modify algorithms | Excellent | Low | Limited | High |
| Stable-Baselines3 | Reliable baselines | Moderate | High | Limited | Excellent |
| Tianshou | Modular PyTorch research | Strong | Strong | Moderate | Good |
| TorchRL | PyTorch-native platform | Strong | Excellent | Extensible | Moderate |
| DI-engine | Broad RL pipelines | Moderate | Strong | Strong | Moderate |
| RLlib | Cluster-scale RL | Lower | Strong | Excellent | Moderate/low |

## Recommended path

1. Learn MDPs, temporal-difference learning, policy gradients, actor–critic methods, PPO, and SAC.
2. Read one complete CleanRL implementation.
3. Reproduce the same task in Stable-Baselines3.
4. Move to Tianshou or TorchRL when reusable research infrastructure becomes necessary.
5. Add RLlib, Sample Factory, or DI-engine only when environment throughput or distributed execution becomes a real bottleneck.

---

[← Back to README](../README.md)

*Last reviewed: June 30, 2026.*
