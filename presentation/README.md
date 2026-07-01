# Student Presentation

## RL Engineering Tools: From Classical RL to LLM Agents

This directory contains a student-facing English presentation that explains how reinforcement-learning tools fit together, what problem each layer solves, and how engineering bottlenecks change from classical RL to LLM and agentic RL.

## Files

- [`slides.md`](slides.md) — GitHub-readable Marp slide deck.
- [`rl-engineering-tools-student-facing.pdf`](rl-engineering-tools-student-facing.pdf) — browser-friendly PDF export.
- [`montage.png`](montage.png) — one-page visual preview of all slides.
- [`student-study-guide.md`](student-study-guide.md) — review notes for students.
- `rl-engineering-tools-student-facing.pptx` — editable PowerPoint; upload this file manually after downloading it from the accompanying ChatGPT response.

## Learning objectives

After the presentation, students should be able to:

1. describe the standard environment–policy–collector–learner loop;
2. distinguish environment APIs from algorithm libraries and distributed runtimes;
3. explain the design trade-off between CleanRL and Stable-Baselines3;
4. identify when RLlib-style distributed execution becomes useful;
5. distinguish offline preference optimization from online LLM reinforcement learning;
6. explain the roles of TRL, veRL, OpenRLHF, rollout engines, and training backends;
7. understand why agentic workloads motivate asynchronous RL systems.

## Slide sequence

1. Why RL engineering tools exist
2. The classical RL stack
3. Gymnasium and environment standardization
4. CleanRL versus Stable-Baselines3
5. RLlib and distributed classical RL
6. Why LLM RL changes the systems problem
7. Offline preference optimization versus online RL
8. TRL as an accessible entry point
9. veRL and OpenRLHF as distributed LLM RL systems
10. Rollout engines and training backends
11. Agentic and asynchronous RL
12. Choosing an appropriate stack
13. Key takeaways

## Render the Marp deck

```bash
npx @marp-team/marp-cli slides.md --pptx
npx @marp-team/marp-cli slides.md --pdf
```

The editable PptxGenJS PowerPoint is provided separately for manual upload so that the repository does not contain a broken generated-file link.
