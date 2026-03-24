/**
 * Elegant floating bokeh lights — soft, warm ambient orbs
 * that drift slowly, creating a premium feel.
 * Respects prefers-reduced-motion and pauses when tab is hidden.
 */
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const COUNT = 12;
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        inset: '0',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '0',
        opacity: '0',
        transition: 'opacity 2s ease',
    });
    document.body.prepend(canvas);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => { canvas.style.opacity = '1'; });
    });

    const ctx = canvas.getContext('2d');
    let w, h, orbs = [], animId;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createOrb() {
        const size = Math.random() * 60 + 30; // 30–90px radius
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            r: size,
            vx: (Math.random() - 0.5) * 0.12,
            vy: (Math.random() - 0.5) * 0.08,
            baseAlpha: Math.random() * 0.025 + 0.01,  // very soft: 0.01–0.035
            phase: Math.random() * Math.PI * 2,
            phaseSpeed: Math.random() * 0.003 + 0.001,
            // Warm golden-brown tones matching site palette
            hue: Math.random() * 20 + 25,  // 25–45 (warm gold range)
            sat: Math.random() * 20 + 30,  // 30–50%
        };
    }

    function init() {
        resize();
        orbs = [];
        for (let i = 0; i < COUNT; i++) orbs.push(createOrb());
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        for (const o of orbs) {
            o.phase += o.phaseSpeed;
            const breathe = 0.5 + 0.5 * Math.sin(o.phase);
            const alpha = o.baseAlpha * (0.4 + 0.6 * breathe);

            // Soft radial gradient orb
            const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
            grad.addColorStop(0, `hsla(${o.hue}, ${o.sat}%, 55%, ${alpha * 1.5})`);
            grad.addColorStop(0.4, `hsla(${o.hue}, ${o.sat}%, 50%, ${alpha * 0.6})`);
            grad.addColorStop(1, `hsla(${o.hue}, ${o.sat}%, 45%, 0)`);

            ctx.beginPath();
            ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            // Drift
            o.x += o.vx;
            o.y += o.vy;

            // Gentle bounce off edges (keeps orbs distributed)
            if (o.x < -o.r) o.x = w + o.r;
            if (o.x > w + o.r) o.x = -o.r;
            if (o.y < -o.r) o.y = h + o.r;
            if (o.y > h + o.r) o.y = -o.r;
        }

        animId = requestAnimationFrame(draw);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animId);
        else draw();
    });

    window.addEventListener('resize', resize);

    init();
    draw();
})();
