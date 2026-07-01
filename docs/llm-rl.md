# Reinforcement Learning for Language Models

> Preference optimization, RLHF, RLVR, distributed post-training, and modern rollout/training stacks.

[← Back to README](../README.md) · [Classical RL](classical-rl.md) · [Distributed RL](distributed-rl.md) · [Agentic RL](agentic-rl.md) · [Learning Resources](learning-resources.md)

## Preference optimization versus online RL

Offline preference methods such as DPO, IPO, ORPO, KTO, and SimPO train on fixed preference data. They do not require the current policy to generate new samples during every update.

Online methods such as PPO, GRPO, RLOO, REINFORCE variants, and DAPO repeatedly execute:

```text
current policy → rollout → reward or verifier → advantage → update → new policy
```

This distinction changes the engineering requirements. Online RL needs scalable generation, reward computation, policy-version tracking, and repeated weight synchronization.

## RLHF, RLVR, and reasoning RL

### RLHF

RLHF usually combines supervised fine-tuning, preference data, reward modeling, and policy optimization. A classic PPO-style stack may contain:

- policy or actor;
- reference model;
- critic;
- reward model.

### RLVR

Reinforcement learning with verifiable rewards uses automatically checkable signals such as:

- mathematical answer correctness;
- unit tests;
- program execution;
- formatting constraints;
- game outcomes;
- environment success.

RLVR reduces dependence on a learned reward model, but verifier design becomes part of the learning problem.

## Frameworks

### Hugging Face TRL

[TRL](https://github.com/huggingface/trl) is a trainer-first framework integrated with Transformers, Datasets, PEFT, and Accelerate. It is a strong starting point for SFT, reward modeling, DPO-family methods, PPO, GRPO, and custom reward functions.

Best fit:

- objective or reward-function prototyping;
- LoRA and QLoRA;
- single-node or moderate-scale experiments;
- teams already using the Hugging Face stack.

### LLaMA-Factory

[LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) provides a low-code interface for continued pretraining, SFT, reward modeling, PPO, DPO, KTO, ORPO, LoRA/QLoRA, evaluation, and deployment.

It is best viewed as an accessible model-adaptation platform rather than a framework centered on large-scale asynchronous RL orchestration.

### ms-swift

[ms-swift](https://github.com/modelscope/ms-swift) supports broad LLM and VLM post-training workflows, including GRPO-family methods, custom rewards, LoRA, full-parameter training, multi-node execution, and rollout integrations such as vLLM and SGLang.

It is especially attractive for practical experiments with Qwen-family models, multimodal RL, and teams that value strong end-to-end recipes.

### OpenRLHF

[OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) combines Ray orchestration, DeepSpeed training, and vLLM rollout. It supports PPO, GRPO, RLOO, REINFORCE-family methods, model colocation, and multi-turn workflows.

Typical architecture:

```text
Ray
├── actor
├── critic
├── reference model
├── reward model
└── vLLM rollout workers
```

Best fit:

- Hugging Face-compatible models;
- DeepSpeed-based training;
- scalable PPO or GRPO;
- explicit GPU placement and colocation experiments.

### veRL

[veRL](https://github.com/verl-project/verl) is a flexible distributed LLM RL framework originating from HybridFlow. It separates RL dataflow from concrete worker execution and supports multiple training and rollout backends.

Representative capabilities include:

- FSDP and Megatron training;
- vLLM and SGLang rollout;
- PPO, GRPO, DAPO, and custom advantage estimators;
- reasoning RL and RLVR recipes;
- flexible worker placement and resource pools.

veRL is one of the strongest choices for research that studies both algorithms and systems.

### NVIDIA NeMo RL

[NeMo RL](https://github.com/NVIDIA-NeMo/RL) integrates NVIDIA's post-training stack with DTensor/FSDP2, Megatron Core, vLLM or Megatron inference, and support for LLM and VLM workflows.

Best fit:

- large NVIDIA GPU clusters;
- Megatron-based models;
- long context, MoE, FP8, or multimodal training;
- teams already using NVIDIA containers and tooling.

### slime

[slime](https://github.com/THUDM/slime) combines Megatron training with SGLang rollout and emphasizes flexible data generation for reasoning, search, coding, and tool-use workloads.

It reflects an important trend: the rollout system is becoming an independent data-production service rather than a small helper inside the trainer.

### DeepSpeed-Chat

[DeepSpeed-Chat](https://github.com/microsoft/DeepSpeedExamples/tree/master/applications/DeepSpeed-Chat) remains useful as a reference for the classic three-stage RLHF pipeline:

1. supervised fine-tuning;
2. reward-model training;
3. PPO-based RLHF.

For new large-scale projects, modern frameworks usually provide more advanced rollout and agent support.

## Framework comparison

| Framework | Main strength | Training backend | Rollout focus | Best fit |
|---|---|---|---|---|
| TRL | Easy objective prototyping | Transformers/Accelerate integrations | Moderate | Small and medium experiments |
| LLaMA-Factory | Low-code adaptation | Transformers/DeepSpeed integrations | Limited systems focus | Accessible SFT and preference training |
| ms-swift | Broad LLM/VLM recipes | PyTorch and Megatron paths | vLLM/SGLang integrations | Practical GRPO and multimodal RL |
| OpenRLHF | Complete Ray/DeepSpeed stack | DeepSpeed | vLLM | Scalable Hugging Face RLHF |
| veRL | Flexible research architecture | FSDP/Megatron | vLLM/SGLang | Algorithm and systems research |
| NeMo RL | NVIDIA-scale optimization | FSDP2/Megatron Core | vLLM/Megatron | Very large models and VLMs |
| slime | Megatron + SGLang flexibility | Megatron | SGLang | Custom reasoning and agent rollouts |

## Major engineering challenges

### Weight synchronization

Training and rollout workers often store parameters in different layouts. The system must transfer updated weights without excessive conversion, communication, or rollout downtime.

### Variable trajectory length

Long reasoning traces and tool calls create stragglers. Batching, scheduling, truncation, and asynchronous execution can change both throughput and the effective training distribution.

### Policy freshness

Asynchronous systems improve utilization but may train on trajectories generated by older policy versions. Reports should track policy lag and evaluate whether throughput gains affect convergence.

### Reward and verifier integrity

A verifier is not automatically correct. Test for reward hacking, formatting shortcuts, data leakage, nondeterministic execution, and inconsistent sandbox behavior.

## Recommended progression

1. Learn PPO and advantage estimation in classical RL.
2. Run SFT and a fixed-data preference method in TRL, LLaMA-Factory, or ms-swift.
3. Run a small online GRPO or PPO experiment with a transparent reward.
4. Inspect rollout, reward, token masking, old log probabilities, KL handling, and weight updates.
5. Move to OpenRLHF or veRL when rollout and distributed placement become central.
6. Use NeMo RL or slime when Megatron-scale execution is necessary.

---

[← Back to README](../README.md)

*Last reviewed: June 30, 2026.*
