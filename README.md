# Tangkas cinematic website

A local Indonesian-language website concept using the supplied research and cinematic-scroll brief. No public deployment has been made.

## Run

Requires Node.js 22.22.2 or a newer supported LTS release. Install the locked dependencies once.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173. The server listens only on localhost.

```sh
npm run check
npm test
npm run build
```

`dist/` is the self-contained static website output. Serve it through a static host if publishing is subsequently authorized.

## Edit

- `public/content.js`: brand, hero chapters, products, branch records, source links.
- `public/index.html`: section copy, calculator inputs, FAQs, forms.
- `public/styles.css`: shared design tokens, responsive layouts, animation fallbacks.
- `public/style-tile.html`: editable design board using the website's actual tokens.
- `src/intro.jsx`: React opening, GSAP master timeline, ScrollTrigger choreography, and Lenis integration.
- `public/cinematic.css`: homepage-only cinematic layout and reduced-motion fallback.
- `public/sequence.js`: bounded WebP frame decoder, driven by the scroll timeline.
- `public/assets/sequence.json`: frame count, dimensions, naming pattern, poster.
- `docs/production.md`: provenance, decisions, limitations, and launch requirements.

The WhatsApp flow prepares a message for user review. It neither sends a message automatically nor confirms a reservation. No form data is stored. There is no CRM, authentication, inventory, financing, booking-capacity, or owner-history backend in this draft.

Calculator inputs are illustrative editable assumptions, not current fuel/electricity tariffs or verified vehicle efficiency. Product claims and branch contact records require business sign-off before launch.

The original brand logo is preserved as raster artwork. A vector master was not supplied. Generated imagery is illustrative and needs brand review for product fidelity.

## Expanded content

The detailed product, company, ownership, business, and press pages are generated as static HTML from `scripts/build-pages.mjs`. Edit the page copy and source links there, then run `npm run build` (or restart `npm run dev`) to regenerate the pages. The homepage's model and showroom data remain in `public/content.js`. This split keeps the detailed pages searchable as HTML and the homepage interactions easy to update.

The added pages preserve source context. Archived product prices and old partner terms are labelled historical; corporate targets are presented as goals. A dated proposal, partner logo, or older certificate is not treated as proof of a current offer.

## Cinematic opening

The React motion layer enhances the existing static homepage; SEO copy and the editorial pages remain HTML. `npm run dev` and `npm run build` bundle `src/intro.jsx` with esbuild. Restart or rebuild after source changes, then reload the preview.

The loader decodes the poster, nearby frames, logo, model images, and fonts before a 3.75-second overlapping brand/product/text/navigation timeline (shorter on mobile). Escape or “Lewati intro” skips it. A bounded loading timeout and a boot watchdog keep the page accessible if assets or JavaScript fail. Reduced-motion visitors get the static hero immediately, without pinning, parallax, or smooth scrolling. Deep links bypass the opening.

ScrollTrigger pins the actual hero for 180vh on desktop and 135vh on mobile. Lenis uses GSAP’s ticker with native touch scrolling. Mobile uses 768px WebP frames at half the desktop sequence rate, a smaller decoded cache, and no pointer parallax. Below-hero imagery stays lazy-loaded except the first model section. No WebGL scene is loaded because no approved 3D model was supplied.
