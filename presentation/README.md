# Presentation

## RL Engineering Tools: From Classical RL to LLM and Agentic RL

This directory contains an English presentation designed for a 25–30 minute advisor or lab report.

### Available now

- [`slides.md`](slides.md) — GitHub-native Marp slide deck; readable and editable directly in the repository.
- [`presenter-guide.md`](presenter-guide.md) — slide-by-slide talking points and evidence boundaries.
- [`src/build.js`](src/build.js) — assembles the maintained source parts and generates the PowerPoint.
- [`src/part-00`](src/part-00), [`part-01`](src/part-01), [`part-02`](src/part-02), and [`part-03`](src/part-03) — maintained PptxGenJS source segments.

### Generated outputs

The following files are generated outputs and appear only after the build completes successfully:

- `rl-engineering-tools-landscape.pptx` — editable PowerPoint deck with speaker notes.
- `rl-engineering-tools-landscape.pdf` — browser-friendly PDF export, when produced by the selected rendering path.

GitHub does not generally render PowerPoint files as an interactive presentation in the repository page. Once the `.pptx` exists, download the raw file and open it in PowerPoint, LibreOffice Impress, or another compatible application. Use the PDF or `slides.md` for browser-based review.

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

### Rendering the Marp deck

The `slides.md` file can be opened with the Marp extension for Visual Studio Code or rendered with Marp CLI.

```bash
npx @marp-team/marp-cli slides.md --pptx
npx @marp-team/marp-cli slides.md --pdf
```

### Regenerating the PptxGenJS deck

Install Node.js and run:

```bash
cd presentation
npm install
npm run build
```

The repository includes a GitHub Actions workflow. For it to commit the generated PowerPoint, repository or organization settings must allow GitHub Actions and grant the workflow read/write access to repository contents.
