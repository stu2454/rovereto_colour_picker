# Codex build brief — Dorrigo House Colour Visualiser

You are working in an existing Vite + React + TypeScript project.

## Objective

Build a reliable, simple colour-scheme visualiser for a historic Australian weatherboard house in Dorrigo, NSW.

The supplied image at:

`public/assets/foundation-elevation.png`

is the canonical foundation image.

Do NOT redraw, regenerate, crop, distort or replace it. The central requirement is that the architectural geometry remains identical while users test different paint schemes.

## Product principle

This is not a photorealistic rendering engine.

It is an architectural comparison tool:
- fixed geometry;
- repeatable colour changes;
- restrained interface;
- no glossy real-estate styling;
- no unnecessary animation;
- no backend initially.

The app should remain usable by non-technical household members and an architect.

## Existing architecture

The app currently uses a raster foundation image plus an SVG overlay layer.

Each paintable architectural element should eventually have its own accurate mask.

The raster image coordinate system is:

- width: 1448
- height: 1086

Preserve the SVG `viewBox="0 0 1448 1086"`.

## Phase 1 — inspect and stabilise

1. Run the project.
2. Fix any TypeScript or Vite errors.
3. Do not introduce a framework beyond React/Vite.
4. Do not add a backend or database.
5. Keep state local, with browser localStorage only.

## Phase 2 — refine the masks

The current SVG masks in `src/components/ElevationCanvas.tsx` are deliberately crude starter geometry.

Refine them visually against the actual foundation image.

Required independent regions:

- `weatherboards`
- `door`
- `entryTrim`
- `windowTrim`
- `verandahCeiling`
- `verandahTimber`
- `deck`

Rules:
- stained glass must remain visible and uncoloured;
- sidelight glass must remain uncoloured;
- window glass must remain uncoloured;
- paint overlays must not bleed into neighbouring architectural elements;
- preserve the original linework;
- prefer multiple SVG `<path>` / `<polygon>` elements per region rather than one inaccurate shape;
- keep all mask geometry in a single clearly commented component or extract it to a dedicated `maskGeometry.tsx`.

Add a developer-only mask inspection mode:
- toggle mask outlines on/off;
- show currently selected region;
- allow overlay opacity to drop to ~15%;
- optional coordinate readout under the cursor if easy to implement.

## Phase 3 — improve colour controls

The current controls provide native colour pickers and hex inputs.

Improve the data model so a swatch can optionally contain:

```ts
{
  brand: "Dulux",
  range: "Traditional",
  name: "Pale Vellum",
  hex: "#......",
  verified: false
}
```

Important:
- do NOT invent authoritative Dulux hex values;
- preserve `verified: false` for placeholder/digital approximations;
- clearly label unverified colours as "digital approximation";
- permit arbitrary custom hex colours.

Create a small starter paint library as data only, with neutral placeholder values where exact values are not verified.

## Phase 4 — comparison mode

Add a `Compare` view.

Requirements:
- show 2 or 4 schemes side-by-side;
- each panel must use the same foundation image;
- labels underneath should show each scheme name;
- maintain correct image aspect ratio;
- comparison panels need not expose editable masks;
- users can select saved or preset schemes for each comparison slot.

Do NOT create comparison images using AI or regenerated imagery.

## Phase 5 — scheme management

Support:
- Save current scheme
- Rename saved scheme
- Duplicate
- Delete
- Export scheme as JSON
- Import scheme from JSON
- Restore foundation scheme

Persist custom schemes to localStorage.

Define a versioned import/export shape such as:

```json
{
  "schemaVersion": 1,
  "name": "Scheme name",
  "colours": {
    "weatherboards": "#ffffff",
    "door": "#000000",
    "entryTrim": "#ffffff",
    "windowTrim": "#ffffff",
    "verandahCeiling": "#ffffff",
    "verandahTimber": "#ffffff",
    "deck": "#777777"
  }
}
```

Validate imported JSON and show a useful error if invalid.

## Phase 6 — light simulation

Add a modest display-only lighting selector:

- Neutral
- Under verandah
- Overcast
- Bright daylight

This is for comparative visualisation only.

Implementation guidance:
- use restrained CSS filters or an overlay;
- do not mutate the saved base colour values;
- no dramatic effects;
- clearly label this as a simulation.

## Phase 7 — export

Add export of the current visualiser panel to PNG.

Preferred:
- use a well-maintained client-side library only if necessary;
- otherwise render/export using browser canvas;
- exported image should include:
  - elevation,
  - scheme name,
  - colour swatches and labels,
  - a small disclaimer: "Digital colour simulation — confirm with physical paint samples."

If export becomes fragile, leave it isolated behind a feature flag rather than destabilising the core app.

## UX

Use Australian/UK English:
- colour, not color in visible UI;
- visualiser, not visualizer;
- verandah, not porch;
- programme only if relevant.

Design direction:
- restrained heritage / architectural presentation;
- warm neutral background;
- dark green/charcoal controls;
- avoid bright blue SaaS styling;
- strong desktop layout, good tablet behaviour;
- mobile support is useful but secondary.

## Testing / acceptance checks

Before considering a phase complete:

1. `npm run build` succeeds.
2. No TypeScript errors.
3. Foundation image aspect ratio is preserved.
4. Selecting a colour updates only the intended region.
5. Reset restores the foundation colours.
6. Refresh preserves current colours and saved schemes.
7. Compare mode uses identical geometry in every panel.
8. Import rejects malformed JSON without crashing.
9. No network requests are required for core use.
10. No colour is described as an exact commercial paint match unless explicitly marked verified.

## Development discipline

After each meaningful change:
- update `DEVLOG.md`;
- record what changed;
- record any masks that remain approximate;
- record next recommended task.

Do not over-engineer. The critical success factor is accurate, repeatable separation of architectural colour regions.
