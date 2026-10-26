import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MOB } from '../config';

// 3D apartment building on the hero. Drag to rotate; idles with a slow spin.
export default function HeroScene() {
  const canvasRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    let R, raf, cleanup = () => {};
    try {
      R = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: !MOB, powerPreference: 'high-performance' });
      const S = new THREE.Scene(), C = new THREE.PerspectiveCamera(38, 1, .1, 100);
      R.setPixelRatio(MOB ? Math.min(devicePixelRatio, 1.25) : Math.min(devicePixelRatio, 2));
      R.outputEncoding = THREE.sRGBEncoding; R.toneMapping = THREE.ACESFilmicToneMapping; R.toneMappingExposure = 1.05;
      if (!MOB) { R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap; } else { R.shadowMap.enabled = false; }
      C.position.set(0, 4.6, 14.5); C.lookAt(0, 3.2, 0); S.fog = new THREE.Fog(0x06110c, 19, 36);

      // golden-hour sky used only for realistic glass / metal reflections
      const sc = document.createElement('canvas'); sc.width = 8; sc.height = 256;
      const sx = sc.getContext('2d'), sd = sx.createLinearGradient(0, 0, 0, 256);
      [[0, '#15305a'], [.45, '#6f8fb8'], [.62, '#f2b072'], [.7, '#4a4036'], [1, '#1a1a18']].forEach(s => sd.addColorStop(s[0], s[1]));
      sx.fillStyle = sd; sx.fillRect(0, 0, 8, 256);
      const es = new THREE.Scene();
      es.add(new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(sc), side: THREE.BackSide })));
      S.environment = new THREE.PMREMGenerator(R).fromScene(es).texture;

      S.add(new THREE.HemisphereLight(0xbcd0ff, 0x2a3a2a, .45));
      const sun = new THREE.DirectionalLight(0xffd9a8, 2.4); sun.position.set(7, 9, 8);
      if (!MOB) {
        sun.castShadow = true; const sh = sun.shadow; sh.mapSize.set(2048, 2048);
        sh.camera.left = sh.camera.bottom = -10; sh.camera.right = sh.camera.top = 10; sh.camera.near = 1; sh.camera.far = 40; sh.bias = -.0005;
      }
      S.add(sun);
      const PL = new THREE.PointLight(0xffc27a, 1.1, 7); PL.position.set(0, 1.4, 2.8); S.add(PL);
      const G = new THREE.Group(); S.add(G);

      const M = (k, r, m) => new THREE.MeshStandardMaterial({ color: k, roughness: r == null ? .75 : r, metalness: m || 0 }),
        conc = M(0xcfc9b8, .85), stone = M(0xb8b0a0, .8), dark = M(0x34383b, .6, .2), white = M(0xf2f2ee, .5), wood = M(0x7a4f2d, .6),
        plant = M(0x2f7a45, .9), roof = M(0x8c8a84, .9), solar = M(0x14284a, .3, .7), asph = M(0x2b2d2f, .95),
        rail = new THREE.MeshPhysicalMaterial({ color: 0xbfe3f0, transparent: true, opacity: .3, roughness: .05, metalness: 0 }),
        glow = new THREE.MeshStandardMaterial({ color: 0xffdf9a, emissive: 0xffb347, emissiveIntensity: 1.3 }),
        tx = (cv, s) => { const t = new THREE.CanvasTexture(cv); t.anisotropy = R.capabilities.getMaxAnisotropy(); if (s) t.encoding = THREE.sRGBEncoding; return t; },
        bx = (w, h, d, m, x, y, z, g) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; (g || G).add(o); return o; };

      // facade texture: concrete wall, framed glass windows with reflections, some lit from inside
      function fac(cols, fl, seed) {
        const W = cols * 64, H = fl * 64, a = document.createElement('canvas'), e = document.createElement('canvas');
        a.width = e.width = W; a.height = e.height = H;
        const g = a.getContext('2d'), h = e.getContext('2d');
        g.fillStyle = '#d8d2c2'; g.fillRect(0, 0, W, H); h.fillStyle = '#000'; h.fillRect(0, 0, W, H);
        for (let i = 0; i < 900; i++) { g.fillStyle = 'rgba(90,80,60,' + Math.random() * .06 + ')'; g.fillRect(Math.random() * W, Math.random() * H, 2, 2); }
        for (let r = 0; r < fl; r++) {
          g.fillStyle = '#bdb6a3'; g.fillRect(0, r * 64 + 60, W, 4);
          for (let k = 0; k < cols; k++) {
            const x = k * 64 + 9, y = r * 64 + 10, lit = ((r * 7 + k * 13 + seed) % 5) < 2, gr = g.createLinearGradient(x, y, x + 46, y + 44);
            gr.addColorStop(0, '#6b94b6'); gr.addColorStop(.5, '#2b4a66'); gr.addColorStop(1, '#16293b'); g.fillStyle = gr; g.fillRect(x, y, 46, 44);
            g.strokeStyle = '#2b2b2b'; g.lineWidth = 3; g.strokeRect(x, y, 46, 44); g.beginPath(); g.moveTo(x + 23, y); g.lineTo(x + 23, y + 44); g.stroke();
            if (lit) { h.fillStyle = '#ffc46b'; h.fillRect(x + 2, y + 2, 43, 41); g.fillStyle = '#e9b86a'; g.fillRect(x + 2, y + 2, 43, 41); }
          }
        }
        return new THREE.MeshStandardMaterial({ map: tx(a, 1), emissiveMap: tx(e, 1), emissive: 0xffffff, emissiveIntensity: .9, roughness: .45, metalness: .25 });
      }

      function tower(w, d, fl, cx, cz, seed, main) {
        const fh = .7, h = fl * fh, sm = fac(Math.max(2, Math.round(d / .8)), fl, seed), fm = fac(Math.max(2, Math.round(w / .8)), fl, seed + 3);
        bx(w, h, d, [sm, sm, roof, roof, fm, fm], cx, h / 2, cz);
        [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(p => bx(.12, h + .04, .12, stone, cx + p[0] * w / 2, h / 2, cz + p[1] * d / 2));
        for (let f = 1; f < fl; f += 2) {
          bx(w * .7, .07, .6, conc, cx, f * fh + .035, cz + d / 2 + .3);
          bx(w * .7, .24, .03, rail, cx, f * fh + .19, cz + d / 2 + .58);
          bx(.5, .12, .2, plant, cx - w * .25, f * fh + .13, cz + d / 2 + .45);
        }
        bx(w + .1, .18, .06, conc, cx, h + .09, cz + d / 2); bx(w + .1, .18, .06, conc, cx, h + .09, cz - d / 2);
        bx(.06, .18, d + .1, conc, cx + w / 2, h + .09, cz); bx(.06, .18, d + .1, conc, cx - w / 2, h + .09, cz);
        bx(w * .35, .45, d * .35, conc, cx - w * .15, h + .3, cz - d * .1);
        const tk = new THREE.Mesh(new THREE.CylinderGeometry(.28, .28, .5, 20), white); tk.position.set(cx + w * .25, h + .35, cz - d * .2); tk.castShadow = true; G.add(tk);
        if (main) {
          bx(.45, h, .08, dark, cx + w * .32, h / 2, cz + d / 2 + .04);
          for (let i = -1; i <= 1; i++) bx(.8, .04, .5, solar, cx + i * .95, h + .24, cz + d * .28).rotation.x = -.45;
          bx(1.7, .08, 1, wood, 0, .95, d / 2 + .5); bx(1, .75, .05, glow, 0, .42, d / 2 + .03); bx(1.6, .06, .5, conc, 0, .03, d / 2 + .4); bx(1.9, .04, .8, conc, 0, .02, d / 2 + .6);
        }
      }
      tower(3.2, 3, 10, 0, 0, 1, 1); tower(2.2, 2.4, 6, -3.2, .3, 5); tower(1.8, 2.2, 4, 2.9, .3, 9);

      // ground, driveway, hedges
      const gc = document.createElement('canvas'); gc.width = gc.height = 256; const gx = gc.getContext('2d');
      gx.fillStyle = '#24592f'; gx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 3000; i++) { gx.fillStyle = 'hsl(' + (105 + Math.random() * 25) + ',45%,' + (14 + Math.random() * 14) + '%)'; gx.fillRect(Math.random() * 256, Math.random() * 256, 2, 3); }
      const gt = tx(gc, 1); gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.repeat.set(5, 5);
      const gr = new THREE.Mesh(new THREE.CylinderGeometry(7.6, 7.6, .2, 64), new THREE.MeshStandardMaterial({ map: gt, roughness: 1 })); gr.position.y = -.1; gr.receiveShadow = true; G.add(gr);
      const rg = new THREE.Mesh(new THREE.RingGeometry(7.4, 7.6, 64), new THREE.MeshBasicMaterial({ color: 0xe0b85a, side: THREE.DoubleSide })); rg.rotation.x = -Math.PI / 2; rg.position.y = .01; G.add(rg);
      bx(2.4, .05, 5.2, asph, 0, .025, 4.2); for (let i = 0; i < 4; i++) bx(.08, .01, .5, white, 0, .055, 2.6 + i * 1.1);
      [-1.5, 1.5].forEach(s => { bx(.5, .35, 5.2, M(0x1f6b3a, .95), s * 1.55, .18, 4.2); });

      function car(x, z, col, ry) {
        const g = new THREE.Group(), cm = M(col, .25, .6);
        bx(1, .22, .46, cm, 0, .2, 0, g); bx(.55, .2, .4, rail, -.05, .4, 0, g);
        [[-.32, -.22], [.32, -.22], [-.32, .22], [.32, .22]].forEach(p => {
          const w = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .06, 14), dark); w.rotation.x = Math.PI / 2; w.position.set(p[0], .09, p[1]); g.add(w);
        });
        g.position.set(x, 0, z); g.rotation.y = ry; G.add(g);
      }
      car(-1.05, 3.4, 0xb3202a, Math.PI / 2); car(1.05, 4.6, 0xe8e8e8, -Math.PI / 2);

      function tree(x, z, s) {
        const g = new THREE.Group(), t = new THREE.Mesh(new THREE.CylinderGeometry(.05 * s, .08 * s, .7 * s, 8), M(0x5a3d22));
        t.position.y = .35 * s; t.castShadow = true; g.add(t);
        [[0, 1.05, 0, .5], [.2, .8, .1, .38], [-.2, .85, -.1, .4]].forEach((p, i) => {
          const f = new THREE.Mesh(new THREE.IcosahedronGeometry(p[3] * s, 1), M([0x2f8f4e, 0x26763f, 0x3a9f58][i], .95));
          f.position.set(p[0] * s, p[1] * s, p[2] * s); f.castShadow = true; g.add(f);
        });
        g.position.set(x, 0, z); G.add(g);
      }
      [[-4.8, 3], [4.8, 3.2], [-5.6, -.5], [5.7, -.8], [-3.4, -3.6], [3.6, -3.8], [-5, 5], [5, 5.4], [0, -5.2]].forEach((p, i) => tree(p[0], p[1], .9 + (i % 3) * .25));
      [[-3.2, 2.6], [3.2, 2.6], [-3.9, 5.2], [3.9, 5.2]].forEach(p => {
        bx(.04, 1.2, .04, dark, p[0], .6, p[1]);
        const l = new THREE.Mesh(new THREE.SphereGeometry(.08, 12, 8), glow); l.position.set(p[0], 1.25, p[1]); G.add(l);
      });

      // drag-to-rotate with inertia
      let ry = .5, rx = 0, vy = 0, dr = false, lx = 0, ly = 0;
      const down = e => {
        dr = true; lx = e.clientX; ly = e.clientY; vy = 0; c.setPointerCapture(e.pointerId); c.style.cursor = 'grabbing';
        if (hintRef.current) hintRef.current.style.opacity = 0;
      };
      const move = e => {
        if (!dr) return;
        const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
        vy = dx * .008; ry += vy; rx = Math.max(-.12, Math.min(.3, rx + dy * .004));
      };
      const up = () => { dr = false; c.style.cursor = 'grab'; };
      c.addEventListener('pointerdown', down);
      c.addEventListener('pointermove', move);
      c.addEventListener('pointerup', up);
      c.addEventListener('pointercancel', up);

      const rs = () => { const w = c.clientWidth, h = c.clientHeight; R.setSize(w, h, false); C.aspect = w / h; C.updateProjectionMatrix(); };
      rs(); window.addEventListener('resize', rs);

      // pause rendering while off-screen or the tab is hidden
      let isVisible = true, vObs;
      if ('IntersectionObserver' in window) {
        vObs = new IntersectionObserver(entries => { isVisible = entries[0].isIntersecting; }, { threshold: 0.05 });
        vObs.observe(c);
      }
      const vis = () => { isVisible = !document.hidden; };
      document.addEventListener('visibilitychange', vis);

      (function a() {
        if (isVisible) {
          if (!dr) { ry += vy; vy *= .95; if (Math.abs(vy) < .0015) ry += .003; rx *= .97; }
          G.rotation.y = ry; G.rotation.x = rx; R.render(S, C);
        }
        raf = requestAnimationFrame(a);
      })();

      cleanup = () => {
        cancelAnimationFrame(raf);
        c.removeEventListener('pointerdown', down);
        c.removeEventListener('pointermove', move);
        c.removeEventListener('pointerup', up);
        c.removeEventListener('pointercancel', up);
        window.removeEventListener('resize', rs);
        document.removeEventListener('visibilitychange', vis);
        if (vObs) vObs.disconnect();
        S.traverse(o => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) [].concat(o.material).forEach(m => { if (m.map) m.map.dispose(); if (m.emissiveMap) m.emissiveMap.dispose(); m.dispose(); });
        });
        R.dispose();
      };
    } catch (e) {
      console.error('3D scene failed:', e);
      c.style.display = 'none';
    }
    return () => cleanup();
  }, []);

  return (
    <div className="stage">
      <canvas id="c3" ref={canvasRef} aria-label="3D apartment building. Drag to rotate." />
      <span className="hint" ref={hintRef}>↔ Drag to rotate</span>
      <span className="fc f1">✓ RERA-checked</span>
      <span className="fc f2">📍 Ranchi only</span>
      <span className="fc f3">★ Honest pricing</span>
    </div>
  );
}
