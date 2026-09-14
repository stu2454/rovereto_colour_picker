# Development log

## 0.1.0 — Initial scaffold

- Added Vite + React + TypeScript shell.
- Added canonical foundation elevation image.
- Added seven colour regions.
- Added first-pass SVG overlay masks.
- Added colour picker and hex input controls.
- Added overlay-strength control.
- Added preset schemes.
- Added localStorage persistence.
- Added save/delete custom schemes.
- Added JSON copy action.
- Added responsive desktop/tablet layout.

### Known limitations

- SVG masks are deliberately approximate and require tracing refinement.
- Window sash and architrave are currently a single region.
- Entry trim mask is coarse.
- Door mask does not yet use a detailed exclusion path around every glass/panel edge.
- No comparison mode yet.
- No verified commercial paint database.
- No PNG export yet.
- No lighting simulation yet.

### Next recommended task

Refine SVG mask geometry against `public/assets/foundation-elevation.png` before adding more features.

## 2026-09-14 — Stabilisation and first mask refinement

- Installed dependencies and generated package-lock.json for repeatable installation.
- Extracted all seven masks into src/components/maskGeometry.ts in the original 1448 × 1086 coordinate system. Foundation asset is unchanged.
- Traced door, entry, window, ceiling, rafters and deck boundaries against the foundation image; excluded stained glass, sidelight glass, window panes and door hardware.
- Removed selection-dependent colour strength and hover brightening so selecting a region does not change its appearance.
- Added development-only outline inspection, selected-region label, cursor coordinates and 15% minimum overlay strength. Added keyboard access to regions.
- Fixed hex input editing with a local draft, validation and invalid-value reset on blur.
- Validated persisted colours and schemes; storage failures now display a session-persistence warning instead of crashing.
- Validation: npm run build passes (TypeScript and Vite). Dependency audit reports zero vulnerabilities. Interactive browser acceptance checks remain outstanding.

### Masks still approximate

- Bevels and small timber details use visually traced straight edges; glass edges need inspection at high zoom.
- Door hardware exclusions use conservative bounding rectangles.
- Multiply blending retains original linework and underlying colour, so resulting pixels are comparative rather than exact paint values.

### Next recommended task

Review masks interactively with contrasting colours and inspection outlines, then implement paint-library metadata, comparison view and versioned scheme import/export. Lighting simulation and PNG export remain pending.

## 2026-09-14 — Paint colour fidelity correction

### Cause

- The previous SVG used multiply blending at 54% opacity over the coloured foundation. Its existing beige/green hue therefore contaminated every selected paint colour.
- Tracing the binding confirmed region-keyed updates and explicit-only scheme application. This checkout has no named-paint selector and contains neither #DDD5B7 nor a Lime White paint record, so that specific named-selection report cannot be reproduced here.
- Browser regression testing exposed a separate preset/edit race in the hex field's effect-based draft synchronisation. Replaced the delayed effect with synchronous prop reconciliation. Invalid incomplete drafts remain visibly marked and revert on blur. Keyboard focus now selects the corresponding region; inspection displays the active state hex, and each SVG region exposes its RegionId and active colour in data attributes.

### Rendering approach

- A: SVG paint fills use selected hex values at opacity 1 with normal blending.
- B: A same-size canvas extracts neutral local edge contrast from the untouched foundation into a transparent detail image. An 11 × 11 neighbourhood and 12-level dead band reject smooth shading and foundation hue. Detail is clipped to painted regions, preserving grooves, panel mouldings, sash/architrave edges and local shadow cues.
- C: Original foundation pixels are composited above the paint and detail using the inverse paint mask, preserving excluded glass and hardware.
- Renamed the slider to Line/shadow strength (0–100%); it only changes the extracted detail layer. No photographic lighting was added.
- Canonical asset, dimensions, viewBox and mask geometry unchanged. Existing approximate mask boundaries and hardware bounding boxes remain approximate.

### Validation

- npm run build passes TypeScript and Vite.
- Headless Chrome screenshots at native 1448 × 1086 resolution: weatherboard samples at (100,140), (150,190), (850,240), (1400,550), (850,860) all returned exactly RGB(243,236,221) for #F3ECDD at detail strengths 0%, 70%, and 100%.
- The same samples returned exactly RGB(255,255,255) for #FFFFFF and RGB(0,0,0) for #000000 at all three detail strengths (45 pixel checks total).
- Region binding checks passed for weatherboards, door, entry trim and window trim, including save-then-edit, preset-then-edit, refresh persistence and the developer diagnostic. No browser errors.
- Reviewed the browser screenshot: weatherboard grooves, door panel mouldings, architrave/sash detail and original glass remain visible.
- Regression script retained at tests/colour-fidelity.mjs. Requires Playwright, pngjs and Chrome. Test-only packages were installed under /private/tmp/dorrigo-render-check, leaving app dependencies unchanged. Run with DORRIGO_TEST_MODULES=/private/tmp/dorrigo-render-check/package.json DORRIGO_TEST_URL=http://127.0.0.1:5174 node tests/colour-fidelity.mjs while Vite is running. Optional DORRIGO_CHROME selects the browser executable.

### Next recommended task

Review the corrected colour rendering in the user's browser. If the named-paint selector exists in a different checkout, inspect its paint record and RegionId callback there; do not assume this checkout contains that integration.

## 2026-09-14 — Reload saved schemes after browser restart

- Existing localStorage persistence already survives normal browser restarts; kept its keys and existing saved schemes compatible.
- Added a dedicated Saved schemes section with Load scheme actions, an empty state and clear same-browser/address guidance.
- Added save/load feedback, including a truthful session-only message if persistence fails.
- Persisted the active scheme name; loading a scheme restores both its name and colours. Saved snapshots remain separate from subsequent edits.
- Validation: npm run build passes. tests/scheme-restart.mjs passed a full headless Chrome process shutdown/relaunch using an isolated persistent profile: saved scheme, active colours and name survived, and Load scheme restored #F3ECDD to the input and SVG.
- Existing mask approximations unchanged. Next: review saved-scheme usability; portable JSON backup/import remains a separate pending task.

## 2026-09-14 — GitHub Pages deployment preparation

- Added a Vite configuration with relative base URLs and corrected both foundation image references to use BASE_URL, supporting the repository subpath.
- Added a GitHub Actions build/deploy workflow for main using npm ci and the existing build check.
- Ignored generated TypeScript build metadata and documented the Pages URL and browser-local scheme storage boundary.
- Validation: npm run build passes. Canonical image, masks and paint rendering unchanged.
- Target: existing empty repository stu2454/rovereto_colour_picker. Deployment verification pending.

### Deployment verified

- Published at https://stu2454.github.io/rovereto_colour_picker/; GitHub Actions run 34830455510 completed successfully.
- Live-site Chrome checks passed: foundation/detail assets loaded under the repository path, all 45 colour sample checks matched exactly, region/save/preset bindings worked, and saved schemes reloaded after a full browser restart.
- No runtime browser errors. Development-only inspection controls are absent from production as intended.

## 2026-09-15 — Persistent project handover

- Added PROJECT_STATUS.md as the current snapshot: deployed app, repository, completed features, limitations, dated verification evidence, test setup and recommended next task.
- Added AGENTS.md with session-start checks, the later colour-fidelity requirements and instructions to maintain status/log after meaningful work.
- Linked the handover from README.md; preserved CODEX_PROMPT.md as the original brief.
- Validation: reviewed documentation against Git history, existing implementation and deployment workflow. No application changes or build rerun needed.
- Existing mask approximations unchanged. No feature work in progress. Recommended next task: versioned JSON backup/import for transferring saved schemes between origins and browsers, subject to the user's next request.
