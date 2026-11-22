# Hush: image prompts

14 images are needed. No video or audio is used anywhere on the page.

## Rules for every image

- Save as **WebP**, with the **exact same file name** as the original and the **same pixel size** listed below, so no code needs to change.
- Palette to ask for: deep blue-black night, one vermilion red accent (`#e0231c`), warm amber lantern light, cool moonlit mist. Dark and calm, no people, no text, no logos, no watermarks.
- The 3D world itself (gate, moon, lanterns) is still the original temple scene drawn by code, so keep the style of these images close to a quiet Japanese-style night garden. If you change the mood a lot, the 3D scene will look out of place.
- Check the licence of whichever AI tool you use and keep the images free of real brands, characters and living artists' names.

## A. Scene images (put in `public/hush/secret-pathways-assets/generated/`)

Used as full-width backgrounds, so make them wide (about 3:2) and keep the centre uncluttered.

| File | What it shows | Prompt |
|---|---|---|
| `kage-sanmon-preview.webp` | The gate at night (hero preview) | Cinematic wide shot of a lit wooden gate at the top of stone steps, night, deep blue-black sky, a large vermilion moon behind it, warm amber lanterns, drifting mist, quiet and empty, soft film grain, photorealistic, no people, no text |
| `kage-approach.webp` | Footsteps on stone (room 01) | Looking up a long stone staircase flanked by dark pines at night, faint mist, small amber lanterns marking the steps, a red moon glow in the distance, calm and empty, cinematic, photorealistic, no people, no text |
| `kage-lantern-court.webp` | Lantern light (room 02) | A still garden courtyard at night lit by several stone lanterns with warm amber flames, raked gravel, dark maple branches overhead, cool blue shadows, shallow depth of field, photorealistic, no people, no text |
| `kage-moonwater.webp` | Still water (room 03) | A perfectly still pond at night reflecting a vermilion moon, dark stones and moss at the edge, thin mist on the water, a few floating maple leaves, minimal and quiet, cinematic, photorealistic, no people, no text |

Use the original files' sizes if you can read them (right-click, Properties, Details). If not, 1920 x 1280 is a safe choice.

## B. Foreground cut-outs (put in `public/hush/secret-pathways-assets/foreground/png/`)

These float in front of the scene and move with a parallax effect, so each one **must have a transparent background**. Generate each on a plain solid background (say "isolated on a plain flat white background"), then remove the background with a tool such as remove.bg, Photopea or Krita, and export as WebP with transparency.

| File | Size (px) | Prompt |
|---|---|---|
| `temple-wall.webp` | 1536 x 884 | Section of an old charred-wood wall with a tiled roof edge, dark and weathered, side-lit by warm lantern light, isolated on a plain flat white background, photorealistic |
| `pine-tree.webp` | 1024 x 1438 | A tall twisted pine tree with dark needles, full height, slightly low angle, moonlit rim light, isolated on a plain flat white background, photorealistic |
| `tall-grass.webp` | 1717 x 916 | A dense clump of tall wild grass with seed heads, wide horizontal band, cool moonlight on the tips, isolated on a plain flat white background, photorealistic |
| `sakura-branch.webp` | 1536 x 1024 | A flowering cherry branch with pale pink blossoms and a few petals falling, entering from one corner, soft night light, isolated on a plain flat white background, photorealistic |
| `maple-leaves.webp` | 1536 x 1024 | A cluster of deep red maple leaves on a thin dark branch, entering from one corner, backlit, isolated on a plain flat white background, photorealistic |
| `stone-lantern.webp` | 1024 x 1499 | A tall traditional stone lantern with a warm glowing flame inside, mossy base, full height, isolated on a plain flat white background, photorealistic |
| `garden-bush.webp` | 1717 x 876 | A rounded, trimmed garden shrub with dark glossy leaves, wide and low, cool moonlight on the top, isolated on a plain flat white background, photorealistic |
| `basalt-stones.webp` | 1536 x 996 | A group of dark basalt stones of different sizes with a little moss, low and wide, wet look, isolated on a plain flat white background, photorealistic |
| `hill.webp` | 1774 x 887 | A soft hill silhouette covered in grass and small shrubs, wide and low, dark with faint rim light on the ridge, isolated on a plain flat white background, photorealistic |
| `shrine-ruins.webp` | 1536 x 1001 | Weathered stone pillars and a broken stone step overgrown with moss, partly collapsed, dark and quiet, isolated on a plain flat white background, photorealistic |

## After generating

1. Resize each image to the size above (Squoosh at squoosh.app does resize and WebP in one go).
2. Replace the matching file in `public/hush/secret-pathways-assets/`.
3. Reload the page with `Ctrl + Shift + R` to bypass the cache.
4. Update the README line that says the images are still ThreeUI's, and keep the credit for anything you did not replace.
