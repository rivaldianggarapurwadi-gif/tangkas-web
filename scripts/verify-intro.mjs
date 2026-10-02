import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM, VirtualConsole} from 'jsdom';

// Exercise the shipped React bundle's escape paths without changing OS settings.
const html = await readFile('public/index.html', 'utf8');
const bundle = await readFile('public/intro.bundle.js', 'utf8');
const waitFor = async predicate => {
  for (let i = 0; i < 100; i++) {
    if (predicate()) return;
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  assert.fail('Intro state did not settle');
};
async function fixture({reduce = false, hash = '', expired = false} = {}) {
  const errors = [], listeners = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error.message));
  const dom = new JSDOM(html, {url: 'http://localhost/' + hash, runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole});
  const {window} = dom;
  const preference = {matches: reduce, addEventListener: (_, fn) => listeners.push(fn), removeEventListener() {}};
  window.matchMedia = query => query.includes('prefers-reduced-motion') ? preference : {matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}};
  window.scrollTo = () => {};
  window.introTimedOut = expired;
  window.document.fonts = {load: () => Promise.resolve([])};
  // Simulate indefinitely stalled images; fallback must still unlock the page.
  window.Image = class {set src(_) {} decode() {return Promise.resolve();}};
  window.eval(bundle);
  await waitFor(() => window.document.body.dataset.introState);
  return {window, errors, close: () => window.close(), reduceNow() {preference.matches = true; listeners.forEach(fn => fn());}};
}
function assertStatic({window, errors}) {
  const doc = window.document;
  assert.equal(doc.body.dataset.introState, 'static');
  assert.equal(doc.querySelector('.intro-overlay').hidden, true);
  assert.equal(doc.documentElement.style.overflow, '');
  assert.equal(doc.querySelector('main').inert, false);
  assert.equal(doc.querySelector('.header').inert, false);
  assert.equal(doc.querySelector('footer').inert, false);
  assert.equal(doc.querySelector('.pin-spacer'), null);
  assert.match(doc.querySelector('h1').textContent, /ENERGI BARU/);
  assert.equal(doc.querySelectorAll('.header nav a').length, 5);
  assert.ok(doc.querySelector('#models') && doc.querySelector('#showrooms') && doc.querySelector('#enquiry-form'));
  assert.deepEqual(errors, []);
}
for (const options of [{reduce: true}, {hash: '#models'}, {expired: true}]) {
  const test = await fixture(options);
  try {assertStatic(test);} finally {test.close();}
}
for (const action of ['watchdog', 'preference-change']) {
  const test = await fixture();
  try {
    assert.equal(test.window.document.body.dataset.introState, 'complete');
    assert.equal(test.window.document.querySelector('main').inert, false);
    if (action === 'watchdog') test.window.document.dispatchEvent(new test.window.Event('intro:fallback'));
    else test.reduceNow();
    assertStatic(test);
  } finally {test.close();}
}
console.log('Passed: initial reduced motion, deep links, expired bootstrap, stalled-loader recovery, live reduced-motion change, and preserved content/navigation.');
