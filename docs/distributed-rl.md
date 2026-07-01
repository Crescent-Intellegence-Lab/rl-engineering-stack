# Distributed Reinforcement Learning Infrastructure

> Scaling environment sampling, learners, rollout engines, model parallelism, and cluster orchestration.

[← Back to README](../README.md) · [Classical RL](classical-rl.md) · [LLM RL](llm-rl.md) · [Agentic RL](agentic-rl.md) · [Learning Resources](learning-resources.md)

## Distributed classical RL

### Ray RLlib

[RLlib](https://docs.ray.io/en/latest/rllib/) is a general distributed RL framework built on Ray. It provides environment runners, learners, replay buffers, multi-agent support, checkpointing, evaluation, and fault-tolerant execution.

Use RLlib when:

- the workload spans many CPU environments or several nodes;
- multi-agent training is central;
- cluster scheduling and failure recovery matter;
- the team already uses Ray.

Its main cost is complexity: small experiments are usually easier to debug in CleanRL, Stable-Baselines3, Tianshou, or TorchRL.

### Sample Factory

[Sample Factory](https://github.com/alex-petrenko/sample-factory) focuses on high-throughput policy-gradient training, especially PPO-style workloads. It is a strong reference for actor–learner overlap, shared-memory communication, and large numbers of parallel environments.

### PARL

[PARL](https://github.com/PaddlePaddle/PARL) represents an important distributed RL design in the PaddlePaddle ecosystem. It separates models, algorithms, and agents and includes distributed actor support through xparl.

## LLM rollout engines

### vLLM

[vLLM](https://github.com/vllm-project/vllm) is widely used as a rollout backend for LLM RL. Its main systems features include PagedAttention, continuous batching, prefix caching, chunked prefill, tensor-parallel inference, and efficient KV-cache management.

In RL, vLLM must often receive updated policy weights from a trainer using FSDP, DeepSpeed, or Megatron. End-to-end performance therefore depends on both generation throughput and weight synchronization.

### SGLang

[SGLang](https://github.com/sgl-project/sglang) is another major serving and rollout backend. It is increasingly used for structured generation, multi-turn workloads, tool use, and scalable rollout services in projects such as veRL, AReaL, and slime.

Serving benchmarks alone do not determine the best RL backend. The relevant measurement is the complete loop:

```text
rollout → reward or verification → training → weight synchronization → rollout
```

## Training backends

### PyTorch FSDP and FSDP2

FSDP shards parameters, gradients, and optimizer states across data-parallel workers. It is attractive for research teams that want a PyTorch-native stack and close integration with Hugging Face models.

### DeepSpeed ZeRO

[DeepSpeed](https://github.com/microsoft/DeepSpeed) provides ZeRO sharding, offload options, memory management, and broad Hugging Face integration. It is central to OpenRLHF and many earlier RLHF implementations.

### Megatron Core

[Megatron Core](https://github.com/NVIDIA/Megatron-LM) supports tensor, pipeline, sequence, context, expert, and data parallelism. It is preferred for very large dense or mixture-of-experts models, but it introduces additional model-conversion and configuration complexity.

## Cluster orchestration

### Ray

Ray is an orchestration layer rather than an RL algorithm. In an RL system it decides:

- which workers run on which GPUs;
- how actors and learners are placed;
- when rollout and training tasks execute;
- how failures are retried;
- how data moves across processes and nodes.

This distinction is important: Ray may manage a PPO or GRPO workload, but it does not define the mathematical objective.

## Configuration and observability

### Hydra

Hydra is useful for hierarchical configurations covering models, datasets, rollout engines, algorithms, rewards, parallelism, and evaluation. Always save the fully resolved configuration for reproducibility.

### Weights & Biases, TensorBoard, and MLflow

Track more than final reward. Useful metrics include:

- environment steps or generated tokens per second;
- rollout latency distribution;
- policy and value losses;
- KL divergence;
- entropy;
- clipping fraction;
- gradient norm;
- response length;
- invalid-output rate;
- verifier pass rate;
- tool failure rate;
- GPU utilization and memory.

## Systems evaluation checklist

A distributed RL report should include both learning and systems outcomes:

| Category | Suggested metrics |
|---|---|
| Learning | reward, success rate, pass rate, sample efficiency, stability |
| Rollout | tokens/s, episodes/s, latency percentiles, truncation rate |
| Training | step time, throughput, scaling efficiency, gradient statistics |
| Synchronization | transfer time, pause time, policy staleness |
| Resources | GPU utilization, memory, CPU usage, network traffic |
| Reliability | retries, worker failures, environment failures |

A faster system is not necessarily a better RL system if policy lag, stale samples, or changed truncation behavior reduce final policy quality.

---

[← Back to README](../README.md)

*Last reviewed: June 30, 2026.*
