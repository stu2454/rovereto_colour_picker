# Dorrigo House Colour Visualiser

A lightweight React/Vite prototype for testing exterior paint schemes against a fixed front-elevation illustration of the house.

## Why this approach

The foundation image stays fixed. Colour is applied as opaque SVG fills with separate neutral architectural detail and original glass/hardware layers. This means:
- the architecture does not change between schemes;
- linework and shading remain visible;
- individual architectural elements can be controlled independently;
- the app can later move from raster + masks to a fully vector SVG without changing the overall UI.

## Current colour regions

1. Weatherboards
2. Front door
3. Door / sidelight / transom trim
4. Window trim
5. Verandah ceiling
6. Verandah rafters / timber
7. Deck

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Important: masks are deliberately first-pass

The mask geometry in `src/components/maskGeometry.ts` is visually traced, with approximate small bevels and hardware exclusions.

The first development job is to refine the SVG paths so:
- weatherboard colour does not spill over the door surround or window;
- entry trim is separated cleanly from glass;
- window sash and architrave can optionally become separate regions;
- the door colour covers the door leaf but not stained glass;
- verandah structural elements are accurately mapped;
- the deck mask follows the exact floor boundary.

Use the 1448 × 1086 foundation image as the coordinate system.

## Colour accuracy

Hex/RGB values shown in the app are for visual comparison only. They should not be represented as authoritative Dulux paint matches unless verified independently. Physical sample pots viewed in actual morning/afternoon and under-verandah light remain the final check.

## Good next features

- named paint library with brand, range, colour name and verified digital reference;
- separate sash / architrave / sill colours;
- save schemes as JSON;
- export a labelled comparison board as PNG or PDF;
- side-by-side four-scheme comparison;
- day / overcast / under-verandah light simulation;
- optional restored iron balustrade layer;
- foundation-image switcher for alternate elevations;
- direct URL encoding of a scheme for easy sharing.

## GitHub Pages

Live site: https://stu2454.github.io/rovereto_colour_picker/

Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`.
Repository Settings → Pages must use **GitHub Actions** as its source.
Relative asset URLs support the repository subpath without changing the foundation image.

Saved schemes persist in the same browser at the same site address. Localhost
schemes do not automatically transfer to the Pages site; there is no server-side scheme storage.
