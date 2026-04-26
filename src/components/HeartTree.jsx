import { useEffect, useRef } from 'react';

const HEART_COLORS = [
  '#FF6B9D','#FF3D7F','#FF8FAB','#E8445A','#FF4757',
  '#FF6348','#FFA502','#FF7043','#EC407A','#F06292',
  '#FFB3C6','#FF8C94','#FFAAA5','#FF5252','#FF80AB',
  '#FF1744','#F50057','#FF6D00','#FF9100','#E040FB',
  '#FF4081','#FF6E40','#FFAB40','#FF5722','#E91E63',
];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function drawHeart(ctx, x, y, size, color, angle, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  const s = size * 0.5;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.5);
  ctx.bezierCurveTo(0, -s * 0.2, -s * 1.2, -s * 0.2, -s * 1.2, s * 0.4);
  ctx.bezierCurveTo(-s * 1.2, s * 1.1, 0, s * 1.5, 0, s * 2);
  ctx.bezierCurveTo(0, s * 1.5, s * 1.2, s * 1.1, s * 1.2, s * 0.4);
  ctx.bezierCurveTo(s * 1.2, -s * 0.2, 0, -s * 0.2, 0, s * 0.5);
  ctx.fill();
  ctx.restore();
}

function collectBranches(x, y, len, angle, depth, width, branchList, nodes) {
  if (depth === 0) {
    for (let i = 0; i < 5; i++) {
      nodes.push({
        x: x + rand(-18, 18),
        y: y + rand(-18, 18),
        size: rand(8, 16),
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        angle: rand(-0.9, 0.9),
        alpha: 0,
        targetAlpha: rand(0.75, 1.0),
        spawnAt: null,
      });
    }
    return;
  }

  const endX = x + Math.sin(angle) * len;
  const endY = y - Math.cos(angle) * len;

  branchList.push({ x1: x, y1: y, x2: endX, y2: endY, width, progress: 0, done: false });

  if (depth <= 4) {
    const count = depth <= 2 ? 4 : 2;
    for (let i = 0; i < count; i++) {
      const t = rand(0.2, 0.95);
      nodes.push({
        x: x + (endX - x) * t + rand(-14, 14),
        y: y + (endY - y) * t + rand(-14, 14),
        size: rand(7, 13),
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        angle: rand(-0.9, 0.9),
        alpha: 0,
        targetAlpha: rand(0.7, 0.95),
        spawnAt: null,
      });
    }
  }

  const spread = depth > 5 ? 0.36 : depth > 3 ? 0.43 : 0.50;
  collectBranches(endX, endY, len * 0.72, angle - spread, depth - 1, width * 0.68, branchList, nodes);
  collectBranches(endX, endY, len * 0.72, angle + spread, depth - 1, width * 0.68, branchList, nodes);
}

// ADDED isMidnight PROP HERE
export default function HeartTree({ width = 520, height = 600, isMidnight = false }) {
  const canvasRef = useRef(null);
  
  // Use a ref for theme so we can change colors without restarting the animation loop
  const themeRef = useRef(isMidnight);
  useEffect(() => {
    themeRef.current = isMidnight;
  }, [isMidnight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = width, H = height;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const groundY = H - 70;

    const branches = [];
    const heartNodes = [];
    collectBranches(cx, groundY, 105, 0, 7, 8, branches, heartNodes);

    heartNodes.forEach((h) => {
      let best = 0, bestDist = Infinity;
      branches.forEach((b, i) => {
        const d = Math.hypot(h.x - b.x2, h.y - b.y2);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      h.spawnAt = best;
    });

    let phase = 1;
    let lineW = 0;
    const maxLine = W * 0.38;
    let branchCursor = 0;   
    let lastTime = 0;
    let rafId;

    function drawBranch(b, progress) {
      // Branches become glowing slate/silver at night, dark brown in the day
      ctx.strokeStyle = themeRef.current ? '#94A3B8' : '#2C1810';
      ctx.lineWidth = b.width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(
        b.x1 + (b.x2 - b.x1) * progress,
        b.y1 + (b.y2 - b.y1) * progress,
      );
      ctx.stroke();
    }

    function animate(ts) {
      if (!lastTime) lastTime = ts;
      const dt = Math.min(ts - lastTime, 50);
      lastTime = ts;

      ctx.clearRect(0, 0, W, H);
      
      // Dynamic colors based on theme
      const lineColor = themeRef.current ? '#475569' : '#c8b89a';
      const seedColor = themeRef.current ? '#F43F5E' : '#E8445A';

      if (lineW > 0) {
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx - lineW, groundY);
        ctx.lineTo(cx + lineW, groundY);
        ctx.stroke();
      }

      if (phase === 1) {
        lineW = Math.min(lineW + dt * 0.45, maxLine);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx - lineW, groundY);
        ctx.lineTo(cx + lineW, groundY);
        ctx.stroke();
        ctx.fillStyle = seedColor;
        ctx.beginPath();
        ctx.arc(cx, groundY, 4, 0, Math.PI * 2);
        ctx.fill();
        if (lineW >= maxLine) phase = 2;

      } else if (phase === 2) {
        for (let i = 0; i <= branchCursor && i < branches.length; i++) {
          const b = branches[i];
          if (!b.done) {
            b.progress = Math.min(1, b.progress + dt * 0.007);
            if (b.progress >= 1) b.done = true;
          }
          drawBranch(b, b.progress);
        }
        heartNodes.forEach((h) => {
          if (h.spawnAt <= branchCursor && branches[h.spawnAt]?.done) {
            h.unlocked = true;
          }
        });
        if (branches[branchCursor]?.done) {
          branchCursor = Math.min(branchCursor + 4, branches.length - 1);
        }
        if (branches[branches.length - 1]?.done) phase = 3;

      } else if (phase === 3) {
        for (const b of branches) drawBranch(b, 1);

        heartNodes.forEach((h) => {
          if (!h.unlocked) return;
          if (h.alpha < h.targetAlpha) {
            h.alpha = Math.min(h.targetAlpha, h.alpha + dt * 0.016);
          }
          if (h.alpha > 0) drawHeart(ctx, h.x, h.y, h.size, h.color, h.angle, h.alpha);
        });
      }

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      // Changed background to transparent so it absorbs the parent div's dark/light color!
      style={{ display: 'block', background: 'transparent', borderRadius: 16 }}
    />
  );
}