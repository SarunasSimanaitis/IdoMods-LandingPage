# AI workflow log

This page was built in one conversation with **Claude Code** (Anthropic), running as a cloud agent and connected to the Figma file through the **Figma MCP server**. The full conversation is in the Claude Code project thread. This file summarises what was done, with which tool, and why.

## Tools

| Tool | Used for |
| --- | --- |
| Claude Code (agent) | Planning, writing all code, running commands, reviewing screenshots |
| Figma MCP: `get_metadata` | Page and layer tree of both pages (`🔒 INFO` and `➡️ Landing Page`) |
| Figma MCP: `get_design_context` | Exact styles (fonts, sizes, colours, spacing) and asset URLs for each section, plus the "Komentarze do projektu" notes |
| Figma MCP: `get_comments` | Checked for Figma comments (there were none; the guidelines are on the canvas) |
| Figma MCP: `get_screenshot` | Full-page 1920×4048 reference render used for visual comparison |
| Figma MCP: `download_assets` | Batch export of composed nodes (lamps, mockups, badges) and their raw source images |
| `curl` | Downloading every asset URL straight into `src/assets/` with descriptive names |
| Python (Pillow, NumPy, SciPy, OpenCV) | Splitting the lamp layer, rebuilding the hero backdrop, locating exported mockups in the reference, pixel-diffing results |
| Playwright + Chromium (headless) | Screenshots at 1920/1440/1180/1024/768/390 px, side-by-side comparison with Figma, automated interaction tests |
| Vite, TypeScript (`tsc`), oxlint | Build, type-check, lint |

## Steps

1. **Inspect Figma.** I listed the pages and read the full layer tree. The file has the 1920 px landing page, separate lamp layers (`lampa1–3`), a second hero image (`HERO Baner2`), a "Komentarze do projektu" frame with the motion and interaction spec, and an info page ("don't edit, don't reply to comments, ask questions by e-mail").
2. **Plan.** I posted a short plan: a component per section, design tokens in CSS variables, no extra dependencies, and a hand-written WebGL shader.
3. **Unblock asset downloads.** The cloud environment first blocked `www.figma.com`. The user approved adding it to the allowed hosts.
4. **Batch export.** I fetched design context per section and downloaded every image and SVG into `src/assets/` with descriptive names (`pay-visa.png`, `flag-pl.svg`, `vp-truck.svg` and so on). I identified payment logos and flags visually and named them accordingly. I dropped mask SVGs that were plain rectangles, because they have no visual effect.
5. **Make the hero animatable.**
   - The lamp layer (`lampa1–3`) is one transparent 1920×1080 PNG. I checked that `hero = backdrop + layer` pixel for pixel. Then I split the layer into four sprites (three lamps and the rock) using connected components on its alpha channel.
   - I rebuilt the lamp-free backdrop by fitting a 6th-degree 2-D polynomial gradient to the visible sky (RMS error ≈ 1.4/255) and filling only the area under the lamps, with fine grain added.
6. **Place the tile mockups.** I matched the exported mockups against the Figma screenshot with OpenCV template matching to get their exact offsets inside each tile (for example, the laptop sits at x=336 px in the 936 px tile, with mean error 0.6/255).
7. **Scaffold and build.** I created a Vite React-TS project, then wrote the tokens, base styles, and the Header, Hero (slider and LampScene), ValueProps, Tiles, ShaderBanner (WebGL) and Footer components.
8. **Compare with Figma and fix.** I took a full-page screenshot at 1920 px and compared it with the Figma render section by section, then fixed what was off:
   - The SOLLUX SMART front phone export had an opaque background that cut the back phone. I recomposed it in headless Chromium from the original layers (frame, screen, mask, fade). It now matches the Figma export within 0.7/255 on average.
   - The TikTok icon was rendered too large. It now uses its 14×16 Figma size.
   - The shader colours and band shape were tuned over several renders to match the reference (darker, more olive, gold only at the peaks).
   - The shader title size and button size were measured from the reference raster.
9. **Responsive pass.** I checked screenshots at 1440, 1180, 1024, 768 and 390 px and fixed what I found:
   - On tablet, tiles keep the 2-column grid down to 1024 px.
   - On phones, the hero lamp scene is scaled to show all three lamps, with the copy below on the rock colour.
   - The shader title is smaller on phones.
   - The header hover state is limited to devices that can hover, so it does not "stick" after a tap.
10. **Automated checks.** A Playwright script checks the following, with no console errors:
    - header transparent → white on hover and after scroll;
    - dropdown opens;
    - autoplay advances after 7 s and pauses on hover, keyboard focus and lamp use;
    - arrows and bar segments work;
    - a lamp switches on when clicked;
    - parallax follows the pointer;
    - the tile image zooms to 1.1 and its button turns #4A4A4A;
    - on mobile: the menu opens, the submenu expands, Esc closes the menu, the search toggle focuses the input, and there is no horizontal overflow.
11. **Docs.** Wrote the README and this log. Opened a pull request.
12. **Calmer slideshow (user feedback).** The 3 s autoplay changed slides before the lamps could be tried out. I changed it as follows, without touching the layout (before/after full-page screenshots at 1920 and 390 px are pixel-identical):
    - 7 s per slide and an 800 ms crossfade (new token `--duration-crossfade`);
    - autoplay pauses while the pointer is over the hero or keyboard focus is inside it, and resumes 4 s after the last interaction (leaving, tapping, switching a lamp);
    - focus from a mouse click does not hold the slider, so it still resumes after the pointer leaves;
    - lamp clicks stop propagation and only toggle the light;
    - every manual change restarts the progress bar, including clicking the current segment.

    A new Playwright script checks the timing (bar at about half after 3.5 s, slide change at 7 s), the hover pause, the 4 s resume delay, the lamp toggles, the bar resets and the touch behaviour. All 17 checks pass with no console errors.

## Notes

- I reached the Figma MCP rate limit of the Figma Starter plan near the end of the asset work. By then every asset was already downloaded, so nothing was left for manual export.
- No assets were redrawn or substituted. Every derived asset (lamp sprites, backdrop, recomposed phone) is built only from the original exported pixels.
