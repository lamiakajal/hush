// scripts/setup.mjs
// One-time setup. Copies the ThreeUI Kage source + assets from a local clone of
// https://github.com/MengTo/threeui, rewrites the page text for Hush, and copies
// the upstream licence files into THIRD_PARTY/.
// Usage: node scripts/setup.mjs <path-to-your-threeui-clone>
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const clone = process.argv[2] && resolve(process.argv[2]);
if (!clone) { console.error('Usage: node scripts/setup.mjs <path-to-your-threeui-clone>'); process.exit(1); }

const lp = join(clone, 'public', 'landing-pages');
const kage = join(lp, 'kage.html');
const assets = join(lp, 'secret-pathways-assets');
for (const p of [kage, assets, join(clone, 'LICENSE')]) {
  if (!existsSync(p)) { console.error('Missing: ' + p); process.exit(1); }
}

const outDir = join(root, 'public', 'hush');
mkdirSync(outDir, { recursive: true });
cpSync(assets, join(outDir, 'secret-pathways-assets'), { recursive: true });

const r = spawnSync(process.execPath, [join(root, 'scripts', 'build-page.mjs'), kage, join(outDir, 'index.html')], { stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);

mkdirSync(join(root, 'THIRD_PARTY'), { recursive: true });
for (const f of ['LICENSE', 'ASSET-LICENSES.md', 'FONT-LICENSES.md', 'THIRD_PARTY_NOTICES.md']) {
  const src = join(clone, f);
  if (existsSync(src)) cpSync(src, join(root, 'THIRD_PARTY', f === 'LICENSE' ? 'THREEUI-LICENSE' : f));
}
console.log('\nSetup complete. Now run: npm install && npm run dev');
