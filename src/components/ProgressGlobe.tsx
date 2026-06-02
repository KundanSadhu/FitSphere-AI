import { useEffect, useRef, useState } from 'react';
import { Orbit, Activity, ShieldCheck, Cpu } from 'lucide-react';

export const ProgressGlobe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [hudStats, setHudStats] = useState({ x: 0, y: 0, depth: 1.0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    // Handle resizing
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Dynamic particles representing floating fitness progress coordinates
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      label?: string;
    }> = [
      { x: -50, y: -40, z: 20, size: 2.5, color: '#3b82f6', label: 'STRK' },
      { x: 40, y: 50, z: -30, size: 2.5, color: '#ef4444', label: 'CAL' },
      { x: -30, y: 40, z: -50, size: 2.0, color: '#10b981', label: 'H2O' },
      { x: 50, y: -20, z: 40, size: 3.0, color: '#8b5cf6', label: 'XP' },
      { x: 10, y: -50, z: -10, size: 2.0, color: '#eab308', label: 'LVL' },
      { x: -10, y: 15, z: 60, size: 2.5, color: '#ec4899', label: 'BMR' }
    ];

    let angleY = 0;
    let angleX = 0.4; // constant tilt

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Focus centers
      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * 0.35;

      // Update rotation
      angleY += 0.01 * rotationSpeed;
      setHudStats({
        x: Math.sin(angleY) * r,
        y: Math.cos(angleY) * r,
        depth: 1 + Math.sin(angleY) * 0.2
      });

      // 1. Draw glowing blue orbital ring (Hypertrophic plane)
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.3, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Draw gold orbital ring (Diet plane)
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * 0.9, r * 0.2, -Math.PI / 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Draw violet outer protective bubble (Wellness plane)
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 4. Draw central core sphere
      const gradient = ctx.createRadialGradient(cx, cy, 2, cx, cy, r * 0.65);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.85)');
      gradient.addColorStop(0.3, 'rgba(139, 92, 246, 0.55)');
      gradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.15)');
      gradient.addColorStop(1, 'rgba(30, 41, 59, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.65, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // 5. Project and render rotating particle points representing metrics
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected = particles.map(p => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        
        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Scaling with depth
        const scale = 180 / (180 + z2);
        const px = cx + x1 * scale * (r / 50);
        const py = cy + y2 * scale * (r / 50);

        return {
          px,
          py,
          pz: z2,
          size: p.size * scale,
          color: p.color,
          label: p.label
        };
      });

      // Sort projected particles based on Z depth so we render background first
      projected.sort((a, b) => b.pz - a.pz);

      projected.forEach(p => {
        // Draw connecting radial thread to core center
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.px, p.py);
        ctx.strokeStyle = p.pz < 0 ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Particle circle
        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.5, p.size), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Glowing particle aura (if in foreground)
        if (p.pz < 0) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = p.color === '#3b82f6' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)';
          ctx.fill();
        }

        // Project textual telemetry label
        ctx.font = 'bold 8px monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fillText(p.label || '', p.px + p.size + 4, p.py + 3);
      });

      // HUD crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy);
      ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [rotationSpeed]);

  return (
    <div className="relative w-full h-full bg-slate-950 rounded-2xl border border-slate-900 overflow-hidden flex flex-col justify-end p-4 shadow-xl">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:14px_14px] opacity-40 pointer-events-none" />

      {/* Floating Canvas */}
      <div className="absolute inset-0 flex items-center justify-center z-10 p-2">
        <canvas ref={canvasRef} className="w-full h-full" style={{ maxHeight: '175px' }} />
      </div>

      {/* Tech HUD overlays */}
      <div className="absolute top-4 left-4 z-20 flex flex-col pointer-events-none">
        <div className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">SYSTM ACTIVE</span>
        </div>
        <span className="text-[9px] font-semibold text-slate-500 font-mono mt-0.5 uppercase">Bio-Resonance Globe</span>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none text-right">
        <span className="text-[9px] font-mono text-emerald-400 font-bold tracking-tight bg-emerald-950/45 border border-emerald-900/60 px-1.5 py-0.5 rounded flex items-center gap-0.5">
          <ShieldCheck className="w-3 h-3" /> SECURE
        </span>
      </div>

      {/* Telemetry Footer Controls */}
      <div className="relative z-20 w-full flex items-center justify-between border-t border-slate-900 pt-3 mt-32">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-slate-500 tracking-wider uppercase font-mono">MATRIX DEPTH</span>
          <span className="text-xs font-bold text-sky-400 font-mono tracking-wide">
            {hudStats.depth.toFixed(3)}G RAD
          </span>
        </div>

        <div className="flex gap-1.5">
          {[0.5, 1, 2].map((sp) => (
            <button
              key={sp}
              onClick={() => setRotationSpeed(sp)}
              className={`px-1.5 py-0.5 text-[8px] font-extrabold font-mono rounded cursor-pointer transition-colors border ${
                rotationSpeed === sp
                  ? 'bg-sky-500 border-sky-400 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sp}X
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
