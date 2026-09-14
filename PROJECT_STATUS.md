# Project status — Dorrigo House Colour Visualiser

Last updated: 2026-09-15.

## Where we left off

The visualiser is deployed and usable. The latest task added this handover system; no application behaviour changed. No feature implementation is currently in progress.

- Live site: https://stu2454.github.io/rovereto_colour_picker/
- Repository: https://github.com/stu2454/rovereto_colour_picker
- Branch: `main`
- Last verified app deployment: commit `a7748f2`, GitHub Actions run `34830455510`, verified on 2026-09-14.
- Deployment notes were committed as `45b95e7`. Later documentation-only commits do not change the deployed app.
- Deployment: `.github/workflows/deploy.yml` builds with `npm ci` / `npm run build` and publishes to Pages on pushes to `main`.

## Working features

- Seven independent regions: weatherboards, door, entry trim, window trim, verandah ceiling, verandah timber, deck.
- Colour picker and editable hex controls, presets, reset to foundation scheme values.
- Opaque paint fills, neutral extracted linework above them, original unpainted glass/hardware above both. Line/shadow strength affects details only.
- Development-only mask outlines, selected-region/active-hex diagnostic and cursor coordinates.
- Named saved schemes with save, load and delete. Active colours, active name and saved snapshots survive browser restarts.
- Copy JSON for the current scheme. This is clipboard output, not versioned file export/import.
- Responsive layout and GitHub Pages asset paths.

## Decisions and limitations

- The foundation image and 1448 × 1086 coordinate system must remain unchanged.
- Faithful flat paint colour takes priority over original illustration lighting. Never restore multiply blending or partial-opacity paint fills.
- Small bevels/glass edges remain approximate. Hardware exclusions use conservative rectangles. Further mask refinement needs visual review.
- Saved schemes use localStorage, scoped to the browser and origin. Clearing site data removes them. Localhost/other ports and the Pages site do not share schemes; there is no server-side storage or device sync.
- No named-paint selector or verified paint library exists in this checkout. The earlier reported Lime White/#DDD5B7 named-selection mismatch could not be reproduced here; do not invent a diagnosis for an absent integration.
- Not yet built: versioned JSON import/file export, saved-scheme rename/duplicate actions, comparison panels, paint metadata/library, PNG export or lighting simulation.
- Later user instructions deferred photographic lighting; the original brief is not an instruction to add it now.

## Latest validation evidence

These are recorded results from 2026-09-14, not checks rerun on every handover:

- Local and GitHub Actions TypeScript/Vite builds passed.
- Live-site Chrome tests loaded the foundation/detail layers without runtime errors.
- Five flat weatherboard samples at each of 0%, 70%, 100% detail strength matched exactly: #F3ECDD → (243,236,221), #FFFFFF → (255,255,255), #000000 → (0,0,0), 45 checks total.
- Region binding, preset-then-edit, save-then-edit and refresh checks passed.
- A full Chrome shutdown/relaunch with an isolated persistent profile preserved active colours/name and saved schemes; Load scheme restored the saved colours on the live site.
- Original deployment succeeded with action-runtime deprecation warnings; these did not fail the build. Review supported action versions when next maintaining the workflow.
- 2026-09-15 handover: documentation checked against repository history, source and workflow. No app tests rerun for documentation-only changes.

## Resume and test

```sh
npm ci
npm run dev
npm run build
```

Use the address Vite prints. Keep the same address/port when testing existing browser-saved schemes.

Browser scripts require `playwright`, `pngjs` and Chrome. They are deliberately not app dependencies. The earlier test tools were installed in `/private/tmp/dorrigo-render-check`; this temporary directory may need recreating:

```sh
npm install --prefix /private/tmp/dorrigo-render-check playwright pngjs
DORRIGO_TEST_MODULES=/private/tmp/dorrigo-render-check/package.json DORRIGO_TEST_URL=http://127.0.0.1:5173 node tests/colour-fidelity.mjs
DORRIGO_TEST_MODULES=/private/tmp/dorrigo-render-check/package.json DORRIGO_TEST_URL=http://127.0.0.1:5173 node tests/scheme-restart.mjs
```

Adjust the test URL to the running server. `DORRIGO_CHROME` overrides the default macOS Chrome executable. The colour script expects development inspection controls; do not run it unchanged against production. The restart script can target the live site.

## Next recommended task

Portable scheme backup: implement versioned JSON download/import with validation, so users can transfer schemes between localhost, Pages and browsers. Preserve current localStorage data and colour fidelity. This is a recommendation, not an already-started or user-approved feature task.

Other follow-up work: review fine mask boundaries, then prioritise named-paint data and comparison mode with the user.

## Prompt for a future session

> Read AGENTS.md and PROJECT_STATUS.md, check the working tree and recent commits, and continue from the next recorded task. Tell me if the repository state differs from the handover.
