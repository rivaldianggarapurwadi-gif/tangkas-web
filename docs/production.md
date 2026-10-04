# Production notes

## Direction
Tangkas orange #FF5900, graphite, warm white, restrained instrumentation, Barlow Condensed ExtraBold display typography and Barlow body typography. Indonesian visitor copy. Official brand raster preserved. No invented testimonials, sales counters, current subsidies, financing offers, or guaranteed warranty claims.

## Story and scroll pacing
One continuous studio sequence, pinned with native scrolling. Desktop section height 450 viewport heights in CSS means 4.5 viewports; active travel is 3.5 viewports after subtracting the stage. Mobile is 3.8 viewports total and 2.8 active viewports. Timeline: 0–16% hold first frame; 16–48% advance to 56% of clip; 48–60% hold; 60–90% advance to final frame; 90–100% hold. Chapters change at 34% and 69%. Text stays semantic HTML. Reduced motion removes pinning and uses a still. Save-data avoids the frame sequence. Skip link and model navigation bypass the story.

Frame decoding uses at most 3 concurrent requests and 20 cached bitmaps (10 for reported low-memory devices). Nearby frames are prioritized, stale queued work is replaced, failed frames receive at most two attempts, and evicted bitmaps are closed. Fast jumps retain the nearest available image; the poster survives media failure. Pixel ratio is capped at 1.5.

## Product data
The supplied research is a planning input, not a signed 2026 price list. Official product and showroom pages were read on 2026-09-30:
- https://tangkasmotor.co.id/
- https://tangkasmotor.co.id/produk-kami/
- https://tangkasmotor.co.id/showroom-kami/

P6 Lithium catalog states 70 km/h, while supplied research mentions 80 km/h. Use catalog wording in the detail note and do not silently merge conflicting configurations. Prices remain enquiries. X7 range is a qualified publication claim, not guaranteed real-world range. E6 figures follow the viewed catalog, with differing regional listings documented. No stale insurance or financing promise is surfaced.

12 complete branch records from the official showroom page are included. Empty placeholder entries are excluded. The page's Surabaya map link appeared duplicated from Raffles Hills; use an address-based Google Maps search instead, without inventing coordinates. Hours, stock, and test-ride availability require direct confirmation.

## Asset provenance
Official raster logo: https://tangkasmotor.co.id/wp-content/uploads/2022/12/vector-file-verticaltankas-300x193.png
X7 product reference: https://tangkasmotor.co.id/wp-content/uploads/2025/08/X7-removebg-preview-converted-from-png-fotor-bg-remover-20250821163320.png
P6 cutout: https://tangkasmotor.co.id/wp-content/uploads/2025/08/TANGKAS_-_P6_PRO_-_2025_-_DETAIL_5-removebg-preview__2_-removebg-preview.png
E6-style official cutout: https://tangkasmotor.co.id/wp-content/uploads/2025/08/WhatsApp_Image_2025-08-21_at_16.40.30_200532bd-removebg-preview-removebg-preview-removebg-preview.png
Journey image, from official homepage: https://tangkasmotor.co.id/wp-content/uploads/2026/06/6a339f533b8db-1024x683.png
Official catalog sheets are preserved under public/assets as references. Rights for official/third-party editorial images should be confirmed by Tangkas before public launch.
Fonts downloaded from Google Fonts: Barlow and Barlow Condensed. Local copies remove third-party font calls.

## Higgsfield generation
Private media project/folder: aac69bb3-7f84-48c3-b60d-55e51cd7020e.
Initial submission was rejected for zero credits. After the user updated billing, the retry was accepted; no duplicate successful job was submitted.
Image job: 7636fa87-df7f-4e3d-ae4b-6d36fb0c43f4, GPT Image 2.5, high quality, 2k, 16:9, official X7 reference.
Video job: 8a975f39-f2c9-41f8-b85a-669d6cde748d, Seedance 2.5, 8 seconds, 720p, no generated audio, completed image as start_image.

Image prompt: Premium electric scooter automotive studio photograph. Preserve the exact scooter geometry, materials, badges and color from the supplied Tangkas X7 reference. Position complete scooter on right 60 percent of wide composition, three quarter front side view, front wheel directed slightly left. Dark graphite concrete cyclorama, soft warm orange rim light from right, realistic subtle ground reflection and dramatic directional overhead white light. Left 40 percent is empty near black negative space for HTML typography. Do not generate any text, graphics or labels. Entire vehicle including mirrors and tires inside frame. High-end restrained cinematic photography, not sci-fi.

Video prompt: One continuous 8 second premium automotive studio camera move from this exact starting frame. Preserve this identical black Tangkas electric scooter, all geometry, mirrors, windshield, wheels, seat and badges, stationary on center stand. First 0-2 seconds: extremely gentle forward camera drift, whole scooter stays on right side and left 40 percent stays empty dark negative space. Seconds 2-5: smooth slow dolly toward front fairing and headlamp, slightly orbit 8 degrees clockwise around scooter; never crop windshield or wheels completely, maintain consistent spatial relationships. Seconds 5-8: gently pull back to a full-vehicle three-quarter reveal nearly matching opening size, settle smoothly. Same dark graphite studio and grounded floor reflections, warm orange rim light gradually brightens slightly, overhead white softbox highlights. No scene cuts, no transitions, no new objects, no rider, no added graphics or text, no camera shake, no moving wheels, no morphing. Restrained photorealistic product film. At all times reserve empty left 40 percent for editable website text.

## Scope and launch dependencies
The deliverable is a local marketing/discovery website with functional filters, comparison, energy calculator, showroom search, model details, and branch-aware enquiry preparation. Research suggestions for an authenticated owner garage, CRM, capacity booking, live inventory, finance underwriting, fleet telemetry, and service-ticket operations remain future backend work. No pretend success states are used.

E6 asset correction: the initially downloaded white/orange cutout did not match the E6 Box catalog and is not used. A temporary CSS crop was replaced by the final Higgsfield E6 illustration; the unchanged official sheet is preserved as the specification source. The catalog gives 80–100 km, 1,200 W and 45 km/h; these replace the inconsistent research listing. Regional prices printed on the historical source sheet are not current offers. Two attempted Higgsfield cutout submissions failed before a job was returned (timeout, then reference fetch failure); project listing confirmed no extra image job after the first failure.

## Completed footage and verification
The original generated MP4 is saved at `public/assets/tangkas-studio-original.mp4`: 8.04 seconds, 1280×720, 24 fps, silent. Extracted 145 WebP frames at 18 fps and quality 78, 5,867,558 bytes total (~5.60 MiB). The first second begins very dark, so the implemented opening hold starts at frame 18 and continues smoothly through frame 144. The bright original generated still is retained as the design-board image. All frame filenames are contiguous and validated during build.

Viewed first, middle, and final frames: continuous studio setting; the middle is a tighter headlamp/fairing composition; final view returns to the complete vehicle. A single sequence avoids inter-clip seams. The camera crops the vehicle during the close-up; product silhouette returns in the final reveal. AI rendering is illustrative and not a substitute for approved photography.

Browser checks completed in local Chrome at 1440×1000 and 390×844: model filters, comparison dialog, calculator result, branch search including empty results, branch-specific WhatsApp message preparation, mobile menu, no horizontal overflow, reduced-motion layout, no JavaScript errors. Wheel-driven forward/reverse scrolling changed the canvas and all three chapters as expected, without failed asset requests. No WhatsApp message was sent. Build and JavaScript syntax checks passed. Slow-network, Safari, and real-device testing have not been performed.

Final E6 image job: bd349ff7-0cab-4b00-bae2-619543b096fc. A smaller official 1024×576 reference resolved the earlier fetch error. GPT Image 2.5, medium, 1k, 4:3. Prompt requested exact product extraction and removal of catalog typography. Output was visually inspected: white/turquoise scooter, rear box, mirrors and wheels are present; the model supplied a dark background despite the transparency request. The site intentionally displays the illustration on a dark product card and does not claim it is a transparent cutout. No further regeneration was attempted. Product fidelity still requires Tangkas approval.

## September 2026 content expansion
Added five semantic static HTML pages from the supplied migration research: model/variant specifications, company history and management, service and warranty guidance, business and government procurement, and curated press/gallery links. `scripts/build-pages.mjs` owns those pages and `npm run build` regenerates them before copying to `dist/`. Existing homepage animation and enquiries remain intact.

The additional research supplied historical product flyer prices, vision targets, partner proposals, insurance and finance agreements, and leadership details. Old prices and commercial terms appear only in labelled archive disclosures. Roadmap figures are explicitly targets. The 12 complete official showroom records received fuller addresses; Kulon Progo and two blank showroom templates are omitted from the searchable branch list until complete active contact details are supplied. Source links lead to official Tangkas pages or original publishers; externally published articles were not copied.

## Cinematic opening upgrade — 30 September 2026

The existing homepage now uses a React enhancement, bundled locally with esbuild, with GSAP Timeline, ScrollTrigger, and Lenis. The semantic HTML, content module, navigation destinations, enquiry flow, and five editorial pages remain in place. Spyker's public site was consulted only for interaction pacing; no Spyker assets, copy, typography, or identity were imported.

The real hero is unveiled through a fullscreen clipped loader. The wordmark, product framing, line masks, and navigation share an overlapping master timeline. Critical poster/nearby sequence frames, logo, fonts, and first-model imagery are preloaded. ScrollTrigger subsequently pins the hero for 180vh (135vh mobile), preserving all three original chapters. Pointer depth uses interpolated transforms on separate layers. Touch devices have no pointer movement; tablet movement is reduced. Below-hero content remains in its original order.

Mobile assets are 64 WebP frames at 768×432, every second desktop frame from 18 through 144, approximately 1.16 MiB total. The desktop sequence remains unchanged. Frame decoding uses a bounded cache (8 mobile, 10 on low-memory desktop, otherwise 18) and three concurrent requests. The ready poster covers missing frames and unavailable canvas decoding. No 3D asset was provided, so no WebGL scene was added.

Verified in the in-app browser: desktop, tablet, mobile and short-window layouts; brand clipping; completed intro; skip control; released scrolling; forward chapter progression; navigation into the model section; mobile menu; comparison open/close; responsive mobile poster; no console errors. A fractional-zoom rounding edge is contained with horizontal clipping. DOM tests of the shipped React bundle pass for initial reduced motion, a preference change while loading, stalled-loader watchdog recovery, deep links, and a late-loading bundle after the boot timeout. All 124 local HTML links/assets resolve across seven pages. Production build validates both frame sets. Real-device frame-rate profiling and Safari testing remain unmeasured.

Implementation: `src/intro.jsx`, `public/cinematic.css`, and `public/sequence.js`. `npm test` runs the nonvisual fallback tests; `npm run check` validates syntax/bundling; `npm run build` prepares static `dist/`. The existing browser motion script was adjusted for the shorter pinned scroll distance. Current desktop/mobile screenshots are in `docs/screenshots/`.
