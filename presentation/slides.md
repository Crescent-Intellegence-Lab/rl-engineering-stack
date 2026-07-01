---
marp: true
theme: default
paginate: true
size: 16:9
header: RL Engineering Tools
footer: Crescent-Intellegence-Lab · Student Deck · July 2026
style: |
  section {
    font-family: Arial, Helvetica, sans-serif;
    color: #172033;
    background: #f7f9fc;
    padding: 52px 66px;
  }
  h1, h2 { color: #0b1f33; }
  h1 { font-size: 38px; }
  h2 { font-size: 30px; }
  h3 { color: #16324f; }
  strong { color: #0b1f33; }
  code { background: #eaf0f6; }
  table { font-size: 20px; }
  blockquote {
    border-left: 7px solid #16a6a1;
    background: #e6f7f5;
    padding: 12px 20px;
  }
  .title-slide { background: #091826; color: white; }
  .title-slide h1 { color: white; font-size: 48px; }
  .title-slide h2 { color: #a7e8e4; font-weight: normal; }
  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .card { background: white; border: 1px solid #d6dee8; border-radius: 12px; padding: 18px 22px; }
---

<!-- _class: title-slide -->

# RL Engineering Tools

## From Classical RL to LLM Agents

A student-facing map of what each tool layer solves, when to use it, and how the bottleneck changes.

**Shuo Yan · Crescent-Intellegence-Lab · July 2026**

---

# Why Do RL Tools Exist?

A reinforcement learning project is not just an algorithm; it is a data-producing training loop.

```text
Environment → Policy → Collector → Learner → Evaluator
```

| Component | What it does |
|---|---|
| Environment | Produces observations and rewards |
| Policy | Chooses actions |
| Collector | Records trajectories |
| Learner | Updates model parameters |
| Evaluator | Checks progress and failures |

> As tasks get larger, different parts of this loop become bottlenecks. RL libraries mostly differ in which bottleneck they make easier to handle.

---

# Classical RL Stack: The Baseline Mental Model

```text
Environment → Policy → Collector → Learner → Evaluation
```

<div class="three">
<div class="card">

## On-policy

- PPO
- A2C
- Collect fresh rollouts before updates

</div>
<div class="card">

## Off-policy

- DQN
- SAC / TD3
- Reuse data from a replay buffer

</div>
<div class="card">

## Engineering questions

- How fast can we sample?
- Where is data stored?
- How reproducible is training?

</div>
</div>

---

# Gymnasium: Standardizing the Environment API

<div class="columns">
<div class="card">

```python
observation, info = env.reset()

observation, reward,
terminated, truncated, info = \
    env.step(action)
```

The same interaction pattern works across classic control, Atari-style tasks, MuJoCo-style control, and custom environments.

</div>
<div>

## What it gives you

- `reset()` / `step()`
- Action and observation spaces
- Wrappers
- Vectorized environments
- Custom environment pattern

## What it does not do

- Train PPO
- Manage replay buffers
- Estimate advantages
- Schedule workers

</div>
</div>

**Takeaway:** Gymnasium standardizes interaction, not learning.

---

# CleanRL vs. Stable-Baselines3

The right implementation style depends on whether you need to understand internals or run a reliable baseline.

<div class="columns">
<div class="card">

## CleanRL — transparent

```text
env loop → rollout → GAE
→ PPO loss → optimizer step
```

- Best for learning and modifying algorithms
- Easy to inspect every detail
- Less reusable for large codebases

</div>
<div class="card">

## Stable-Baselines3 — reliable baseline

```python
model = PPO("MlpPolicy", env)
model.learn(total_timesteps=100_000)
```

- Fast route to a trusted baseline
- Unified API and evaluation utilities
- Core details are hidden behind abstractions

</div>
</div>

---

# RLlib: Scaling Classical RL Beyond One Process

```text
Environment runners × N
          ↓
    sample stream
          ↓
     Learners × M
          ↓
  updated policy modules
```

<div class="columns">
<div class="card">

## RLlib is useful when

- Sampling dominates runtime
- Multi-agent policies are needed
- Ray-based cluster scheduling matters
- Distributed evaluation is required

</div>
<div class="card">

## Cost of this power

- More configuration
- Deeper abstractions
- More distributed failure modes
- Unnecessary for small single-process baselines

</div>
</div>

---

# Why LLM RL Changes the Tooling Problem

| Dimension | Classical RL | LLM RL |
|---|---|---|
| Observation | Small tensor or state | Prompt + conversation history |
| Action | Low-dimensional choice | Hundreds or thousands of tokens |
| Step time | Often milliseconds | Generation, tools, or external jobs |
| Policy size | Usually modest | Billions of parameters |
| Reward | Simulator reward | Reward model, verifier, or environment |

> New bottleneck: rollout generation + reward verification + weight synchronization.

---

# LLM Post-Training Methods: A Minimal Map

```text
SFT → Preference Data → Offline Preference Optimization → Online RL → RLVR
```

<div class="columns">
<div class="card">

## Offline methods

Examples: DPO, ORPO, KTO.

Train on fixed datasets. No new model-generated rollout is required during each update.

</div>
<div class="card">

## Online methods

Examples: PPO, GRPO, RLOO.

The current policy generates answers; a reward model, verifier, or environment scores them; then the policy updates.

</div>
</div>

---

# TRL: The Accessible Entry Point for LLM Post-Training

<div class="three">
<div class="card">

## Offline trainers

- `SFTTrainer`
- `DPOTrainer`
- KTO / ORPO workflows

</div>
<div class="card">

## Reward modeling

- `RewardTrainer`
- Process reward models
- Custom reward functions

</div>
<div class="card">

## Online trainers

- `GRPOTrainer`
- `PPOTrainer`
- RLOO / Online DPO

</div>
</div>

> Use TRL first when you want a simple Hugging Face-native experiment before building a full distributed RL system.

---

# veRL and OpenRLHF: When LLM RL Becomes a System

Large-scale LLM RL coordinates several models, rollout engines, and training backends.

```text
Actor · Reference · Critic · Reward / Verifier · Rollout Engine · Trainer
```

<div class="columns">
<div class="card">

## What veRL represents

- Separate RL dataflow from backend execution
- Support multiple rollout and training backends
- Make worker placement and weight synchronization explicit

</div>
<div class="card">

## What OpenRLHF represents

- Ray orchestration
- DeepSpeed training
- vLLM rollout
- Model colocation options

</div>
</div>

---

# Rollout Engines and Training Backends

<div class="columns">
<div class="card">

## Rollout engines

- vLLM and SGLang optimize generation throughput
- They manage batching and KV-cache efficiency
- They may run separately from the trainer

</div>
<div class="card">

## Training backends

- FSDP shards model states in PyTorch
- DeepSpeed ZeRO reduces memory pressure
- Megatron supports tensor, pipeline, and expert parallelism

</div>
</div>

> The hard part is synchronization: after training updates the policy, rollout workers need fresh weights without wasting too much time.

---

# Agentic and Asynchronous RL

Tool-using agents make trajectories long, uneven, and hard to schedule synchronously.

<div class="columns">
<div class="card">

## Synchronous batch RL

```text
Generate full batch
→ wait for longest trajectory
→ train
→ refresh rollout workers
```

</div>
<div class="card">

## Asynchronous RL

```text
Rollout workers generate continuously
        ↓
trajectory stream
        ↓
trainer updates continuously
```

</div>
</div>

> Representative idea: AReaL improves utilization by decoupling generation and training, but the trade-off is stale-policy data.

---

# How Should Students Choose a Stack?

| Project goal | Good starting point |
|---|---|
| I want to learn RL internals | Gymnasium + CleanRL |
| I need a trusted baseline | Stable-Baselines3 |
| I need modular RL research code | Tianshou / TorchRL |
| I need distributed classical RL | RLlib / Sample Factory |
| I want small LLM post-training | TRL / LLaMA-Factory / ms-swift |
| I need distributed LLM RL | veRL / OpenRLHF / NeMo RL |
| I need tool-using agents | AReaL / SkyRL / rLLM / Agent Lightning |

> Rule of thumb: choose the smallest stack that exposes the bottleneck you actually need to study.

---

# Key Takeaways

<div class="three">
<div class="card">

## 1. Tools live at different layers

Gymnasium, vLLM, and PPO libraries are not direct competitors.

</div>
<div class="card">

## 2. Scale moves the bottleneck

Correctness → reuse → sampling → rollout → synchronization → agents.

</div>
<div class="card">

## 3. Evidence matters

Distinguish hands-on results from documentation-based architecture review.

</div>
</div>

**Next step:** run one small classical RL example and one small LLM post-training configuration before comparing large systems.
