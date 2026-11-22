# Hush

A concept website for a guided evening practice: five short chapters set inside a live, scroll-driven night garden rendered with Three.js.

## Credits

This project is built on the **Kage** landing page from [ThreeUI Community](https://github.com/MengTo/threeui) by Meng To, used under the MIT License. The page structure, scroll scenes, WebGL world and image assets come from that project. What changed here is the text, naming, section copy and footer. See `scripts/build-page.mjs` for the exact edits.

- Original licence and notices: [`THIRD_PARTY/`](THIRD_PARTY)
- Bundled fonts remain under the SIL Open Font License 1.1 and the Three.js runtime remains MIT (see `THIRD_PARTY/`).
- Developed with help from Claude (Anthropic) for planning and the text-rewrite script.

## Run it

You need Node.js and a local clone of ThreeUI:

```bash
git clone https://github.com/MengTo/threeui.git ../threeui
npm install
npm run setup -- ../threeui
npm run dev
```

`npm run setup` copies the Kage source and assets from your ThreeUI clone, rewrites the text for Hush and copies the upstream licences into `THIRD_PARTY/`. Then open the local URL Vite prints.

## Status

Concept project. The images are still ThreeUI's original Kage artwork; replacing them with original imagery is the next step.
