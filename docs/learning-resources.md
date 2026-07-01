# Learning Resources and Report Structure

> A curated path from classical reinforcement learning to distributed LLM and agentic RL.

[← Back to README](../README.md) · [Classical RL](classical-rl.md) · [Distributed RL](distributed-rl.md) · [LLM RL](llm-rl.md) · [Agentic RL](agentic-rl.md)

## Foundations

- [Reinforcement Learning: An Introduction](http://incompleteideas.net/book/the-book-2nd.html) — Sutton and Barto's standard textbook.
- [OpenAI Spinning Up](https://spinningup.openai.com/) — concise theory and reference implementations for policy-gradient and actor–critic methods.
- [Hands-on Reinforcement Learning](https://hrl.boyuai.com/) — a notebook-oriented course connecting theory and PyTorch implementations.
- [EasyRL](https://github.com/datawhalechina/easy-rl) — a broad tutorial covering major classical algorithms and practical examples.
- [David Silver's RL Course](https://www.davidsilver.uk/teaching/) — foundational lectures on value functions, dynamic programming, model-free learning, and policy gradients.

## Classical RL implementation resources

- [CleanRL documentation](https://docs.cleanrl.dev/) — complete experiment scripts and reproducibility reports.
- [Stable-Baselines3 documentation](https://stable-baselines3.readthedocs.io/) — reliable baselines, evaluation utilities, and environment guidance.
- [TorchRL documentation](https://pytorch.org/rl/) — TensorDict, collectors, replay buffers, objectives, and PyTorch-native components.
- [Tianshou documentation](https://tianshou.org/) — policies, collectors, trainers, and replay buffers.
- [DI-engine documentation](https://di-engine-docs.readthedocs.io/) — configurable decision-intelligence pipelines and distributed components.
- [RLlib documentation](https://docs.ray.io/en/latest/rllib/) — distributed environment runners, learners, multi-agent training, and Ray integration.

## RLHF and LLM post-training

- [RLHF Book](https://rlhfbook.com/) — a structured treatment of instruction tuning, preferences, reward models, policy optimization, and evaluation.
- [RLHF Book Chinese translation](https://github.com/jweihe/RLHF-book-Chinese) — a useful companion translation.
- [Hugging Face TRL](https://huggingface.co/docs/trl/) — trainer documentation and examples for SFT, reward modeling, preference methods, PPO, and GRPO.
- [OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) — scalable Ray, DeepSpeed, and vLLM training with English and Chinese documentation.
- [veRL](https://github.com/verl-project/verl) — flexible FSDP/Megatron and vLLM/SGLang LLM RL infrastructure.
- [NeMo RL](https://github.com/NVIDIA-NeMo/RL) — NVIDIA's post-training framework for LLMs and VLMs.
- [ms-swift](https://github.com/modelscope/ms-swift) — broad practical recipes for LLM/VLM post-training and GRPO-family methods.
- [LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) — accessible fine-tuning and preference-optimization workflows.
- [Awesome ML Systems Tutorial](https://github.com/BBuf/how-to-optim-algorithm-in-cuda) — selected systems tutorials and source-level discussions; verify the relevant subdirectory and framework version.

## Inference and distributed systems

- [vLLM documentation](https://docs.vllm.ai/) — PagedAttention, batching, serving, and rollout integration.
- [SGLang documentation](https://docs.sglang.ai/) — scalable serving, structured generation, and rollout infrastructure.
- [Ray documentation](https://docs.ray.io/) — actors, placement groups, tasks, fault tolerance, and cluster execution.
- [PyTorch FSDP documentation](https://pytorch.org/docs/stable/fsdp.html) — parameter and optimizer-state sharding.
- [DeepSpeed documentation](https://www.deepspeed.ai/) — ZeRO, offload, memory optimization, and distributed training.
- [Megatron-LM](https://github.com/NVIDIA/Megatron-LM) — large-model tensor, pipeline, context, and expert parallelism.

## Agentic and asynchronous RL

- [AReaL](https://github.com/areal-project/AReaL) — fully asynchronous rollout and training.
- [SkyRL](https://github.com/novasky-ai/skyrl) — long-horizon agent environments and full-stack LLM RL.
- [rLLM](https://rllm-project.readthedocs.io/) — reusable agent and environment abstractions.
- [Agent Lightning](https://github.com/microsoft/agent-lightning) — training existing agent applications with separated execution and optimization.

## Recommended learning paths

### Path A: no prior RL background

```text
Sutton and Barto or Hands-on RL
→ tabular Q-learning and temporal-difference learning
→ REINFORCE and actor–critic
→ PPO and SAC
→ CleanRL
→ Stable-Baselines3 or Tianshou
```

### Path B: LLM background, limited RL experience

```text
MDPs and policy gradients
→ PPO and advantage estimation
→ RLHF Book
→ TRL or ms-swift
→ small online GRPO experiment
→ OpenRLHF or veRL
```

### Path C: LLM RL systems research

```text
PPO/GRPO implementation details
→ Ray and distributed PyTorch
→ vLLM and SGLang
→ OpenRLHF and veRL source code
→ weight synchronization and worker placement
→ asynchronous rollout and Agentic RL
```

## Suggested 25–30 minute advisor presentation

1. **Problem framing (2 min)** — why RL tools must be separated by engineering layer.
2. **Classical RL stack (4 min)** — environments, collectors, buffers, learners, and baselines.
3. **Library landscape (5 min)** — CleanRL, Stable-Baselines3, Tianshou, TorchRL, DI-engine, and RLlib.
4. **Transition to LLM RL (4 min)** — why rollout, inference, and weight synchronization become first-class problems.
5. **LLM framework comparison (7 min)** — TRL, OpenRLHF, veRL, NeMo RL, ms-swift, LLaMA-Factory, and slime.
6. **Agentic and asynchronous RL (4 min)** — AReaL, SkyRL, rLLM, and Agent Lightning.
7. **Recommendations and open questions (3 min)** — stack selection, reproducibility, and future directions.

## Questions worth emphasizing

- What is the environment or data-generation process?
- Is training offline, on-policy, or partially off-policy?
- Where are rollouts generated?
- How are policy weights synchronized?
- Which components share GPUs?
- How is reward correctness verified?
- What systems metrics are reported alongside learning curves?
- Does asynchronous execution change the effective optimization problem?

---

[← Back to README](../README.md)

*Last reviewed: June 30, 2026.*
