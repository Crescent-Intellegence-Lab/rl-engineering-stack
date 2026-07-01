---
marp: true
theme: default
paginate: true
size: 16:9
header: RL Engineering Tools
footer: Crescent-Intellegence-Lab · July 2026
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
  .title-slide {
    background: #091826;
    color: white;
  }
  .title-slide h1 { color: white; font-size: 48px; }
  .title-slide h2 { color: #a7e8e4; font-weight: normal; }
  .muted { color: #64748b; }
  .small { font-size: 18px; }
  .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
  .card {
    background: white;
    border: 1px solid #d6dee8;
    border-radius: 12px;
    padding: 18px 22px;
  }
  .accent { color: #16a6a1; }
  .warning { color: #dc2626; }
  .center { text-align: center; }
---

<!-- _class: title-slide -->

# RL Engineering Tools

## From Classical RL to LLM and Agentic RL

A representative, architecture-oriented landscape — not an exhaustive benchmark

**Shuo Yan · Crescent-Intellegence-Lab · July 2026**

---

# How to Read This Landscape

<div class="three">
<div class="card">

## Evaluated

- Official documentation
- Repository architecture
- Supported algorithms and backends
- Source organization and examples
- Primary engineering abstraction

</div>
<div class="card">

## Not Claimed

- Identical-hardware benchmark
- Universal speed ranking
- Long-running reliability comparison
- Hands-on use of every project
- “More algorithms = better system”

</div>
<div class="card">

## Evidence Labels

- **Hands-on**: executed locally
- **Source-reviewed**: docs and code inspected
- **Mention-only**: used to position the landscape

</div>
</div>

> The goal is to explain what engineering problem each layer solves.

---

# One RL Stack, Multiple Engineering Layers

| Layer | Representative tool | Main abstraction |
|---|---|---|
| Environment API | **Gymnasium** | Interaction contract |
| Algorithm implementation | **CleanRL / SB3** | Transparency vs. reuse |
| Distributed classical RL | **RLlib** | Actors, learners, resources |
| LLM post-training | **TRL** | Trainer-first alignment |
| Distributed LLM RL | **veRL** | Rollout/training orchestration |
| Async and Agentic RL | **AReaL** | Streaming trajectories |

> As scale increases, the bottleneck moves from algorithm correctness to rollout throughput, model placement, weight synchronization, and environment execution.

---

# Representative Layer 1: Gymnasium

<div class="columns">
<div class="card">

## Standard interaction

```python
observation, info = env.reset()

observation, reward,
terminated, truncated, info = \
    env.step(action)
```

A common contract across classic control, Atari, MuJoCo, and custom environments.

</div>
<div>

## Standardizes

- `reset()` and `step()`
- Action and observation spaces
- Termination vs. truncation
- Wrappers and vector environments
- Environment registration

## Does not provide

- PPO, DQN, or SAC
- Replay buffers
- Advantage estimation
- Distributed learning

</div>
</div>

**Takeaway:** Gymnasium standardizes interaction, not learning.

---

# Representative Layer 2: CleanRL vs. Stable-Baselines3

<div class="columns">
<div class="card">

## CleanRL — transparency

```text
environment loop
→ rollout
→ GAE
→ minibatches
→ PPO loss
→ optimizer step
```

- Full execution path in one file
- Easy to audit and modify
- Accepts duplicated code to reduce abstraction

</div>
<div class="card">

## Stable-Baselines3 — reuse

```python
model = PPO("MlpPolicy", env)
model.learn(total_timesteps=100_000)
```

- Fast route to a trustworthy baseline
- Unified API, tests, callbacks, evaluation
- Core execution hidden behind abstractions

</div>
</div>

> CleanRL optimizes for research transparency; SB3 optimizes for reusable reliability.

---

# Representative Layer 3: RLlib

```text
Environment runners × N
          │
          ▼
  distributed samples
          │
          ▼
     Learners × M
          │
          ▼
   updated RL modules
```

<div class="columns">
<div>

## Use RLlib when

- Many environments or nodes
- Multi-agent training is central
- Fault tolerance matters
- Ray is already in the stack
- Distributed evaluation is required

</div>
<div>

## Engineering cost

- Deeper abstractions
- More configuration
- More distributed failure modes
- Harder debugging for small experiments

</div>
</div>

**Takeaway:** RLlib is valuable when sampling and cluster orchestration become first-class problems.

---

# Why LLM RL Needs a Different Stack

| Dimension | Classical RL | LLM RL |
|---|---|---|
| Observation | Small tensor or state | Prompt + conversation history |
| Action | Discrete or low-dimensional | Hundreds or thousands of tokens |
| Step latency | Often milliseconds | Seconds, tools, or external jobs |
| Policy size | Usually modest | Billions of parameters |
| Data path | Env → buffer → learner | Rollout → verifier → trainer → sync |

## New systems problems

- Expensive generation
- Policy, reference, critic, and reward-model placement
- Different training and inference layouts
- Repeated weight synchronization
- Variable-length trajectories and tool failures

---

# Representative Layer 4: Hugging Face TRL

<div class="three">
<div class="card">

## Offline

- `SFTTrainer`
- `DPOTrainer`
- KTO / ORPO

</div>
<div class="card">

## Reward modeling

- `RewardTrainer`
- `PRMTrainer`
- Custom reward functions

</div>
<div class="card">

## Online

- `GRPOTrainer`
- `RLOOTrainer`
- PPO / Online DPO

</div>
</div>

## Why it is representative

- Native Transformers ecosystem
- Trainer-style API
- PEFT and distributed integrations
- Low-friction reward-function prototyping

**Limit:** it is not primarily designed around the most complex multi-model cluster orchestration.

---

# Representative Layer 5: veRL

```text
                 RL dataflow / controller
       ┌──────────┬──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼          ▼
     Actor    Reference    Critic    Reward     Rollout
                                                │
                                      vLLM / SGLang
```

<div class="columns">
<div class="card">

## Training backends

- FSDP / FSDP2
- Megatron-LM
- Flexible device mapping

</div>
<div class="card">

## Rollout backends

- vLLM
- SGLang
- Transformers

</div>
</div>

**Core idea:** separate the RL dataflow from concrete distributed execution.

**Neighboring design:** OpenRLHF uses Ray + DeepSpeed + vLLM and explicit model placement.

---

# Representative Layer 6: AReaL

<div class="columns">
<div class="card">

## Synchronous loop

```text
Generate full batch
→ wait for longest trajectory
→ train
→ refresh rollout workers
```

Simple policy freshness, but barriers can waste resources.

</div>
<div class="card">

## Fully asynchronous loop

```text
Rollout workers continuously generate
             ↓
       trajectory stream
             ↓
Trainer updates continuously
```

Higher utilization, but potentially stale-policy data.

</div>
</div>

> Central trade-off: **throughput vs. policy freshness**.

Agentic RL adds multi-turn tools, environment failures, and long-horizon credit assignment.

---

# Where Do the Other Frameworks Fit?

| Framework | Dominant positioning |
|---|---|
| LLaMA-Factory | Low-code model adaptation and preference training |
| ms-swift | Broad LLM/VLM post-training recipes |
| OpenRLHF | Ray + DeepSpeed + vLLM distributed RLHF |
| NeMo RL | NVIDIA / Megatron-oriented large-scale stack |
| slime | Megatron training + SGLang rollout |
| SkyRL / rLLM | Agent and environment execution layers |
| Agent Lightning | Train existing agent applications |

> This is not a performance ranking. Pick the smallest stack that exposes the engineering question you actually need to study.

---

# A Representative 25-Minute Talk

| Case study | Role | Time |
|---|---|---:|
| Gymnasium | Environment contract | 2 min |
| CleanRL vs. SB3 | Implementation trade-off | 4 min |
| RLlib | Distributed classical RL | 3 min |
| Why LLM RL differs | Transition | 2 min |
| TRL | Trainer-first post-training | 4 min |
| veRL | System-first LLM RL | 5 min |
| AReaL | Async / agentic frontier | 4 min |
| Takeaways | Selection and evidence | 1 min |

Keep the full framework catalog in backup material and the GitHub repository.

---

# Takeaways — and Evidence-Aware Language

<div class="three">
<div class="card">

## 1. Compare within a layer

Gymnasium is not an algorithm library; vLLM is not an RL trainer.

</div>
<div class="card">

## 2. Scale changes the bottleneck

Correctness → reuse → distributed sampling → rollout → synchronization → agents.

</div>
<div class="card">

## 3. Qualify claims

Say “the official architecture supports…” rather than “it is definitely faster.”

</div>
</div>

### Recommended phrasing

> “I use veRL as a representative example of a flexible distributed LLM RL architecture, based on its documented backends and worker model.”

<span class="warning">Avoid:</span> “veRL is faster than OpenRLHF” without a controlled comparison.

---

# Primary Sources

- Gymnasium — <https://gymnasium.farama.org/>
- CleanRL — <https://docs.cleanrl.dev/>
- Stable-Baselines3 — <https://stable-baselines3.readthedocs.io/en/master/>
- Ray RLlib — <https://docs.ray.io/en/latest/rllib/index.html>
- Hugging Face TRL — <https://huggingface.co/docs/trl/index>
- veRL — <https://github.com/verl-project/verl>
- OpenRLHF — <https://github.com/OpenRLHF/OpenRLHF>
- AReaL — <https://github.com/areal-project/AReaL>

> Framework capabilities change rapidly. Pin the exact release used in each experiment.
