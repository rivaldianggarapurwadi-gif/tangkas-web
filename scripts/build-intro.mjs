import {build} from 'esbuild';
import {readFile, writeFile} from 'node:fs/promises';
await build({entryPoints: ['src/intro.jsx'], bundle: true, format: 'esm', minify: true,
  target: ['es2020'], outfile: 'public/intro.bundle.js', define: {'process.env.NODE_ENV': '"production"'}, legalComments: 'eof'});
console.log('React / GSAP cinematic intro bundled.');

// Keep the scroll video in the hero markup so it is available before the
// intro timeline starts. The runtime still reuses this element for scrubbing.
const homepage = 'public/index.html';
let html = await readFile(homepage, 'utf8');
html = html.replaceAll(/assets\/x7-scroll-(?:final|clean)\.mp4/g, 'assets/tngks-scroll.mp4');
html = html.replace(' poster="assets/x7-front.png"', '');
html = html.replace(/<script>if\(!matchMedia[\s\S]*?<\/script>/, '');
if (!html.includes('class="hero-scroll-video"')) {
  html = html.replace(
    '<div class="hero-media">',
    '<div class="hero-media"><video id="sequence" class="hero-scroll-video" src="assets/x7-scroll-final.mp4" poster="assets/x7-front.png" muted playsinline preload="auto" aria-hidden="true"></video>'
  );
  await writeFile(homepage, html);
}
await writeFile(homepage, html);
