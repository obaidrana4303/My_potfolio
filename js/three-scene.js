'use strict';

/* ══════════════════════════════════════════════════
   THREE.JS — INTERACTIVE NEURAL NETWORK PARTICLE SYSTEM
   - Blurred background (CSS filter on canvas)
   - Mouse-interactive: particles near cursor form more connections
══════════════════════════════════════════════════ */
(function initThreeJS() {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const W = canvas.clientWidth || window.innerWidth;
  const H = canvas.clientHeight || window.innerHeight;
  const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 1000);
  camera.position.set(0, 0, 5.5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // ── Particles ──
  const N = 110; // More particles for a denser network
  const COLORS = [0x00f5d4, 0x00f5d4, 0x00f5d4, 0xf72585, 0x4cc9f0, 0xffd60a];
  const particles = Array.from({ length: N }, () => ({
    pos: new THREE.Vector3(
      (Math.random() - .5) * 11,
      (Math.random() - .5) * 7.5,
      (Math.random() - .5) * 2.5
    ),
    vel: new THREE.Vector3(
      (Math.random() - .5) * 0.004,
      (Math.random() - .5) * 0.003,
      (Math.random() - .5) * 0.001
    ),
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  }));

  // Points geometry
  const ptGeo = new THREE.BufferGeometry();
  const ptPos = new Float32Array(N * 3);
  const ptAttr = new THREE.BufferAttribute(ptPos, 3);
  ptAttr.setUsage(THREE.DynamicDrawUsage);
  ptGeo.setAttribute('position', ptAttr);

  const ptMat = new THREE.PointsMaterial({
    color: 0x00f5d4, size: 0.055,
    transparent: true, opacity: 0.75,
    sizeAttenuation: true
  });
  scene.add(new THREE.Points(ptGeo, ptMat));

  // Lines geometry — pre-allocate max possible pairs
  const MAX_PAIRS = N * (N - 1);
  const linePos = new Float32Array(MAX_PAIRS * 6);
  const lnGeo = new THREE.BufferGeometry();
  const lnAttr = new THREE.BufferAttribute(linePos, 3);
  lnAttr.setUsage(THREE.DynamicDrawUsage);
  lnGeo.setAttribute('position', lnAttr);
  lnGeo.setDrawRange(0, 0);

  const lnMat = new THREE.LineBasicMaterial({
    color: 0x00f5d4, transparent: true, opacity: 0.1
  });
  const lineSegs = new THREE.LineSegments(lnGeo, lnMat);
  scene.add(lineSegs);

  // ── Secondary accent geometry (rotating wire torus) ──
  const torusGeo = new THREE.TorusGeometry(1.6, 0.008, 8, 80);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x00f5d4, transparent: true, opacity: 0.07 });
  const torus1 = new THREE.Mesh(torusGeo, torusMat);
  torus1.rotation.x = Math.PI / 3;
  scene.add(torus1);

  const torus2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.4, 0.005, 6, 90),
    new THREE.MeshBasicMaterial({ color: 0x4cc9f0, transparent: true, opacity: 0.04 })
  );
  torus2.rotation.y = Math.PI / 4;
  scene.add(torus2);

  // ── Mouse tracking (for camera + interactive connections) ──
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  // Mouse position in normalized 3D scene coordinates for proximity check
  let mouseScene = new THREE.Vector3(0, 0, 0);

  document.addEventListener('mousemove', e => {
    targetX = (e.clientX / window.innerWidth - .5) * 0.6;
    targetY = -(e.clientY / window.innerHeight - .5) * 0.5;

    // Convert mouse screen position to approximate 3D scene coordinates
    // Map from [0, width] → [-BX, BX] and [0, height] → [BY, -BY]
    mouseScene.x = (e.clientX / window.innerWidth - 0.5) * 11;
    mouseScene.y = -(e.clientY / window.innerHeight - 0.5) * 7.5;
    mouseScene.z = 0;
  });

  // ── Bounds ──
  const BX = 5.5, BY = 3.8, BZ = 1.2;
  const CONNECT_DIST = 2.2;        // Base connection distance (slightly tighter)
  const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
  const INTERACT_RADIUS = 3.5;     // Radius around cursor for enhanced connections
  const INTERACT_RADIUS_SQ = INTERACT_RADIUS * INTERACT_RADIUS;
  const INTERACT_CONNECT = 4.2;    // Extended connection range near the cursor
  const INTERACT_CONNECT_SQ = INTERACT_CONNECT * INTERACT_CONNECT;

  // ── Animation loop ──
  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);

    // Smooth camera lerp
    curX += (targetX - curX) * 0.025;
    curY += (targetY - curY) * 0.025;
    camera.position.x = curX;
    camera.position.y = curY;
    camera.lookAt(scene.position);

    // Rotate tori
    torus1.rotation.z += 0.0015;
    torus2.rotation.x += 0.001;
    torus2.rotation.y += 0.0008;

    // Update particles — gently attract nearby particles toward cursor
    for (let i = 0; i < N; i++) {
      const p = particles[i];
      p.pos.addScaledVector(p.vel, 1);

      // Gentle attraction toward mouse for particles within interact radius
      const dmx = mouseScene.x - p.pos.x;
      const dmy = mouseScene.y - p.pos.y;
      const distMouse = dmx * dmx + dmy * dmy;
      if (distMouse < INTERACT_RADIUS_SQ && distMouse > 0.1) {
        const pull = 0.0003; // Very subtle pull
        p.pos.x += dmx * pull;
        p.pos.y += dmy * pull;
      }

      if (p.pos.x > BX || p.pos.x < -BX) p.vel.x *= -1;
      if (p.pos.y > BY || p.pos.y < -BY) p.vel.y *= -1;
      if (p.pos.z > BZ || p.pos.z < -BZ) p.vel.z *= -1;
      ptPos[i * 3] = p.pos.x;
      ptPos[i * 3 + 1] = p.pos.y;
      ptPos[i * 3 + 2] = p.pos.z;
    }
    ptAttr.needsUpdate = true;

    // Rebuild connection lines — enhanced near the cursor
    let li = 0;
    for (let i = 0; i < N; i++) {
      const pi = particles[i].pos;

      // Check if particle i is near the mouse
      const diX = pi.x - mouseScene.x;
      const diY = pi.y - mouseScene.y;
      const iNearMouse = (diX * diX + diY * diY) < INTERACT_RADIUS_SQ;

      for (let j = i + 1; j < N; j++) {
        const pj = particles[j].pos;
        const dx = pi.x - pj.x, dy = pi.y - pj.y, dz = pi.z - pj.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        // Use extended connection range if either particle is near mouse
        let shouldConnect = distSq < CONNECT_DIST_SQ;
        if (!shouldConnect && iNearMouse) {
          const djX = pj.x - mouseScene.x;
          const djY = pj.y - mouseScene.y;
          const jNearMouse = (djX * djX + djY * djY) < INTERACT_RADIUS_SQ;
          if (jNearMouse) {
            shouldConnect = distSq < INTERACT_CONNECT_SQ;
          }
        }

        if (shouldConnect) {
          linePos[li++] = pi.x; linePos[li++] = pi.y; linePos[li++] = pi.z;
          linePos[li++] = pj.x; linePos[li++] = pj.y; linePos[li++] = pj.z;
        }
      }
    }
    lnGeo.setDrawRange(0, li / 3);
    lnAttr.needsUpdate = true;

    renderer.render(scene, camera);
  }
  animate();

  // ── Resize handler ──
  window.addEventListener('resize', () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // ── Stop animation when hero not visible (perf) ──
  const heroObs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!frameId) animate(); }
    else { cancelAnimationFrame(frameId); frameId = null; }
  }, { threshold: 0 });
  heroObs.observe(document.getElementById('home'));
})();
