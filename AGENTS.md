# Working on this project

## Start here

1. Read `PROJECT_STATUS.md` for the current handover and next recommended task.
2. Read `CODEX_PROMPT.md` for the original build brief, then the latest entries in `DEVLOG.md` for subsequent decisions. Earlier log entries describe historical behaviour, not necessarily the current implementation.
3. Check `git status --short` and recent commits before editing. Preserve existing user changes.
4. Follow the user's current request. The backlog is context, not an instruction to implement every remaining feature.

## Constraints carried forward

- Keep `public/assets/foundation-elevation.png` unchanged, including its 1448 × 1086 dimensions. Preserve the SVG viewBox and architecture.
- Paint fills must use the selected colour directly at opacity 1 with normal blending. Do not restore multiply tinting or translucent paint over the coloured foundation.
- Keep neutral architectural detail separate from paint. The Line/shadow strength control affects detail only. Glass and hardware retain original pixels.
- Preserve the seven RegionIds and correct control/state/SVG binding. Never label approximate commercial paint values as verified matches.
- Keep the app React/Vite/TypeScript, client-only, with browser-local persistence unless the user changes that scope. Use Australian/UK English in the UI.
- The original brief's lighting and other later phases are backlog; the user's later instruction deferred photographic lighting. Do not implement it as part of an unrelated task.
- Preserve relative asset URLs for GitHub Pages under `/rovereto_colour_picker/`.

## Validation

- For app changes, run `npm run build` and checks appropriate to the change.
- For rendering/binding changes, use `tests/colour-fidelity.mjs` against a development server. It includes development-only inspection checks.
- For persistence changes, use `tests/scheme-restart.mjs` with an isolated browser profile.
- See `PROJECT_STATUS.md` for test prerequisites and commands. Do not assume temporary test dependencies still exist.
- Documentation-only changes need a content/link/diff review, not an app rebuild. Report what was actually checked; never treat old test results as a new run.

## Finish with a handover

- Update `PROJECT_STATUS.md` after meaningful work: date, current behaviour, outstanding issues, exact validation results and next recommended task. Keep it a concise snapshot rather than an accumulating diary.
- Append a dated entry to `DEVLOG.md`: what changed, why, validation, remaining mask approximations and next task.
- Keep `CODEX_PROMPT.md` as the historical original brief. Record later decisions in the status/log instead of silently rewriting history.
- Keep deployment status distinct from local changes. A commit/push is not proof of a successful deployment; record the workflow or live checks when available.
- Include these handover files with the relevant Git commit when committing work. Pushes to `main` normally deploy automatically; use `[skip ci]` for documentation-only commits when no deployment is needed.
