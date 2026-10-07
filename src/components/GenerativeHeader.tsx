import { useEffect, useRef } from 'react';

type Mode =
  | 'bar'
  | 'rings'
  | 'nestedSquares'
  | 'squareGrid'
  | 'wave'
  | 'dotGrid'
  | 'dashed'
  | 'verticalLines'
  | 'horizontalLines'
  | 'circleChain'
  | 'zigzag'
  | 'portrait';

interface Point {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  radius?: number;
}

interface Shape {
  points: Point[];
  width: number;
  dash: number[];
  closed: boolean;
  straight: boolean;
  opacity: number;
}

interface Burst {
  x: number;
  y: number;
  radius: number;
  speed: number;
  force: number;
  life: number;
}

const INK = '#1C1917';
const UMBER = '#78350F';


const MODES: Mode[] = [
  'bar',
  'rings',
  'nestedSquares',
  'squareGrid',
  'wave',
  'dotGrid',
  'dashed',
  'verticalLines',
  'horizontalLines',
  'circleChain',
  'zigzag',
  'portrait',
];

export const GenerativeHeader = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const changePatternRef = useRef<() => void>(() => undefined);
  const burstRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 1;
    let H = 1;
    let DPR = 1;
    let mode: Mode = 'bar';
    let shapes: Shape[] = [];
    let dots: Point[] = [];
    let bursts: Burst[] = [];
    let animId: number | null = null;
    let isMounted = true;

    const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = Boolean(reducedMotionQuery?.matches);

    const pointer = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
      down: false,
      radius: 145,
    };

    const makePoint = (x: number, y: number): Point => ({
      x,
      y,
      homeX: x,
      homeY: y,
      vx: 0,
      vy: 0,
    });

    const addShape = (
      points: Point[],
      options: Partial<Pick<Shape, 'width' | 'dash' | 'closed' | 'straight' | 'opacity'>> = {},
    ) => {
      shapes.push({
        points,
        width: options.width ?? 2,
        dash: options.dash ?? [],
        closed: options.closed ?? false,
        straight: options.straight ?? false,
        opacity: options.opacity ?? 0.88,
      });
    };

    const forEachPoint = (callback: (point: Point) => void) => {
      for (const shape of shapes) {
        for (const point of shape.points) callback(point);
      }
      for (const point of dots) callback(point);
    };

    const squarePath = (cx: number, cy: number, halfSize: number, samples = 14) => {
      const points: Point[] = [];
      const corners = [
        [cx - halfSize, cy - halfSize],
        [cx + halfSize, cy - halfSize],
        [cx + halfSize, cy + halfSize],
        [cx - halfSize, cy + halfSize],
        [cx - halfSize, cy - halfSize],
      ];

      for (let side = 0; side < 4; side += 1) {
        const a = corners[side];
        const b = corners[side + 1];
        for (let i = 0; i < samples; i += 1) {
          const t = i / samples;
          points.push(makePoint(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t));
        }
      }

      points.push(makePoint(corners[4][0], corners[4][1]));
      return points;
    };

    const ellipsePath = (cx: number, cy: number, rx: number, ry: number, samples = 72) => {
      const points: Point[] = [];
      for (let i = 0; i <= samples; i += 1) {
        const angle = (i / samples) * Math.PI * 2;
        points.push(makePoint(cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry));
      }
      return points;
    };

    const linePath = (x1: number, y1: number, x2: number, y2: number, samples = 28) => {
      const points: Point[] = [];
      for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        points.push(makePoint(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t));
      }
      return points;
    };

    const bezierPath = (
      p0: [number, number],
      p1: [number, number],
      p2: [number, number],
      p3: [number, number],
      samples = 36,
    ) => {
      const points: Point[] = [];
      for (let i = 0; i <= samples; i += 1) {
        const t = i / samples;
        const mt = 1 - t;
        const x =
          mt * mt * mt * p0[0] +
          3 * mt * mt * t * p1[0] +
          3 * mt * t * t * p2[0] +
          t * t * t * p3[0];
        const y =
          mt * mt * mt * p0[1] +
          3 * mt * mt * t * p1[1] +
          3 * mt * t * t * p2[1] +
          t * t * t * p3[1];
        points.push(makePoint(x, y));
      }
      return points;
    };

    const createBar = () => {
      const count = Math.max(100, Math.floor(W / 7));
      const points: Point[] = [];
      for (let i = 0; i < count; i += 1) {
        points.push(makePoint((i / (count - 1)) * W, H / 2));
      }
      addShape(points, { width: Math.max(90, Math.min(176, H * 0.4)), opacity: 0.94 });
    };

    const createRings = () => {
      const count = 7;
      const maxRadiusX = Math.min(W * 0.37, H * 0.78);
      for (let ring = 1; ring <= count; ring += 1) {
        const rx = (maxRadiusX * ring) / count;
        addShape(ellipsePath(W / 2, H / 2, rx, rx * 0.48, 96), {
          closed: true,
          width: ring === count ? 2.4 : 1.6,
          opacity: 0.78 + ring * 0.02,
        });
      }
    };

    const createNestedSquares = () => {
      const count = 8;
      const maxHalf = Math.min(W * 0.27, H * 0.42);
      for (let i = 1; i <= count; i += 1) {
        addShape(squarePath(W / 2, H / 2, (maxHalf * i) / count, 14), {
          closed: true,
          straight: true,
          width: i === count ? 2.4 : 1.5,
          opacity: 0.82,
        });
      }
    };

    const createSquareGrid = () => {
      const columns = Math.max(7, Math.min(16, Math.round(W / 76)));
      const rows = Math.max(3, Math.min(6, Math.round(H / 78)));
      const gapX = W / columns;
      const gapY = (H * 0.56) / rows;
      const half = Math.min(gapX, gapY) * 0.3;
      const top = H / 2 - ((rows - 1) * gapY) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          addShape(squarePath(gapX * (column + 0.5), top + row * gapY, half, 5), {
            closed: true,
            straight: true,
            width: 1.4,
            opacity: 0.76,
          });
        }
      }
    };

    const createWave = () => {
      const count = Math.max(120, Math.floor(W / 5));
      const cycles = 11 + Math.random() * 6;
      const amplitude = H * 0.2;
      const points: Point[] = [];
      for (let i = 0; i < count; i += 1) {
        const t = i / (count - 1);
        points.push(makePoint(t * W, H / 2 + Math.sin(t * Math.PI * 2 * cycles) * amplitude));
      }
      addShape(points, { width: 2.2, opacity: 0.9 });
    };

    const createDotGrid = () => {
      const spacingX = W < 520 ? 24 : 27;
      const spacingY = 27;
      const rows = Math.max(5, Math.min(8, Math.round(H / 52)));
      const columns = Math.max(8, Math.floor((W - 20) / spacingX));
      const top = H / 2 - ((rows - 1) * spacingY) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const point = makePoint(10 + column * spacingX, top + row * spacingY);
          point.radius = W < 520 ? 3.6 : 4.4;
          dots.push(point);
        }
      }
    };

    const createDashed = () => {
      addShape(linePath(W * 0.06, H * 0.72, W * 0.94, H * 0.28, Math.max(90, Math.floor(W / 8))), {
        width: 3.2,
        dash: [24, 16],
        straight: true,
        opacity: 0.9,
      });
    };

    const createVerticalLines = () => {
      const count = Math.max(13, Math.min(30, Math.round(W / 40)));
      for (let line = 0; line < count; line += 1) {
        const x = (line / (count - 1)) * W;
        addShape(linePath(x, H * 0.24, x, H * 0.76, 22), {
          width: 1.45,
          straight: true,
          opacity: 0.73,
        });
      }
    };

    const createHorizontalLines = () => {
      const count = 10;
      for (let row = 0; row < count; row += 1) {
        const y = H * 0.28 + (row / (count - 1)) * H * 0.44;
        addShape(linePath(0, y, W, y, Math.max(60, Math.floor(W / 11))), {
          width: 1.45,
          straight: true,
          opacity: 0.73,
        });
      }
    };

    const createCircleChain = () => {
      const count = Math.max(7, Math.min(18, Math.round(W / 64)));
      const radius = Math.min(24, (W / count) * 0.3, H * 0.1);
      for (let circle = 0; circle < count; circle += 1) {
        const cx = (circle + 0.5) * (W / count);
        addShape(ellipsePath(cx, H / 2, radius, radius, 38), {
          closed: true,
          width: 1.7,
          opacity: 0.82,
        });
      }
    };

    const createZigzag = () => {
      const peaks = Math.max(9, Math.min(19, Math.round(W / 60)));
      const points: Point[] = [];
      for (let i = 0; i <= peaks; i += 1) {
        points.push(makePoint((i / peaks) * W, i % 2 ? H * 0.69 : H * 0.31));
      }
      addShape(points, { width: 2.3, straight: true, opacity: 0.9 });
    };

    const createPortrait = () => {
      const scale = Math.min(W / 620, H / 430);
      const ox = W / 2;
      const oy = H / 2;
      const map = (x: number, y: number): [number, number] => [ox + x * scale, oy + y * scale];

      addShape(ellipsePath(ox, oy - 10 * scale, 112 * scale, 150 * scale, 88), {
        closed: true,
        width: 2.2,
        opacity: 0.88,
      });
      addShape(bezierPath(map(-92, -82), map(-36, -146), map(70, -144), map(108, -60), 42), {
        width: 2.5,
        opacity: 0.92,
      });
      addShape(bezierPath(map(-84, -48), map(-42, -74), map(-8, -62), map(22, -42), 30), {
        width: 1.5,
        opacity: 0.78,
      });
      addShape(bezierPath(map(24, -42), map(58, -64), map(87, -55), map(98, -31), 30), {
        width: 1.5,
        opacity: 0.78,
      });
      addShape(bezierPath(map(-58, -26), map(-40, -38), map(-16, -38), map(0, -24), 24), {
        width: 1.8,
      });
      addShape(bezierPath(map(22, -23), map(44, -36), map(68, -31), map(82, -14), 24), {
        width: 1.8,
      });
      addShape(bezierPath(map(12, -28), map(1, 4), map(3, 27), map(22, 36), 30), {
        width: 1.6,
        opacity: 0.8,
      });
      addShape(bezierPath(map(-34, 72), map(-4, 88), map(31, 89), map(58, 64), 32), {
        width: 2,
      });
      addShape(bezierPath(map(-72, 122), map(-32, 148), map(30, 153), map(76, 115), 38), {
        width: 1.4,
        opacity: 0.62,
      });
      addShape(linePath(ox - 160 * scale, oy + 154 * scale, ox + 170 * scale, oy + 154 * scale, 34), {
        width: 1,
        dash: [7, 9],
        straight: true,
        opacity: 0.42,
      });
    };

    const buildArtwork = (nextMode: Mode) => {
      shapes = [];
      dots = [];
      bursts = [];
      mode = nextMode;

      if (mode === 'bar') createBar();
      else if (mode === 'rings') createRings();
      else if (mode === 'nestedSquares') createNestedSquares();
      else if (mode === 'squareGrid') createSquareGrid();
      else if (mode === 'wave') createWave();
      else if (mode === 'dotGrid') createDotGrid();
      else if (mode === 'dashed') createDashed();
      else if (mode === 'verticalLines') createVerticalLines();
      else if (mode === 'horizontalLines') createHorizontalLines();
      else if (mode === 'circleChain') createCircleChain();
      else if (mode === 'zigzag') createZigzag();
      else createPortrait();

      draw();
    };

    const addBurst = (x: number, y: number, strength = 1) => {
      bursts.push({
        x,
        y,
        radius: 0,
        speed: 12 + strength * 5,
        force: 9 + strength * 8,
        life: 1,
      });
      if (bursts.length > 5) bursts.shift();
    };

    const updateBursts = () => {
      for (const burst of bursts) {
        burst.radius += burst.speed;
        burst.life *= 0.94;
      }
      bursts = bursts.filter(
        (burst) => burst.life > 0.035 && burst.radius < Math.max(W, H) * 1.5,
      );
    };

    const applyBursts = (point: Point) => {
      for (const burst of bursts) {
        const dx = point.x - burst.x;
        const dy = point.y - burst.y;
        const distance = Math.hypot(dx, dy) || 0.001;
        const shell = Math.abs(distance - burst.radius);
        const shellWidth = 55;
        if (shell < shellWidth) {
          const influence = 1 - shell / shellWidth;
          const force = influence * burst.force * burst.life;
          point.vx += (dx / distance) * force;
          point.vy += (dy / distance) * force;
        }
      }
    };

    const updatePoint = (point: Point) => {
      const spring = mode === 'bar' ? 0.036 : 0.03;
      const damping = mode === 'bar' ? 0.895 : 0.88;

      point.vx += (point.homeX - point.x) * spring;
      point.vy += (point.homeY - point.y) * spring;

      if (pointer.active) {
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const distance = Math.hypot(dx, dy) || 0.001;

        if (distance < pointer.radius) {
          const influence = 1 - distance / pointer.radius;
          const smooth = influence * influence * (3 - 2 * influence);

          if (pointer.down) {
            point.vx += (pointer.x - point.x) * 0.052 * smooth;
            point.vy += (pointer.y - point.y) * 0.052 * smooth;
          } else {
            const push = 2.3 + Math.min(pointer.speed * 0.12, 9);
            point.vx += (dx / distance) * push * smooth;
            point.vy += (dy / distance) * push * smooth;
          }

          point.vx += pointer.vx * 0.12 * smooth;
          point.vy += pointer.vy * 0.12 * smooth;
        }
      }

      applyBursts(point);
      point.vx *= damping;
      point.vy *= damping;
      point.x += point.vx;
      point.y += point.vy;
    };

    const updatePhysics = () => {
      updateBursts();
      forEachPoint(updatePoint);
      pointer.vx *= 0.82;
      pointer.vy *= 0.82;
      pointer.speed = Math.hypot(pointer.vx, pointer.vy);
    };

    const drawShape = (shape: Shape) => {
      const points = shape.points;
      if (!points.length) return;

      ctx.save();
      ctx.globalAlpha = shape.opacity;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      if (shape.straight || points.length < 3) {
        for (let i = 1; i < points.length; i += 1) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      } else {
        for (let i = 1; i < points.length - 1; i += 1) {
          const current = points[i];
          const next = points[i + 1];
          ctx.quadraticCurveTo(
            current.x,
            current.y,
            (current.x + next.x) / 2,
            (current.y + next.y) / 2,
          );
        }
        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
      }

      if (shape.closed) ctx.closePath();
      ctx.strokeStyle = INK;
      ctx.lineWidth = shape.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash(shape.dash);
      ctx.stroke();
      ctx.restore();
    };

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const shape of shapes) drawShape(shape);

      ctx.save();
      ctx.fillStyle = INK;
      ctx.globalAlpha = 0.82;
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius ?? 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (bursts.length) {
        ctx.save();
        ctx.strokeStyle = UMBER;
        for (const burst of bursts) {
          ctx.globalAlpha = Math.max(0, burst.life * 0.45);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(burst.x, burst.y, burst.radius, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    }

    const staticDisplacement = (x: number, y: number, strength = 1) => {
      forEachPoint((point) => {
        const dx = point.x - x;
        const dy = point.y - y;
        const distance = Math.hypot(dx, dy) || 1;
        const radius = Math.min(Math.max(W, H) * 0.46, 260);
        if (distance >= radius) return;
        const influence = (1 - distance / radius) * strength;
        point.x += (dx / distance) * 24 * influence;
        point.y += (dy / distance) * 24 * influence;
      });
      draw();
    };

    const updatePointerPos = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (pointer.prevX > -9000) {
        pointer.vx = x - pointer.prevX;
        pointer.vy = y - pointer.prevY;
        pointer.speed = Math.hypot(pointer.vx, pointer.vy);
      }

      pointer.prevX = x;
      pointer.prevY = y;
      pointer.x = x;
      pointer.y = y;
    };

    const onPointerEnter = (event: PointerEvent) => {
      pointer.active = true;
      pointer.prevX = -9999;
      pointer.prevY = -9999;
      updatePointerPos(event);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && !pointer.down) return;
      pointer.active = true;
      updatePointerPos(event);
    };

    const onPointerDown = (event: PointerEvent) => {
      pointer.active = true;
      pointer.down = true;
      updatePointerPos(event);

      if (prefersReducedMotion) staticDisplacement(pointer.x, pointer.y, 0.8);
      else addBurst(pointer.x, pointer.y, 0.9);

      try {
        stage.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is an enhancement; interaction still works without it.
      }
    };

    const onPointerUp = (event: PointerEvent) => {
      pointer.down = false;
      updatePointerPos(event);
      if (!prefersReducedMotion) addBurst(pointer.x, pointer.y, 0.45);

      try {
        stage.releasePointerCapture(event.pointerId);
      } catch {
        // Ignore if capture was never established.
      }
    };

    const onPointerCancel = () => {
      pointer.down = false;
      pointer.active = false;
    };

    const onPointerLeave = () => {
      pointer.down = false;
      pointer.active = false;
      pointer.prevX = -9999;
      pointer.prevY = -9999;
    };

    stage.addEventListener('pointerenter', onPointerEnter);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointerup', onPointerUp);
    stage.addEventListener('pointercancel', onPointerCancel);
    stage.addEventListener('pointerleave', onPointerLeave);

    changePatternRef.current = () => {
      let next = MODES[Math.floor(Math.random() * MODES.length)];
      let safety = 0;
      while (next === mode && safety < 12) {
        next = MODES[Math.floor(Math.random() * MODES.length)];
        safety += 1;
      }
      buildArtwork(next);
    };

    burstRef.current = () => {
      if (prefersReducedMotion) {
        staticDisplacement(W / 2, H / 2, 1.1);
        return;
      }
      addBurst(W / 2, H / 2, 1.3);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nextW = Math.max(1, Math.round(rect.width));
      const nextH = Math.max(1, Math.round(rect.height));
      if (nextW === W && nextH === H) return;

      W = nextW;
      H = nextH;
      DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildArtwork(mode);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener('resize', resize);
    }

    const animate = () => {
      if (!isMounted) return;
      updatePhysics();
      draw();
      animId = requestAnimationFrame(animate);
    };

    const initialRect = canvas.getBoundingClientRect();
    W = Math.max(1, Math.round(initialRect.width || stage.clientWidth || 800));
    H = Math.max(1, Math.round(initialRect.height || 340));
    DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildArtwork(MODES[Math.floor(Math.random() * MODES.length)]);

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(animate);
    }

    return () => {
      isMounted = false;
      if (animId !== null) cancelAnimationFrame(animId);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', resize);
      stage.removeEventListener('pointerenter', onPointerEnter);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointerup', onPointerUp);
      stage.removeEventListener('pointercancel', onPointerCancel);
      stage.removeEventListener('pointerleave', onPointerLeave);
      changePatternRef.current = () => undefined;
      burstRef.current = () => undefined;
    };
  }, []);

  return (
    <section className="border-b border-[#1C1917]/10 bg-[#FAF8F5] py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={stageRef}
          className="relative overflow-hidden border border-[#1C1917]/12 bg-[#F4EFE6] cursor-crosshair touch-pan-y"
          aria-label="Interactive generative artwork"
        >
          <canvas
            ref={canvasRef}
            className="block h-[clamp(300px,38vw,430px)] w-full"
            aria-hidden="true"
          />

          <div className="absolute right-3 top-3 z-10 flex gap-2 sm:right-4 sm:top-4">
            <button
              type="button"
              onClick={() => changePatternRef.current()}
              className="grid h-11 w-11 place-items-center border border-[#1C1917]/20 bg-[#FAF8F5]/90 text-[#1C1917] backdrop-blur-sm transition-colors hover:border-[#78350F] hover:text-[#78350F] active:bg-[#F4EFE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE6]"
              aria-label="Change generative pattern"
              title="Change pattern"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="3.5" y="3.5" width="6" height="6" />
                <rect x="14.5" y="3.5" width="6" height="6" />
                <rect x="3.5" y="14.5" width="6" height="6" />
                <rect x="14.5" y="14.5" width="6" height="6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => burstRef.current()}
              className="grid h-11 w-11 place-items-center bg-[#1C1917] text-[#FAF8F5] transition-colors hover:bg-[#78350F] active:bg-[#5D290B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78350F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4EFE6]"
              aria-label="Send a burst through the generative artwork"
              title="Burst"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M18.36 5.64l-2.12 2.12M7.76 16.24l-2.12 2.12" />
                <circle cx="12" cy="12" r="3.25" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
