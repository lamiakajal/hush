// scripts/build-page.mjs
// Turns ThreeUI's kage.html into the Hush page.
// Usage: node scripts/build-page.mjs <path-to-kage.html> <output-html>
// The source file is never modified. If any expected text is missing, nothing is
// written and every problem is listed.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const SRC = process.argv[2];
const OUT = process.argv[3];
if (!SRC || !OUT) {
  console.error('Usage: node scripts/build-page.mjs <path-to-kage.html> <output-html>');
  process.exit(1);
}

if (!existsSync(SRC)) {
  console.error(`Cannot find ${SRC}.`);
  process.exit(1);
}

let html = readFileSync(SRC, 'utf8');
const problems = [];
let edits = 0;

/** Replace every occurrence of `from` (string or RegExp) with `to`; expect exactly `expected` matches. */
function swap(from, to, expected = 1) {
  if (from instanceof RegExp) {
    const re = new RegExp(from.source, from.flags.includes('g') ? from.flags : from.flags + 'g');
    const count = (html.match(re) || []).length;
    if (count !== expected) {
      problems.push(`expected ${expected}, found ${count}: ${String(from).slice(0, 90)}`);
      return;
    }
    html = html.replace(re, () => to);
  } else {
    const parts = html.split(from);
    const count = parts.length - 1;
    if (count !== expected) {
      problems.push(`expected ${expected}, found ${count}: ${from.slice(0, 90)}`);
      return;
    }
    html = parts.join(to);
  }
  edits++;
}

/* ------------------------------------------------------------ license note */
swap('<html lang="en">',
  '<!--\n' +
  '  Based on "Kage" from ThreeUI Community (https://github.com/MengTo/threeui), MIT License.\n' +
  '  Text, naming and section copy were rewritten for "Hush", a concept project.\n' +
  '-->\n<html lang="en">');

/* ------------------------------------------------------------ head */
swap('<title>Kage — Where stillness reveals the unseen</title>',
  '<title>Hush — A guided evening practice</title>');
swap('<meta name="description" content="A five-chapter night walk through a Kyoto mountain temple. Charred cypress, lantern light and a vermilion moon, rendered live in WebGL.">',
  '<meta name="description" content="A five-chapter guided evening practice set inside a live night garden. Ninety minutes of breath, sound and light, rendered in WebGL.">');

/* ------------------------------------------------------------ preloader + nav */
swap('<div class="pre-jp jp">影の道</div>', '<div class="pre-jp jp">HUSH</div>');
swap('<span>Raising the mountain temple</span>', '<span>Lighting the lanterns</span>');
swap('<b>KAGE</b><i>HIDDEN REALMS OF KYOTO</i>', '<b>HUSH</b><i>GUIDED EVENING PRACTICE</i>');
swap('<span>Temples</span><span class="alt">伽藍</span>', '<span>Arrive</span><span class="alt">01</span>');
swap('<span>Gardens</span><span class="alt">庭園</span>', '<span>Rooms</span><span class="alt">02</span>');
swap('<span>Rituals</span><span class="alt">神事</span>', '<span>Practice</span><span class="alt">03</span>');
swap('<span>Afterlight</span><span class="alt">残光</span>', '<span>Afterglow</span><span class="alt">04</span>');

/* ------------------------------------------------------------ hero */
swap('Chapter 00 — The Hidden Gate', 'Chapter 00 — Before You Begin');
swap('<span class="mask-line"><span>Where stillness</span></span>', '<span class="mask-line"><span>Quiet the day.</span></span>');
swap('<span class="mask-line"><span>reveals the</span></span>', '<span class="mask-line"><span>Hear what</span></span>');
swap('<span class="mask-line"><span>unseen.</span></span>', '<span class="mask-line"><span>remains.</span></span>');
swap(/Enter Kyoto through its quiet thresholds, where ritual,\s+craft, and memory shape the path\./,
  'A guided evening practice set inside a live night garden. Five short chapters, headphones on, nothing to prove.');

swap('<b>Thresholds</b><p>Discover the hidden gates that open on to deeper paths.</p>',
  '<b>Arrive</b><p>Leave the street behind and step through the gate.</p>');
swap('<b>Still Gardens</b><p>Witness the courts where silence gently unfolds.</p>',
  '<b>Rooms</b><p>Three still spaces, each with its own sound.</p>');
swap('<b>Sacred Craft</b><p>Embrace the hands and heritage that shape devotion.</p>',
  '<b>Practice</b><p>Five short sessions, ninety minutes in all.</p>');
swap('<b>Night Rituals</b><p>Explore the rites that awaken when the day is done.</p>',
  '<b>Afterglow</b><p>What stays with you once the screen goes dark.</p>');

swap('aria-label="Preview: Sanmon, before the bell"', 'aria-label="Preview: the gate at night"');
swap('<b class="jp">山門</b><i>Sanmon — before the bell</i>', '<b class="jp">00</b><i>The gate, at night</i>');
swap('<div class="word-fb" aria-hidden="true">KAGE</div>', '<div class="word-fb" aria-hidden="true">HUSH</div>');
swap('<span class="v jp">影の道</span>', '<span class="v jp">HUSH</span>');

/* ------------------------------------------------------------ chapter I */
swap('<b>01</b> — The Sanmon</span><span class="rule"></span><span class="k jp">山門</span>',
  '<b>01</b> — Arrive</span><span class="rule"></span><span class="k jp">BEGIN</span>');
swap('<h2 class="display h-sec" data-rv="up">Charred cypress, worn stone, one gate left open.</h2>',
  '<h2 class="display h-sec" data-rv="up">One evening. Five chapters. Nothing to fix.</h2>');
swap(/<p class="lead" data-rv="up">[\s\S]*?<\/p>/,
  '<p class="lead" data-rv="up">Hush begins where the day stops: a quiet garden, a lit gate, and a voice that asks very little of you. ' +
  'Put on headphones, dim the room, and let the evening slow down on its own.</p>');
swap(/<p class="body" data-rv="up">Climb the worn steps[\s\S]*?<\/p>/,
  '<p class="body" data-rv="up">Each chapter is a short guided practice (breath, sound, light) set inside a live night scene that ' +
  'moves as you scroll. No streaks, no scores. Just ninety minutes you can spread across a week.</p>');
swap('<span>Cross the threshold</span>', '<span>Begin the evening</span>');
swap('<div><b>1611</b><span>Hall raised</span></div>', '<div><b>0</b><span>Streaks</span></div>');
swap('<div><b>∞</b><span>Stillness</span></div>', '<div><b>∞</b><span>Replays</span></div>');

/* ------------------------------------------------------------ chapter II */
swap('<b>02</b> — Still Gardens</span><span class="rule"></span><span class="k jp">庭園</span>',
  '<b>02</b> — Three Rooms</span><span class="rule"></span><span class="k jp">SPACES</span>');
swap('<b>Approach</b><span class="jp">参道</span>', '<b>Approach</b><span class="jp">ROOM 01</span>');
swap('<b>Lanterns</b><span class="jp">灯籠</span>', '<b>Lanterns</b><span class="jp">ROOM 02</span>');
swap('<b>Moonwater</b><span class="jp">月影</span>', '<b>Moonwater</b><span class="jp">ROOM 03</span>');
swap('<span>The long climb</span><span>01 / 03</span>', '<span>Footsteps on stone</span><span>01 / 03</span>');
swap('<span>Lantern court</span><span>02 / 03</span>', '<span>Lantern light</span><span>02 / 03</span>');
swap('<span>The wet court</span><span>03 / 03</span>', '<span>Still water</span><span>03 / 03</span>');

/* ------------------------------------------------------------ chapter III */
swap('<b>03</b> — Sacred Craft</span><span class="rule"></span><span class="k jp">手業</span>',
  '<b>03</b> — The Practice</span><span class="rule"></span><span class="k jp">SESSIONS</span>');
swap('>Five chapters. Ninety minutes. One quiet mind.</h2>', '>Five sessions. Ninety minutes. Nothing to prove.</h2>');
swap(/<p class="body-lg" data-rv="up">Each chapter is a walk[\s\S]*?<\/p>/,
  '<p class="body-lg" data-rv="up">Each session is a walk, not a lecture. You arrive at the gate, climb the steps, ' +
  'sit with the lantern, and leave with one quiet thing worth keeping.</p>');

swap('<h3>The Hidden Gate<em class="jp">山門</em></h3>', '<h3>Arrive<em class="jp">SETTLE</em></h3>');
swap('<p>Why a gate is a sentence, and what you agree to when you walk under one.</p>',
  '<p>Leave the street behind. Slow breathing and a first look at the gate.</p>');
swap('<h3>Borrowed Scenery<em class="jp">借景</em></h3>', '<h3>Soften<em class="jp">RELEASE</em></h3>');
swap('<p>Shakkei: composing with a mountain you will never own.</p>',
  '<p>Let the shoulders drop while the garden does the talking.</p>');
swap('<h3>Charred Cypress<em class="jp">焼杉</em></h3>', '<h3>Notice<em class="jp">FOCUS</em></h3>');
swap('<p>Yakisugi: burning a board black so the weather will let it live.</p>',
  '<p>Follow one sound until the mind stops chasing the others.</p>');
swap('<h3>Lantern Light<em class="jp">灯籠</em></h3>', '<h3>Warm<em class="jp">LIGHT</em></h3>');
swap('<p>How a single ember decides the scale of everything around it.</p>',
  '<p>Rest your attention on one small light and let it set the scale of the room.</p>');
swap('<h3>The Vermilion Moon<em class="jp">朱月</em></h3>', '<h3>Rest<em class="jp">MOON</em></h3>');
swap('<p>Why the moon burns red over the valley, and what the garden does with it.</p>',
  '<p>Sit with the red moon, and with nothing left to do.</p>');

/* ------------------------------------------------------------ chapter IV */
swap('<div class="eyebrow" data-rv="fade">Chapter 04 — Afterlight</div>',
  '<div class="eyebrow" data-rv="fade">Chapter 04 — Afterglow</div>');
swap('<h2 class="display" data-rv="up">Afterlight</h2>', '<h2 class="display" data-rv="up">Afterglow</h2>');
swap(/<p class="body-lg" data-rv="up">The gate does not close[\s\S]*?<\/p>/,
  '<p class="body-lg" data-rv="up">The gate stays open. Return whenever the noise gets loud: ' +
  'it is always the same garden, and never the same light.</p>');
swap('<i></i><span>Begin the walk</span>', '<i></i><span>Start tonight</span>');

/* ------------------------------------------------------------ footer */
swap(/<p>A five-chapter night walk[\s\S]*?<\/p>/,
  '<p>A five-chapter guided evening practice, set inside a live night garden. ' +
  'Three illustrated rooms, one quiet scene, rendered in your browser.</p>');
swap('<a href="#gate" data-cursor>The Sanmon</a>', '<a href="#gate" data-cursor>Arrive</a>');
swap('<a href="#pathways" data-cursor>Still Gardens</a>', '<a href="#pathways" data-cursor>Three Rooms</a>');
swap('<a href="#lessons" data-cursor>Sacred Craft</a>', '<a href="#lessons" data-cursor>The Practice</a>');
swap('<a href="#eternity" data-cursor>Afterlight</a>', '<a href="#eternity" data-cursor>Afterglow</a>');
swap('<a href="#lessons" data-cursor>Borrowed scenery</a>', '<a href="#lessons" data-cursor>Breath</a>');
swap('<a href="#lessons" data-cursor>Lantern light</a>', '<a href="#lessons" data-cursor>Sound</a>');
swap('<a href="#lessons" data-cursor>Charred cypress</a>', '<a href="#lessons" data-cursor>Light</a>');
swap('<a href="#lessons" data-cursor>Raked gravel</a>', '<a href="#lessons" data-cursor>Rest</a>');
swap('<span>© 2026 Kage — Kage no Michi</span>', '<span>© 2026 Hush — A concept project</span>');
swap('<span class="jp">静けさは一つの技である</span>', '<span class="jp">Built by Lamia Kajal</span>');
swap('<span>WebGL · Onest · Kyoto</span>', '<span>Based on ThreeUI · Kage</span>');

/* ------------------------------------------------------------ script */
swap("const names = ['The Hidden Gate', 'The Sanmon', 'Still Gardens', 'Sacred Craft', 'Afterlight', 'Colophon'];",
  "const names = ['Before You Begin', 'Arrive', 'Three Rooms', 'The Practice', 'Afterglow', 'Colophon'];");
swap("const word = 'KAGE'", "const word = 'HUSH'");
/* the big 3-D letters: fall back to Onest per glyph if the Wordmark font has no H, U or S */
swap("px Wordmark, sans-serif'", "px Wordmark, Onest, sans-serif'", 2);

/* ------------------------------------------------------------ write */
if (problems.length) {
  console.error(`\nNothing was written. ${problems.length} replacement(s) did not match:\n`);
  problems.forEach((p) => console.error(' - ' + p));
  console.error('\nSend this list to Claude and it will fix the script.');
  process.exit(1);
}

writeFileSync(OUT, html, 'utf8');
console.log(`Done: ${edits} edits applied. Wrote ${OUT}.`);
