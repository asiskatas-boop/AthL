import React, { useEffect, useRef, useState } from 'react';
import { Mail, FileText } from 'lucide-react';

interface GenerativeHeaderProps {
  onOpenInquiry?: () => void;
  onOpenDossier?: () => void;
  onSearchClick?: () => void;
}

export const GenerativeHeader: React.FC<GenerativeHeaderProps> = ({
  onOpenInquiry,
  onOpenDossier,
  onSearchClick
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const portraitSvgRef = useRef<SVGSVGElement>(null);

  // We expose a function ref to trigger pattern change and burst
  const changePatternRef = useRef<() => void>(() => {});
  const burstRef = useRef<() => void>(() => {});

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const portraitSvg = portraitSvgRef.current;
    if (!stage || !canvas || !portraitSvg) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const activeCanvas: HTMLCanvasElement = canvas;
    const activeCtx: CanvasRenderingContext2D = ctx;
    const activeStage: HTMLDivElement = stage;
    const activePortraitSvg: SVGSVGElement = portraitSvg;

    const portraitParts = Array.from(activePortraitSvg.querySelectorAll('path, circle')) as (SVGPathElement | SVGCircleElement)[];
    const BLUE = '#2f86b5';

    let W = 1;
    let H = 1;
    let DPR = 1;
    let mode = 'bar';

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
    }

    interface Burst {
      x: number;
      y: number;
      radius: number;
      speed: number;
      force: number;
      life: number;
    }

    let shapes: Shape[] = [];
    let dots: Point[] = [];
    let bursts: Burst[] = [];
    let animId: number | null = null;
    let isMounted = true;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const modes = [
      'bar', 'bar', 'bar',
      'rings', 'rings',
      'nestedSquares', 'nestedSquares',
      'squareGrid', 'squareGrid',
      'portrait', 'portrait',
      'wave',
      'dotGrid',
      'dashed',
      'verticalLines',
      'horizontalLines',
      'circleChain',
      'zigzag'
    ];

    const pointer = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      clientX: -9999,
      clientY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      active: false,
      down: false,
      radius: 145
    };

    const portraitState = portraitParts.map((el) => ({
      el,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      cx: 180,
      cy: 210
    }));

    function makePoint(x: number, y: number): Point {
      return {
        x,
        y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0
      };
    }

    function addShape(points: Point[], options: { width?: number; dash?: number[]; closed?: boolean; straight?: boolean } = {}) {
      shapes.push({
        points,
        width: options.width || 2,
        dash: options.dash || [],
        closed: Boolean(options.closed),
        straight: Boolean(options.straight)
      });
    }

    function chooseMode() {
      return modes[Math.floor(Math.random() * modes.length)];
    }

    function forEachPoint(callback: (p: Point) => void) {
      for (const shape of shapes) {
        for (const point of shape.points) {
          callback(point);
        }
      }
      for (const point of dots) {
        callback(point);
      }
    }

    /* SHAPES CREATION */
    function createBar() {
      const points: Point[] = [];
      const count = Math.max(100, Math.floor(W / 7));
      for (let i = 0; i < count; i++) {
        points.push(makePoint((i / (count - 1)) * W, H / 2));
      }
      addShape(points, {
        width: Math.max(95, Math.min(185, H * 0.43))
      });
    }

    function createRings() {
      const count = 7;
      const maxRadiusX = Math.min(W * 0.37, H * 0.78);
      for (let ring = 1; ring <= count; ring++) {
        const points: Point[] = [];
        const rx = (maxRadiusX * ring) / count;
        const ry = rx * 0.48;
        for (let i = 0; i <= 110; i++) {
          const angle = (i / 110) * Math.PI * 2;
          points.push(makePoint(W / 2 + Math.cos(angle) * rx, H / 2 + Math.sin(angle) * ry));
        }
        addShape(points, { closed: true });
      }
    }

    function squarePath(cx: number, cy: number, halfSize: number, samples = 14): Point[] {
      const points: Point[] = [];
      const corners = [
        [cx - halfSize, cy - halfSize],
        [cx + halfSize, cy - halfSize],
        [cx + halfSize, cy + halfSize],
        [cx - halfSize, cy + halfSize],
        [cx - halfSize, cy - halfSize]
      ];
      for (let side = 0; side < 4; side++) {
        const a = corners[side];
        const b = corners[side + 1];
        for (let i = 0; i < samples; i++) {
          const t = i / samples;
          points.push(makePoint(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t));
        }
      }
      points.push(makePoint(corners[4][0], corners[4][1]));
      return points;
    }

    function createNestedSquares() {
      const count = 8;
      const maxHalf = Math.min(W * 0.27, H * 0.42);
      for (let i = 1; i <= count; i++) {
        addShape(squarePath(W / 2, H / 2, (maxHalf * i) / count, 16), {
          closed: true,
          straight: true
        });
      }
    }

    function createSquareGrid() {
      const columns = Math.max(8, Math.min(18, Math.round(W / 70)));
      const rows = Math.max(3, Math.min(7, Math.round(H / 75)));
      const gapX = W / columns;
      const gapY = (H * 0.56) / rows;
      const squareHalf = Math.min(gapX, gapY) * 0.31;
      const top = H / 2 - ((rows - 1) * gapY) / 2;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const cx = gapX * (column + 0.5);
          const cy = top + row * gapY;
          addShape(squarePath(cx, cy, squareHalf, 5), {
            closed: true,
            straight: true,
            width: 1.8
          });
        }
      }
    }

    function createWave() {
      const points: Point[] = [];
      const count = Math.max(100, Math.floor(W / 5));
      const cycles = 12 + Math.random() * 9;
      const amplitude = H * 0.19;

      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        points.push(
          makePoint(
            t * W,
            H / 2 + Math.sin(t * Math.PI * 2 * cycles) * amplitude
          )
        );
      }
      addShape(points);
    }

    function createDotGrid() {
      const spacingX = 20;
      const spacingY = 24;
      const rows = 7;
      const columns = Math.max(8, Math.floor((W - 16) / spacingX));
      const top = H / 2 - ((rows - 1) * spacingY) / 2;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const p = makePoint(8 + column * spacingX, top + row * spacingY);
          p.radius = 5.2;
          dots.push(p);
        }
      }
    }

    function createDashed() {
      const points: Point[] = [];
      const count = Math.max(80, Math.floor(W / 8));
      for (let i = 0; i < count; i++) {
        const t = i / (count - 1);
        points.push(makePoint(W * 0.06 + t * W * 0.88, H * 0.72 - t * H * 0.44));
      }
      addShape(points, {
        width: 4,
        dash: [27, 18],
        straight: true
      });
    }

    function createVerticalLines() {
      const count = Math.max(14, Math.min(32, Math.round(W / 36)));
      for (let line = 0; line < count; line++) {
        const points: Point[] = [];
        const x = (line / (count - 1)) * W;
        for (let i = 0; i < 24; i++) {
          const t = i / 23;
          points.push(makePoint(x, H * 0.25 + t * H * 0.5));
        }
        addShape(points);
      }
    }

    function createHorizontalLines() {
      const count = 10;
      for (let row = 0; row < count; row++) {
        const points: Point[] = [];
        const y = H * 0.3 + (row / (count - 1)) * H * 0.4;
        const amount = Math.max(55, Math.floor(W / 11));
        for (let i = 0; i < amount; i++) {
          points.push(makePoint((i / (amount - 1)) * W, y));
        }
        addShape(points);
      }
    }

    function createCircleChain() {
      const count = Math.max(8, Math.min(20, Math.round(W / 55)));
      const radius = Math.min(24, (W / count) * 0.32);
      for (let circle = 0; circle < count; circle++) {
        const points: Point[] = [];
        const cx = (circle + 0.5) * (W / count);
        for (let i = 0; i <= 36; i++) {
          const angle = (i / 36) * Math.PI * 2;
          points.push(makePoint(cx + Math.cos(angle) * radius, H / 2 + Math.sin(angle) * radius));
        }
        addShape(points, { closed: true });
      }
    }

    function createZigzag() {
      const points: Point[] = [];
      const peaks = Math.max(9, Math.min(20, Math.round(W / 55)));
      for (let i = 0; i <= peaks; i++) {
        points.push(makePoint((i / peaks) * W, i % 2 ? H * 0.7 : H * 0.3));
      }
      addShape(points, { width: 2.5, straight: true });
    }

    /* PORTRAIT MODE */
    function resetPortraitState() {
      for (const state of portraitState) {
        state.x = 0;
        state.y = 0;
        state.vx = 0;
        state.vy = 0;
        state.el.removeAttribute('transform');
      }
    }

    function preparePortrait() {
      activeCanvas.style.opacity = '0';
      activePortraitSvg.style.display = 'block';
      resetPortraitState();

      requestAnimationFrame(() => {
        portraitState.forEach((state) => {
          try {
            const box = state.el.getBBox();
            state.cx = box.x + box.width / 2;
            state.cy = box.y + box.height / 2;
          } catch {
            state.cx = 180;
            state.cy = 210;
          }
        });
      });
    }

    function hidePortrait() {
      activePortraitSvg.style.display = 'none';
      activeCanvas.style.opacity = '1';
    }

    function clientToPortraitSvg(clientX: number, clientY: number) {
      const matrix = activePortraitSvg.getScreenCTM();
      if (!matrix) return { x: 180, y: 210 };
      const point = activePortraitSvg.createSVGPoint();
      point.x = clientX;
      point.y = clientY;
      const transformed = point.matrixTransform(matrix.inverse());
      return { x: transformed.x, y: transformed.y };
    }

    function portraitBurst(clientX: number, clientY: number, strength = 1) {
      const center = clientToPortraitSvg(clientX, clientY);
      for (const state of portraitState) {
        const dx = state.cx - center.x;
        const dy = state.cy - center.y;
        const distance = Math.hypot(dx, dy) || 1;
        state.vx += (dx / distance) * (8 + strength * 9);
        state.vy += (dy / distance) * (8 + strength * 9);
      }
    }

    function updatePortrait() {
      if (mode !== 'portrait') return;
      let pointerSvg: { x: number; y: number } | null = null;
      if (pointer.active) {
        pointerSvg = clientToPortraitSvg(pointer.clientX, pointer.clientY);
      }

      for (const state of portraitState) {
        if (pointerSvg) {
          const dx = state.cx - pointerSvg.x;
          const dy = state.cy - pointerSvg.y;
          const distance = Math.hypot(dx, dy) || 1;
          const radius = 120;

          if (distance < radius) {
            const influence = 1 - distance / radius;
            const smooth = influence * influence;
            if (pointer.down) {
              state.vx -= (dx / distance) * 4 * smooth;
              state.vy -= (dy / distance) * 4 * smooth;
            } else {
              const push = 2.7 + Math.min(pointer.speed * 0.08, 7);
              state.vx += (dx / distance) * push * smooth;
              state.vy += (dy / distance) * push * smooth;
            }
            state.vx += pointer.vx * 0.055 * smooth;
            state.vy += pointer.vy * 0.055 * smooth;
          }
        }

        state.vx += -state.x * 0.065;
        state.vy += -state.y * 0.065;
        state.vx *= 0.86;
        state.vy *= 0.86;
        state.x += state.vx;
        state.y += state.vy;

        state.el.setAttribute(
          'transform',
          `translate(${state.x.toFixed(2)} ${state.y.toFixed(2)})`
        );
      }
    }

    function buildArtwork(nextMode = chooseMode()) {
      shapes = [];
      dots = [];
      bursts = [];
      mode = nextMode;

      if (mode === 'portrait') {
        preparePortrait();
        return;
      }

      hidePortrait();

      if (mode === 'bar') {
        createBar();
      } else if (mode === 'rings') {
        createRings();
      } else if (mode === 'nestedSquares') {
        createNestedSquares();
      } else if (mode === 'squareGrid') {
        createSquareGrid();
      } else if (mode === 'wave') {
        createWave();
      } else if (mode === 'dotGrid') {
        createDotGrid();
      } else if (mode === 'dashed') {
        createDashed();
      } else if (mode === 'verticalLines') {
        createVerticalLines();
      } else if (mode === 'horizontalLines') {
        createHorizontalLines();
      } else if (mode === 'circleChain') {
        createCircleChain();
      } else {
        createZigzag();
      }

      draw();
    }

    function addBurst(x: number, y: number, strength = 1) {
      bursts.push({
        x,
        y,
        radius: 0,
        speed: 13 + strength * 5,
        force: 10 + strength * 8,
        life: 1
      });
      if (bursts.length > 5) bursts.shift();
    }

    function updateBursts() {
      for (const burst of bursts) {
        burst.radius += burst.speed;
        burst.life *= 0.94;
      }
      bursts = bursts.filter(
        (burst) => burst.life > 0.035 && burst.radius < Math.max(W, H) * 1.5
      );
    }

    function applyBursts(point: Point) {
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
    }

    function updatePoint(point: Point) {
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
            const push = 2.4 + Math.min(pointer.speed * 0.12, 10);
            point.vx += (dx / distance) * push * smooth;
            point.vy += (dy / distance) * push * smooth;
          }

          point.vx += pointer.vx * 0.13 * smooth;
          point.vy += pointer.vy * 0.13 * smooth;
        }
      }

      applyBursts(point);
      point.vx *= damping;
      point.vy *= damping;
      point.x += point.vx;
      point.y += point.vy;
    }

    function updatePhysics() {
      updateBursts();
      if (mode === 'portrait') {
        updatePortrait();
      } else {
        forEachPoint(updatePoint);
      }
      pointer.vx *= 0.82;
      pointer.vy *= 0.82;
      pointer.speed = Math.hypot(pointer.vx, pointer.vy);
    }

    function drawShape(shape: Shape) {
      const points = shape.points;
      if (!points.length) return;
      activeCtx.beginPath();
      activeCtx.moveTo(points[0].x, points[0].y);

      if (shape.straight || points.length < 3) {
        for (let i = 1; i < points.length; i++) {
          activeCtx.lineTo(points[i].x, points[i].y);
        }
      } else {
        for (let i = 1; i < points.length - 1; i++) {
          const current = points[i];
          const next = points[i + 1];
          activeCtx.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
        }
        const last = points[points.length - 1];
        activeCtx.lineTo(last.x, last.y);
      }

      if (shape.closed) activeCtx.closePath();
      activeCtx.strokeStyle = BLUE;
      activeCtx.lineWidth = shape.width;
      activeCtx.lineCap = 'round';
      activeCtx.lineJoin = 'round';
      activeCtx.setLineDash(shape.dash);
      activeCtx.stroke();
      activeCtx.setLineDash([]);
    }

    function draw() {
      activeCtx.clearRect(0, 0, W, H);
      if (mode === 'portrait') return;
      for (const shape of shapes) {
        drawShape(shape);
      }
      activeCtx.fillStyle = BLUE;
      for (const dot of dots) {
        activeCtx.beginPath();
        activeCtx.arc(dot.x, dot.y, dot.radius || 5, 0, Math.PI * 2);
        activeCtx.fill();
      }
    }

    function updatePointerPos(event: PointerEvent) {
      const rect = activeCanvas.getBoundingClientRect();
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
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
    }

    const onPointerEnter = (e: PointerEvent) => {
      pointer.active = true;
      pointer.prevX = -9999;
      pointer.prevY = -9999;
      updatePointerPos(e);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch' && !pointer.down) return;
      pointer.active = true;
      updatePointerPos(e);
    };

    const onPointerDown = (e: PointerEvent) => {
      pointer.active = true;
      pointer.down = true;
      updatePointerPos(e);
      if (mode === 'portrait') {
        portraitBurst(e.clientX, e.clientY, 0.9);
      } else {
        addBurst(pointer.x, pointer.y, 0.9);
      }
      if (activeStage.setPointerCapture) {
        try {
          activeStage.setPointerCapture(e.pointerId);
        } catch {}
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      pointer.down = false;
      if (mode === 'portrait') {
        portraitBurst(e.clientX, e.clientY, 0.45);
      } else {
        addBurst(pointer.x, pointer.y, 0.45);
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

    activeStage.addEventListener('pointerenter', onPointerEnter);
    activeStage.addEventListener('pointermove', onPointerMove);
    activeStage.addEventListener('pointerdown', onPointerDown);
    activeStage.addEventListener('pointerup', onPointerUp);
    activeStage.addEventListener('pointercancel', onPointerCancel);
    activeStage.addEventListener('pointerleave', onPointerLeave);

    // Provide handlers for buttons
    changePatternRef.current = () => {
      let next = chooseMode();
      let safety = 0;
      while (next === mode && safety < 12) {
        next = chooseMode();
        safety++;
      }
      buildArtwork(next);
    };

    burstRef.current = () => {
      if (mode === 'portrait') {
        const rect = activeStage.getBoundingClientRect();
        portraitBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 1.3);
      } else {
        addBurst(W / 2, H / 2, 1.3);
      }
    };

    function resize() {
      const rect = activeCanvas.getBoundingClientRect();
      const nextW = Math.max(1, Math.round(rect.width));
      const nextH = Math.max(1, Math.round(rect.height));

      if (nextW === W && nextH === H) return;
      W = nextW;
      H = nextH;
      DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

      activeCanvas.width = Math.round(W * DPR);
      activeCanvas.height = Math.round(H * DPR);
      activeCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

      buildArtwork(mode);
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(activeCanvas);
    } else {
      window.addEventListener('resize', resize);
    }

    function animate() {
      if (!isMounted) return;
      if (!prefersReducedMotion) {
        updatePhysics();
        draw();
      }
      animId = requestAnimationFrame(animate);
    }

    // Init
    const initRect = activeCanvas.getBoundingClientRect();
    W = Math.max(1, Math.round(initRect.width || activeStage.clientWidth || 800));
    H = Math.max(1, Math.round(initRect.height || 360));
    DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    activeCanvas.width = Math.round(W * DPR);
    activeCanvas.height = Math.round(H * DPR);
    activeCtx.setTransform(DPR, 0, 0, DPR, 0, 0);

    buildArtwork('bar');
    animId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      activeStage.removeEventListener('pointerenter', onPointerEnter);
      activeStage.removeEventListener('pointermove', onPointerMove);
      activeStage.removeEventListener('pointerdown', onPointerDown);
      activeStage.removeEventListener('pointerup', onPointerUp);
      activeStage.removeEventListener('pointercancel', onPointerCancel);
      activeStage.removeEventListener('pointerleave', onPointerLeave);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="w-full bg-white text-[#050505] border-b border-black/10 select-none">
      {/* 
        Site Header:
        - All text from original HTML removed as requested
        - Name changed to AthLasith
      */}
      <header className="min-h-[140px] sm:min-h-[180px] pt-4 sm:pt-5 px-4 sm:px-6 flex items-start justify-between gap-6 sm:gap-10">
        <a 
          href="#" 
          aria-label="AthLasith home"
          className="flex items-center gap-3 shrink-0 group transition-opacity hover:opacity-80"
        >
          <div 
            className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-wider uppercase font-normal text-[#050505] leading-none"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            AthLasith
          </div>
        </a>

        {/* Navigation with text removed, functional icons for search, inquiry and CV */}
        <nav className="flex items-center gap-4 sm:gap-7 pt-2 sm:pt-4" aria-label="Primary navigation">
          {onOpenDossier && (
            <button
              onClick={onOpenDossier}
              className="p-1 text-[#050505] hover:text-[#2f86b5] transition-colors cursor-pointer"
              title="Curatorial Dossier"
              aria-label="Curatorial Dossier"
            >
              <FileText className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
            </button>
          )}

          {onOpenInquiry && (
            <button
              onClick={onOpenInquiry}
              className="p-1 text-[#050505] hover:text-[#2f86b5] transition-colors cursor-pointer"
              title="Inquiries"
              aria-label="Inquiries"
            >
              <Mail className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
            </button>
          )}

          <button
            onClick={() => {
              if (onSearchClick) onSearchClick();
              else {
                const el = document.getElementById('projects');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="text-[#050505] hover:text-[#2f86b5] transition-colors cursor-pointer p-1"
            aria-label="Search and Explore Projects"
            title="Search Curatorial Projects"
          >
            <svg 
              className="w-7 h-7 sm:w-9 sm:h-9 block"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              aria-hidden="true"
            >
              <circle cx="17" cy="17" r="12" />
              <line x1="26" y1="26" x2="37" y2="37" />
            </svg>
          </button>
        </nav>
      </header>

      {/* 
        Interactive Generative Art Stage
      */}
      <div 
        ref={stageRef}
        id="artStage"
        className="relative w-full px-4 flex items-center overflow-hidden cursor-crosshair touch-pan-y"
        style={{ minHeight: '300px' }}
        aria-label="Interactive generative artwork"
      >
        <canvas 
          ref={canvasRef}
          id="artCanvas"
          className="block w-full h-[min(42vw,430px)] min-h-[290px] transition-opacity duration-300"
          aria-label="Move, drag, or tap to distort the artwork"
        />

        {/* Portrait Vector Geometry */}
        <svg
          ref={portraitSvgRef}
          id="portraitSvg"
          viewBox="0 0 360 420"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Abstract portrait vector"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-[calc(100%-32px)] h-[min(42vw,430px)] min-h-[290px] hidden pointer-events-none overflow-visible"
        >
          <g 
            id="portraitLines"
            stroke="#2f86b5"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            <path d="M128 83 C145 54 190 38 224 52 C249 62 267 84 272 113"/>
            <path d="M127 84 C113 108 109 138 112 169 C114 196 121 217 134 230 C148 235 168 234 183 229"/>
            <path d="M128 88 C146 91 169 101 186 116 C201 128 216 139 231 143"/>
            <path d="M142 76 C165 61 195 55 217 60 C241 66 257 81 267 104"/>

            <path d="M178 66 C194 72 211 84 227 100 C242 116 252 136 258 158"/>
            <path d="M168 73 C188 86 203 101 218 119 C232 136 243 159 248 187"/>
            <path d="M160 81 C177 94 192 109 205 129 C218 149 229 172 234 202"/>
            <path d="M154 92 C169 104 182 119 194 137 C207 157 217 182 221 213"/>
            <path d="M187 79 C209 91 227 111 240 135 C253 159 260 187 262 218"/>
            <path d="M203 77 C226 92 244 115 257 142 C268 166 274 198 274 233"/>

            <path d="M226 58 C247 70 263 92 271 121 C280 151 282 188 282 229 C282 247 283 266 286 286"/>
            <path d="M214 63 C239 83 255 107 264 139 C273 171 276 207 277 249 C277 268 279 288 283 306"/>
            <path d="M205 70 C229 89 245 115 253 148 C261 181 264 221 265 261 C266 279 267 294 269 311"/>
            <path d="M198 76 C219 97 233 124 240 156 C247 190 250 227 251 268 C251 287 252 302 254 317"/>

            <path d="M271 119 C281 150 287 188 289 230 L295 295 L274 302"/>
            <path d="M266 140 C273 172 276 213 277 253 L279 291"/>

            <path d="M186 228 C191 245 194 259 193 273"/>
            <path d="M232 205 C228 224 224 241 220 256"/>
            <path d="M193 272 C208 264 221 258 235 252"/>
            <path d="M181 239 C198 244 214 247 231 245"/>

            <path d="M191 246 C170 255 154 269 143 289 C133 307 127 329 122 354"/>
            <path d="M221 256 C238 271 250 291 257 313 C264 335 267 355 268 374"/>
            <path d="M143 289 C158 281 177 277 197 280 C218 283 236 295 249 310"/>
            <path d="M197 280 C181 287 169 300 162 316 C154 334 146 353 134 370"/>
            <path d="M197 280 C216 289 230 302 239 321 C246 337 249 353 249 368"/>
            <path d="M162 316 C150 338 140 358 126 380"/>
            <path d="M126 380 C119 389 115 397 111 404"/>

            <path d="M185 130 C194 137 202 146 209 157"/>
            <path d="M179 139 C188 146 196 154 203 164"/>
            <path d="M176 151 C184 157 191 165 198 174"/>
            <path d="M173 163 C181 169 187 177 193 185"/>

            <path d="M210 171 C205 182 202 194 202 205"/>
            <path d="M200 206 C206 211 213 213 219 211"/>
            <path d="M195 213 C196 219 199 224 204 228"/>

            <circle cx="199" cy="230" r="7" fill="#2f86b5" />
            <circle cx="199" cy="230" r="11" />
          </g>
        </svg>

        {/* Minimal Interactivity Pill Controls */}
        <div className="absolute right-4 bottom-3 z-20 flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-xs border border-black/10 rounded-full shadow-xs">
          <button
            type="button"
            onClick={() => changePatternRef.current()}
            className="px-2.5 py-1 text-[11px] font-sans font-medium text-black/80 hover:text-black bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            title="Switch Generative Motif"
          >
            Pattern
          </button>
          <button
            type="button"
            onClick={() => burstRef.current()}
            className="px-2.5 py-1 text-[11px] font-sans font-medium text-black/80 hover:text-black bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
            title="Trigger Distortion Shockwave"
          >
            Burst
          </button>
        </div>
      </div>
    </div>
  );
};
