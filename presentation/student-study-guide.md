# Student Study Guide: RL Engineering Tools

This guide summarizes the student-facing slide deck and is intended for review after class.

## 1. The core loop

A reinforcement-learning system usually contains:

```text
Environment → Policy → Collector → Learner → Evaluator
```

Different libraries specialize in different parts of this loop. Do not compare tools across layers as if they solve the same problem.

## 2. Classical RL tools

### Gymnasium

Gymnasium standardizes the interaction between agents and environments through `reset()`, `step()`, action spaces, observation spaces, wrappers, and vectorized environments. It does not train policies by itself.

### CleanRL

CleanRL is best for learning how algorithms work internally. A typical implementation exposes environment stepping, rollout collection, advantage estimation, loss computation, and optimizer updates in one file.

### Stable-Baselines3

Stable-Baselines3 is best for quick, trusted baselines. It provides high-level APIs, tested implementations, logging, evaluation utilities, and common algorithms such as PPO, DQN, SAC, TD3, and A2C.

### RLlib

RLlib is useful when many environments, multiple learners, multi-agent policies, or Ray-based scheduling become important. It is more complex than a single-process implementation, so it is usually not the first choice for small baselines.

## 3. Why LLM RL is different

In classical RL, an action may be a small discrete choice or low-dimensional vector. In LLM RL, an action is a sequence of tokens, which makes rollout generation expensive.

LLM RL systems may coordinate:

- policy model;
- reference model;
- critic;
- reward model or verifier;
- rollout engine;
- distributed trainer;
- weight synchronization.

## 4. Offline preference optimization versus online RL

Offline preference optimization methods such as DPO, ORPO, and KTO train on fixed preference datasets.

Online methods such as PPO, GRPO, and RLOO repeatedly generate new answers from the current policy, score them, compute advantages, and update the policy.

This distinction matters because online RL requires scalable rollout infrastructure.

## 5. LLM post-training tools

### TRL

TRL is a good first tool for Hugging Face-native experiments. It supports supervised fine-tuning, reward modeling, offline preference methods, and several online RL trainers.

### veRL and OpenRLHF

veRL and OpenRLHF represent large-scale LLM RL systems. Their main job is not simply implementing a loss function. They coordinate rollout engines, training backends, worker placement, and weight synchronization.

### Rollout and training backends

vLLM and SGLang optimize generation. FSDP, DeepSpeed, and Megatron optimize training and memory. In LLM RL, moving updated weights from the trainer to the rollout engine is a central systems problem.

## 6. Agentic and asynchronous RL

Agentic RL involves multi-turn tool use, code execution, browser or terminal interaction, and long-horizon trajectories. Because different trajectories can take very different amounts of time, synchronous batch training may waste resources.

Asynchronous systems such as AReaL decouple generation and training, but they introduce the challenge of stale-policy data.

## 7. How to choose a stack

| Project goal | Good starting point |
|---|---|
| Learn RL internals | Gymnasium + CleanRL |
| Run a trusted classical baseline | Stable-Baselines3 |
| Develop modular RL research code | Tianshou / TorchRL |
| Scale classical RL | RLlib / Sample Factory |
| Run small LLM post-training | TRL / LLaMA-Factory / ms-swift |
| Build distributed LLM RL | veRL / OpenRLHF / NeMo RL |
| Study tool-using agents | AReaL / SkyRL / rLLM / Agent Lightning |

## 8. Key lesson

The best RL engineering report does not simply list tool names. It explains which bottleneck appears at each scale and which framework introduces the relevant abstraction.

## 9. Primary sources

- Gymnasium: <https://gymnasium.farama.org/>
- Stable-Baselines3: <https://stable-baselines3.readthedocs.io/en/master/>
- RLlib: <https://docs.ray.io/en/latest/rllib/index.html>
- TRL: <https://huggingface.co/docs/trl/index>
- veRL: <https://github.com/verl-project/verl>
- OpenRLHF: <https://github.com/OpenRLHF/OpenRLHF>
- AReaL: <https://github.com/areal-project/AReaL>
