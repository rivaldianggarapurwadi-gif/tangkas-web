import React, {useLayoutEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {content} from '../public/content.js';
import {createSequence} from '../public/sequence.js';



gsap.registerPlugin(ScrollTrigger);
const $ = selector => document.querySelector(selector);
const all = selector => [...document.querySelectorAll(selector)];


function imageReady(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => img.decode().catch(() => {}).then(() => resolve(img));
    img.onerror = reject;
    img.src = src;
  });
}

// Authored line breaks preserve the existing semantic heading and copy.
function lines(element, html = element.innerHTML) {
  element.innerHTML = html.split(/<br\s*\/?\s*>/i)
    .map(line => `<span class="line-mask"><span class="line-inner">${line}</span></span>`).join('');
}

function experience(root) {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 760px)');
  const stage = $('.stage'), story = $('.scroll-story'), copy = $('.hero-copy');
  const media = $('.hero-media');
  const nav = all('.header > .brand, .header nav a, .header .nav-actions > *');
  const supporting = all('.hero-actions, .vehicle-caption, .hero-bottom, .media-note');
  let intro, scroll, lenis, disposed = false, complete = false, staticFallback = false;
  let loadingTimeout, sequence, heroVideo, cleanupVideo = () => {};
  const original = [$('#chapter-eyebrow').innerHTML, $('#chapter-title').innerHTML, $('#chapter-body').innerHTML];
  const previousOverflow = document.documentElement.style.overflow;
  const progressLine = root.querySelector('.intro-progress i');

  const clock = time => lenis?.raf(time * 1000);
  const unlock = () => {
    document.documentElement.style.overflow = previousOverflow;
    document.documentElement.classList.remove('intro-boot');
    document.body.classList.remove('intro-running');
    clearTimeout(window.introSafety);
    $('main').inert = false; $('.header').inert = false; $('footer').inert = false;
  };
  function finalState() {
    gsap.set([media, copy, ...nav, ...supporting], {clearProps: 'all'});
    gsap.set(all('.hero-copy .line-inner'), {clearProps: 'all'});
    
    copy.inert = false; root.hidden = true; unlock();
    document.body.dataset.introState = 'complete';
  }
  let activeChapter = -1;
  function setChapter(index) {
    if (activeChapter === index) return;
    activeChapter = index;
    const item = content.chapters[index];
    lines($('#chapter-eyebrow'), item.eyebrow.replace(/^\d+\s*\/\s*/, ''));
    lines($('#chapter-title'), item.title);
    lines($('#chapter-body'), item.body);
  }
  function renderChapter(progress) {
    const index = progress < .34 ? 0 : progress < .69 ? 1 : 2;
    setChapter(index);
  }
  function startScroll() {
    if (reduced.matches || disposed || scroll) return;
    heroVideo = media.querySelector('video#sequence') || document.createElement('video');
    heroVideo.id = 'sequence';
    heroVideo.className = 'hero-scroll-video';
    heroVideo.setAttribute('aria-hidden', 'true');
    heroVideo.muted = true;
    heroVideo.playsInline = true;
    heroVideo.preload = 'auto';
    heroVideo.style.zIndex = '2';
    const videoSource = mobile.matches ? 'assets/tngks-scroll-mobile.mp4' : 'assets/tngks-scroll.mp4';
    if (heroVideo.getAttribute('src') !== videoSource) heroVideo.src = videoSource;
    if (!heroVideo.parentNode) media.appendChild(heroVideo);
    // iOS may preload metadata without decoding a frame. A muted play request
    // primes the decoder; the first decoded frame is then paused for scrubbing.
    const video = heroVideo;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    let priming = false, primed = false;
    const pauseReady = () => {
      if (disposed || heroVideo !== video) return;
      video.pause(); primed = true; priming = false;
      seekVideo(scroll?.progress() || 0);
    };
    const prime = () => {
      if (disposed || primed || priming || heroVideo !== video) return;
      priming = true;
      const playing = video.play();
      playing?.then(pauseReady).catch(() => { priming = false; });
    };
    video.addEventListener('loadeddata', pauseReady);
    document.addEventListener('touchstart', prime, {passive: true});
    document.addEventListener('pointerdown', prime, {passive: true});
    let requestedTime = 0, lastSeek = 0;
    const smoothSeek = () => {
      if (!heroVideo || disposed || heroVideo.seeking || heroVideo.readyState < 1) return;
      const distance = requestedTime - heroVideo.currentTime;
      const now = performance.now();
      // ScrollTrigger already smooths progress. Seek once to the latest frame
      // instead of repeatedly decoding intermediate frames on iPhone.
      if (Math.abs(distance) >= 1 / 30 && now - lastSeek >= 32) {
        heroVideo.currentTime = requestedTime; lastSeek = now;
      }
    };
    gsap.ticker.add(smoothSeek);
    cleanupVideo = () => {
      gsap.ticker.remove(smoothSeek);
      video.removeEventListener('loadeddata', pauseReady);
      document.removeEventListener('touchstart', prime);
      document.removeEventListener('pointerdown', prime);
      video.pause();
    };
    const seekVideo = progress => {
      if (!heroVideo || !Number.isFinite(heroVideo.duration) || heroVideo.duration <= 0) return false;
      const target = Math.max(0, Math.min(heroVideo.duration - 0.001, progress * heroVideo.duration));
      requestedTime = target;
      return true;
    };
    lenis = new Lenis({lerp: .095, smoothWheel: true, syncTouch: false,
      anchors: {offset: -88}, prevent: node => !!node.closest('dialog, .branch-list')});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(clock); gsap.ticker.lagSmoothing(0);
    scroll = gsap.timeline({defaults: {ease: 'none', force3D: true}, onUpdate: () => {
      if (!scroll) return;
      const progress = scroll.progress();
      renderChapter(progress);
      if (!seekVideo(progress)) sequence?.seek(progress);
    }, scrollTrigger: {
      trigger: story, start: 'top top', end: () => `+=${innerHeight * (mobile.matches ? 1.7 : 2.6)}`,
      pin: stage, scrub: mobile.matches ? .35 : 1, anticipatePin: 1, invalidateOnRefresh: true,
    }});
    // Front close-up, existing three-quarter side angle, then full-bike reveal.
    scroll.to('.hero-bottom', {y: -20, opacity: 0, duration: .12}, .02)
      .to(copy, {y: -18, opacity: 0, duration: .08}, .26)
      .to(copy, {y: 0, opacity: 1, duration: .08}, .34)
      .to(copy, {y: -18, opacity: 0, duration: .08}, .61)
      .to(copy, {y: 0, opacity: 1, duration: .08}, .69)
      .fromTo('.vehicle-caption', {opacity: 0, y: 12}, {opacity: 1, y: 0, duration: .13}, .82)
      .to({}, {duration: .05}, .95);
    ScrollTrigger.refresh();
    heroVideo.addEventListener('error', () => {
      if (disposed || sequence) return;
      fetch('assets/sequence.json').then(response => response.json()).then(manifest => {
        if (!disposed) {
          cleanupVideo(); heroVideo?.remove(); heroVideo = null;
          const canvas = document.createElement('canvas');
          canvas.id = 'sequence'; media.appendChild(canvas);
          sequence = createSequence(manifest, stage, mobile);
          sequence.seek(scroll?.progress() || 0);
        }
      }).catch(() => {});
    }, {once: true});
    heroVideo.addEventListener('loadedmetadata', () => {
      if (scroll?.scrollTrigger) seekVideo(scroll.scrollTrigger.progress);
    }, {once: true});
    if (heroVideo.readyState >= 1) seekVideo(scroll.progress());
    prime();
  }
  function finish() {
    if (complete || disposed) return;
    const wasFocused = root.contains(document.activeElement);
    complete = true; finalState(); startScroll();
    if (wasFocused) $('.hero-actions a').focus({preventScroll: true});
  }
  function skip() { if (intro) intro.progress(1); else finish(); }
  function staticMode() {
    staticFallback = true;
    intro?.kill(); scroll?.scrollTrigger?.kill(); scroll?.kill(); scroll = null;
    lenis?.destroy(); lenis = null; gsap.ticker.remove(clock);
    cleanupVideo();
    complete = true; sequence?.destroy(); sequence = null; heroVideo?.remove(); heroVideo = null; finalState();
    gsap.set(['.x7-front', '.x7-side', '.hero-bottom', '.vehicle-caption'], {clearProps: 'all'});
    document.body.dataset.introState = 'static';
  }
  const onPreference = () => { if (reduced.matches) staticMode(); };
  const onEscape = event => { if (event.key === 'Escape' && !complete) skip(); };
  reduced.addEventListener('change', onPreference);
  document.addEventListener('intro:fallback', staticMode);
  document.addEventListener('keydown', onEscape);
  $('.skip').addEventListener('click', skip);
  root.querySelector('button').addEventListener('click', skip);
  [$('#chapter-eyebrow'), $('#chapter-title'), $('#chapter-body')].forEach(el => lines(el));
  if (document.body.classList.contains('hero-static') || reduced.matches || window.introTimedOut) {
    staticMode();
  } else if (!reduced.matches) {
    // Open directly on the actual video composition, without the poster reveal.
    finish();
  } else {
    document.body.classList.add('intro-running'); document.body.dataset.introState = 'loading';
    document.documentElement.style.overflow = 'hidden'; $('main').inert = true; $('.header').inert = true; $('footer').inert = true;
    gsap.set(media, {scale: 1.12, y: '3vh', opacity: 0, force3D: true});
    gsap.set('.hero-copy .line-inner', {yPercent: 120, force3D: true});
    gsap.set(nav, {opacity: 0, y: -10, force3D: true});
    gsap.set(supporting, {opacity: 0, y: 8}); gsap.set('.intro-brand', {y: 0, yPercent: 110});
    const tasks = ['assets/x7-front.png', 'assets/x7-hero-transparent.png', 'assets/tangkas-logo.png', ...content.models.map(m => m.image)].map(imageReady);
    tasks.push(document.fonts.load('800 48px Condensed'), document.fonts.load('16px Barlow'));
    let loaded = 0;
    const ready = Promise.allSettled(tasks.map(task => task.finally(() => {
      if (disposed || complete) return;
      const progress = ++loaded / tasks.length;
      gsap.to(progressLine, {scaleX: progress, duration: .25, ease: 'power2.out', overwrite: true});
    })));
    const timeout = new Promise(resolve => { loadingTimeout = setTimeout(resolve, 6500); });
    Promise.race([ready, timeout]).then(async () => {
      clearTimeout(loadingTimeout);
      if (disposed || staticFallback) return;
      if (!complete) {
        gsap.set(progressLine, {scaleX: 1});
        document.body.dataset.introState = 'revealing';
        intro = gsap.timeline({onComplete: finish, defaults: {ease: 'power3.out'}});
        intro.to('.intro-brand', {yPercent: 0, duration: 1})
        .to('.intro-brand', {opacity: .55, scale: .96, duration: .7}, 1.12)
        .to(root, {clipPath: 'inset(0 0 100% 0)', duration: 1.25, ease: 'power4.inOut'}, 1.3)
        .to(media, {scale: 1, y: 0, opacity: 1, duration: 1.9, ease: 'expo.out'}, 1.35)
        .to('.hero-copy .line-inner', {yPercent: 0, stagger: .10, duration: 1.05, ease: 'power4.out'}, 2.02)
        .to(nav, {opacity: 1, y: 0, stagger: .05, duration: .7}, 2.65)
        .to(supporting, {opacity: 1, y: 0, stagger: .05, duration: .75}, 2.75);
        intro.timeScale(mobile.matches ? 1 / .78 : 1);
      }

    });
  }
  return () => {
    disposed = true; clearTimeout(loadingTimeout); staticMode(); unlock();
    reduced.removeEventListener('change', onPreference);
    document.removeEventListener('intro:fallback', staticMode); document.removeEventListener('keydown', onEscape);
    $('.skip').removeEventListener('click', skip);
    [$('#chapter-eyebrow'), $('#chapter-title'), $('#chapter-body')].forEach((el, i) => { el.innerHTML = original[i]; });
  };
}

function Opening() {
  const root = useRef();
  useLayoutEffect(() => experience(root.current), []);
  return <div ref={root} className="intro-overlay" role="region" aria-label="Introduction Tangkas">
    <div className="intro-meta"><span>TANGKAS / ELECTRIC SERIES</span><button type="button">Lewati intro</button></div>
    <div className="intro-brand-mask"><div className="intro-brand"><span className="brand-mark"><img src="assets/tangkas-logo.png" alt="" /></span><span>TANGKAS<small>MOTOR LISTRIK</small></span></div></div>
    <div className="intro-loading"><div className="intro-progress"><i /></div><span className="intro-loading-label">MENYIAPKAN PERJALANAN</span><span className="sr-only" role="status">Menyiapkan tampilan Tangkas.</span></div>
  </div>;
}
createRoot(document.getElementById('intro-root')).render(<Opening />);
