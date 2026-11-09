import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import { Divider } from './Ornaments.jsx';

const REVEAL_THRESHOLD = 0.38; // reveal the full date after ~38% is scratched

// Heart outline in unit coordinates (0..1) - used for CSS clip, SVG border and canvas.
const HEART_PATH =
  'M0.5 0.93 C0.5 0.93 0.03 0.62 0.03 0.31 C0.03 0.14 0.16 0.04 0.29 0.04 ' +
  'C0.4 0.04 0.47 0.1 0.5 0.19 C0.53 0.1 0.6 0.04 0.71 0.04 ' +
  'C0.84 0.04 0.97 0.14 0.97 0.31 C0.97 0.62 0.5 0.93 0.5 0.93 Z';

function traceHeart(ctx, w, h) {
  ctx.beginPath();
  ctx.moveTo(0.5 * w, 0.93 * h);
  ctx.bezierCurveTo(0.5 * w, 0.93 * h, 0.03 * w, 0.62 * h, 0.03 * w, 0.31 * h);
  ctx.bezierCurveTo(0.03 * w, 0.14 * h, 0.16 * w, 0.04 * h, 0.29 * w, 0.04 * h);
  ctx.bezierCurveTo(0.4 * w, 0.04 * h, 0.47 * w, 0.1 * h, 0.5 * w, 0.19 * h);
  ctx.bezierCurveTo(0.53 * w, 0.1 * h, 0.6 * w, 0.04 * h, 0.71 * w, 0.04 * h);
  ctx.bezierCurveTo(0.84 * w, 0.04 * h, 0.97 * w, 0.14 * h, 0.97 * w, 0.31 * h);
  ctx.bezierCurveTo(0.97 * w, 0.62 * h, 0.5 * w, 0.93 * h, 0.5 * w, 0.93 * h);
  ctx.closePath();
}

// Counts (sampled) opaque pixels of the foil.
function countOpaque(ctx, w, h) {
  const { data } = ctx.getImageData(0, 0, w, h);
  let count = 0;
  for (let i = 3; i < data.length; i += 16) {
    if (data[i] > 128) count += 1;
  }
  return count;
}

function paintFoil(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width * dpr));
  const h = Math.max(1, Math.round(rect.height * dpr));
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, w, h);

  ctx.save();
  traceHeart(ctx, w, h);
  ctx.clip();

  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#b78427');
  grad.addColorStop(0.25, '#f4de98');
  grad.addColorStop(0.5, '#c9a24b');
  grad.addColorStop(0.75, '#f7e7ae');
  grad.addColorStop(1, '#a87a22');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Soft diagonal sheen
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = w * 0.012;
  for (let x = -h; x < w + h; x += w * 0.07) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + h, h);
    ctx.stroke();
  }

  // Tiny glitter specks
  for (let i = 0; i < 450; i += 1) {
    const light = Math.random() > 0.5;
    ctx.fillStyle = light ? 'rgba(255,255,255,0.55)' : 'rgba(120,80,10,0.28)';
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, Math.random() * dpr * 1.4 + 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Hint text
  ctx.fillStyle = 'rgba(105,66,8,0.62)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `600 ${w * 0.058}px Cinzel, Georgia, serif`;
  ctx.fillText('SCRATCH HERE', w / 2, h * 0.42);
  ctx.font = `italic 500 ${w * 0.05}px 'Cormorant Garamond', Georgia, serif`;
  ctx.fillText('to reveal our special day', w / 2, h * 0.5);

  ctx.restore();

  return { ctx, w, h, total: countOpaque(ctx, w, h) };
}

export default function ScratchCard() {
  const canvasRef = useRef(null);
  const stateRef = useRef({ ctx: null, w: 0, h: 0, total: 1 });
  const drawingRef = useRef(false);
  const lastPoint = useRef(null);
  const lastCheck = useRef(0);
  const touchedRef = useRef(false);
  const revealedRef = useRef(false);
  const [revealed, setRevealed] = useState(false);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    stateRef.current = paintFoil(canvas);
  }, []);

  useEffect(() => {
    setup();

    let cancelled = false;
    // Repaint once fonts are ready (only if the visitor has not started scratching).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled && !touchedRef.current) setup();
      });
    }

    let timer = null;
    let lastWidth = canvasRef.current ? canvasRef.current.getBoundingClientRect().width : 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const width = canvas.getBoundingClientRect().width;
        if (Math.abs(width - lastWidth) > 1 && !touchedRef.current) {
          lastWidth = width;
          setup();
        }
      }, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [setup]);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const checkProgress = useCallback(() => {
    const { ctx, w, h, total } = stateRef.current;
    if (!ctx || revealedRef.current) return;
    const remaining = countOpaque(ctx, w, h);
    const scratched = 1 - remaining / Math.max(total, 1);
    if (scratched >= REVEAL_THRESHOLD) {
      revealedRef.current = true;
      setRevealed(true);
    }
  }, []);

  const scratchTo = (point) => {
    const { ctx, w } = stateRef.current;
    if (!ctx) return;
    const radius = w * 0.06;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = radius * 2;
    ctx.beginPath();
    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    } else {
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    lastPoint.current = point;
  };

  const onPointerDown = (event) => {
    if (revealedRef.current) return;
    event.preventDefault();
    drawingRef.current = true;
    touchedRef.current = true;
    lastPoint.current = null;
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch (err) {
      /* pointer capture is optional */
    }
    scratchTo(getPoint(event));
  };

  const onPointerMove = (event) => {
    if (!drawingRef.current) return;
    event.preventDefault();
    scratchTo(getPoint(event));
    const now = Date.now();
    if (now - lastCheck.current > 140) {
      lastCheck.current = now;
      checkProgress();
    }
  };

  const endDrawing = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    lastPoint.current = null;
    checkProgress();
  };

  return (
    <section id="scratch" className="section section-pink">
      {/* Clip path definition for the heart */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="scratch-heart-clip" clipPathUnits="objectBoundingBox">
            <path d={HEART_PATH} />
          </clipPath>
          <linearGradient id="scratch-gold-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e9cf8a" />
            <stop offset="50%" stopColor="#b98a2b" />
            <stop offset="100%" stopColor="#f3dd9a" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">A LITTLE SURPRISE</p>
          <h2 className="section-title">Scratch My Heart</h2>
          <Divider />
          <p className="section-desc">
            A little surprise is waiting for you. Scratch the golden heart to discover our special day.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className={`scratch-wrap ${revealed ? 'is-revealed' : ''}`}>
            <div className="heart-shadow">
              <div className="heart-stage">
                <div className="heart-date">
                  <span className="hd-label">OUR SPECIAL DAY</span>
                  <span className="hd-day">12</span>
                  <span className="hd-month">DECEMBER</span>
                  <span className="hd-year">2026</span>
                </div>
                <canvas
                  ref={canvasRef}
                  className={`scratch-canvas ${revealed ? 'is-hidden' : ''}`}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrawing}
                  onPointerCancel={endDrawing}
                  aria-label="Golden scratch foil covering a heart. Scratch to reveal the date."
                />
              </div>
              <svg className="heart-outline" viewBox="0 0 1 1" aria-hidden="true">
                <path d={HEART_PATH} fill="none" stroke="url(#scratch-gold-stroke)" strokeWidth="0.014" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p className="scratch-hint">
            {revealed ? 'We would love to celebrate it with you.' : 'Scratch with your mouse or finger'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
