// GSAP owns progress; this renderer only decodes and draws nearby WebP frames.
export function createSequence(manifest, stage, mobile) {
  const canvas = document.querySelector('#sequence');
  const ctx = canvas.getContext('2d');
  if (!ctx) return {seek() {}, destroy() {}};
  const cache = new Map(), pending = new Set(), attempts = new Map();
  const controller = new AbortController();
  let target = manifest.startFrame || 0, active = 0, queue = [], disposed = false, last = -1;
  const compact = mobile.matches;
  const limit = compact ? 8 : navigator.deviceMemory && navigator.deviceMemory <= 4 ? 10 : 18;
  function draw(index) {
    const img = cache.get(index);
    if (!img || disposed) return;
    const w = stage.clientWidth, h = stage.clientHeight;
    const dpr = Math.min(devicePixelRatio || 1, mobile.matches ? 1 : 1.5);
    const cw = Math.round(w * dpr), ch = Math.round(h * dpr);
    if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scale = mobile.matches ? Math.max(w / img.width, h * .64 / img.height) : Math.max(w / img.width, h / img.height);
    const x = (w - img.width * scale) * (mobile.matches ? .76 : .65);
    const y = mobile.matches ? h * .38 : (h - img.height * scale) / 2;
    ctx.fillStyle = '#111310'; ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    canvas.classList.add('ready'); last = index;
  }
  function evict() {
    while (cache.size > limit) {
      const far = [...cache.keys()].sort((a, b) => Math.abs(b - target) - Math.abs(a - target))[0];
      cache.get(far)?.close?.(); cache.delete(far);
    }
  }
  function pump() {
    while (active < 3 && queue.length && !disposed) {
      const index = queue.shift();
      if (cache.has(index) || pending.has(index) || (attempts.get(index) || 0) >= 2) continue;
      active++; pending.add(index); attempts.set(index, (attempts.get(index) || 0) + 1);
      const pattern = compact && manifest.mobilePattern ? manifest.mobilePattern : manifest.pattern;
      fetch(pattern.replace('{index}', String(index).padStart(4, '0')), {signal: controller.signal})
        .then(r => { if (!r.ok) throw Error('frame'); return r.blob(); })
        .then(blob => createImageBitmap(blob))
        .then(img => {
          if (disposed) { img.close(); return; }
          attempts.delete(index); cache.set(index, img); evict();
          if (index === target || last < 0) draw(index);
        }).catch(() => {}).finally(() => { active--; pending.delete(index); pump(); });
    }
  }
  function request(index) {
    if (disposed) return;
    target = index;
    if (cache.has(index)) { if (last !== index) draw(index); }
    else if (cache.size) {
      const closest = [...cache.keys()].sort((a, b) => Math.abs(a - index) - Math.abs(b - index))[0];
      if (closest !== last) draw(closest);
    }
    const step = compact ? 2 : 1;
    queue = [index];
    for (let d = 1; d <= (compact ? 2 : 5); d++) {
      if (index + d * step < manifest.count) queue.push(index + d * step);
      if (index - d * step >= manifest.startFrame) queue.push(index - d * step);
    }
    pump();
  }
  const resize = () => { if (last >= 0) draw(last); };
  addEventListener('resize', resize);
  request(target);
  return {
    seek(progress) {
      const travel = progress < .12 ? 0 : progress < .48 ? (progress - .12) / .36 * .56 : progress < .58 ? .56 : Math.min(1, .56 + (progress - .58) / .36 * .44);
      const step = compact ? 2 : 1;
      request(Math.min(manifest.count - 1, Math.round((manifest.startFrame + travel * (manifest.count - 1 - manifest.startFrame)) / step) * step));
    },
    destroy() {
      disposed = true; controller.abort(); removeEventListener('resize', resize);
      for (const img of cache.values()) img.close?.(); cache.clear(); canvas.classList.remove('ready');
    }
  };
}
