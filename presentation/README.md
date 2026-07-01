# Presentation

## RL Engineering Tools: From Classical RL to LLM and Agentic RL

This directory contains an English presentation designed for a 25–30 minute advisor or lab report.

### Files

- [`rl-engineering-tools-landscape.pptx`](rl-engineering-tools-landscape.pptx) — editable PowerPoint deck with speaker notes.
- [`presenter-guide.md`](presenter-guide.md) — slide-by-slide talking points and evidence boundaries.
- [`src/rl-engineering-tools-landscape.js`](src/rl-engineering-tools-landscape.js) — generated PptxGenJS source used to build the deck.
- [`src/part-00`](src/part-00), [`part-01`](src/part-01), [`part-02`](src/part-02), and [`part-03`](src/part-03) — maintained source segments assembled by the build script.

### Presentation strategy

The deck does not try to present every framework. It uses six representative tools to explain how the engineering bottleneck changes across the stack:

1. **Gymnasium** — environment interface.
2. **CleanRL vs. Stable-Baselines3** — transparency versus reusable reliability.
3. **RLlib** — distributed classical reinforcement learning.
4. **TRL** — trainer-first LLM post-training.
5. **veRL** — system-first distributed LLM reinforcement learning.
6. **AReaL** — asynchronous and agentic reinforcement learning.

Other projects are positioned on a landscape slide and remain documented in the main repository.

### Evidence boundary

The deck is based primarily on:

- official documentation;
- official project repositories;
- supported algorithms and execution backends;
- source organization and public examples;
- architecture-level comparison.

It does **not** claim a controlled identical-hardware benchmark across all frameworks.

### Regenerating the deck

Install Node.js and run:

```bash
cd presentation
npm ci
npm run build
```

A GitHub Actions workflow automatically rebuilds and commits the PowerPoint whenever the presentation source changes.
