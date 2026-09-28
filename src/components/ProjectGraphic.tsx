import React from 'react';
import { Project } from '../data/portfolioData';

interface ProjectGraphicProps {
  project: Project;
  className?: string;
}

export const ProjectGraphic: React.FC<ProjectGraphicProps> = ({ project, className = '' }) => {
  return (
    <div
      className={`relative w-full h-full min-h-[260px] md:min-h-[320px] rounded-xl overflow-hidden bg-zinc-900/90 dark:bg-zinc-950/90 border border-zinc-800/80 group-hover:border-zinc-700/90 transition-all duration-300 flex items-center justify-center select-none ${className}`}
      aria-label={`Visual preview for ${project.title}`}
    >
      {/* <!-- replace with screenshot --> */}
      {/* Background Subtle Gradient & Grid Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Dynamic graphic per wireframe type */}
      {project.wireframeType === 'portal' && <PortalGraphic />}
      {project.wireframeType === 'rag' && <RagGraphic />}
      {project.wireframeType === 'vision' && <VisionGraphic />}
      {project.wireframeType === 'snow' && <SnowGraphic />}
      {project.wireframeType === 'classifier' && <DetectorGraphic />}
      {project.wireframeType === 'tax' && <TaxGraphic />}
      {project.wireframeType === 'parallel' && <ParallelGraphic />}
      {project.wireframeType === 'topaz' && <TopazGraphic />}

      {/* Floating Badge / Stat Overlay */}
      {project.statsHighlight && (
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-lg bg-zinc-900/90 dark:bg-zinc-950/90 border border-zinc-800 backdrop-blur-md shadow-lg text-right">
          <span className="block text-xs font-mono font-medium text-emerald-400">
            {project.statsHighlight.value}
          </span>
          <span className="block text-[10px] text-zinc-400">
            {project.statsHighlight.label}
          </span>
        </div>
      )}

      {/* Marker flag in bottom left for clarity */}
      <div className="absolute bottom-4 left-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400">
          Architecture Schematic
        </span>
      </div>
    </div>
  );
};

// 1. CUI Wah Job Fair Portal Graphic
const PortalGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-3">
      {/* Mock Schedule Matrix */}
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-zinc-200">Greedy Slot Allocator</span>
        </div>
        <span className="text-emerald-400">0 Collisions</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { time: '09:30 AM', slot: 'Company Alpha', status: 'Locked', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' },
          { time: '10:15 AM', slot: 'Company Beta', status: 'Reserved', color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300' },
          { time: '11:00 AM', slot: 'Company Gamma', status: 'Allocated', color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300' },
          { time: '01:30 PM', slot: 'Company Delta', status: 'Locked', color: 'border-blue-500/40 bg-blue-500/10 text-blue-300' },
          { time: '02:15 PM', slot: 'Company Epsilon', status: 'Allocated', color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300' },
          { time: '03:00 PM', slot: 'Interview Room 4', status: 'Verified', color: 'border-zinc-700 bg-zinc-800/40 text-zinc-400' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-md border text-left flex flex-col justify-between transition-transform hover:scale-[1.02] ${item.color}`}
          >
            <span className="text-[10px] font-mono text-zinc-400">{item.time}</span>
            <span className="text-[11px] font-medium truncate mt-1 text-zinc-100">{item.slot}</span>
            <span className="text-[9px] uppercase tracking-wider mt-1 opacity-75">{item.status}</span>
          </div>
        ))}
      </div>

      {/* Concurrency Safe Bar */}
      <div className="mt-1 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>Isolation: Serializable</span>
        <span>Validation: Concurrency Safe</span>
      </div>
    </div>
  );
};

// 2. AI Email Copilot Graphic
const RagGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <span className="text-zinc-200">pgvector RAG Pipeline</span>
        <span className="text-teal-400">dim: 1536</span>
      </div>

      <div className="space-y-2">
        <div className="p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="text-xs text-zinc-300">Incoming message vector</span>
          </div>
          <span className="text-[10px] font-mono text-teal-300">cosine sim: 0.94</span>
        </div>

        <div className="pl-4 border-l-2 border-dashed border-teal-500/30 space-y-1.5 py-1">
          <div className="text-[11px] text-zinc-400 flex items-center justify-between pr-1">
            <span>Thread #108 (Client agreement)</span>
            <span className="text-[10px] font-mono text-emerald-400">score: 0.91</span>
          </div>
          <div className="text-[11px] text-zinc-400 flex items-center justify-between pr-1">
            <span>Thread #042 (Pricing precedent)</span>
            <span className="text-[10px] font-mono text-emerald-400">score: 0.87</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-medium text-emerald-200">Context-Grounded Draft Generated</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300">FastAPI</span>
        </div>
      </div>
    </div>
  );
};

// 3. LaneGuard Graphic
const VisionGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <span className="text-zinc-200">OpenCV vs YOLOv8n-seg</span>
        <span className="text-amber-400">TuSimple Benchmark</span>
      </div>

      <div className="relative h-32 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden flex items-end justify-center">
        <div className="absolute top-8 left-0 right-0 h-px bg-zinc-800" />

        <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
          <path
            d="M 150 32 Q 130 75 70 120"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <path
            d="M 150 32 Q 170 75 230 120"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          <polygon
            points="150,32 170,75 230,120 70,120 130,75"
            fill="rgba(16, 185, 129, 0.08)"
          />
          <rect x="90" y="80" width="28" height="18" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="180" y="80" width="28" height="18" fill="none" stroke="#10b981" strokeWidth="1.5" />
        </svg>

        <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-zinc-900/80 border border-zinc-700 text-[9px] font-mono text-amber-300">
          OpenCV Geometry
        </div>
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-zinc-900/80 border border-zinc-700 text-[9px] font-mono text-emerald-300">
          YOLOv8n-seg
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>FPS: ~48 realtime</span>
        <span>Resolution: 1280x720</span>
      </div>
    </div>
  );
};

// 4. Snow-Robust Classifier Graphic
const SnowGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <span className="text-zinc-200">Restoration + EfficientNet-B2</span>
        <span className="text-cyan-400">+19.32% Gain</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-2.5 rounded-lg bg-zinc-800/30 border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400">Severe Snow</span>
            <span className="text-[10px] text-rose-400 font-mono">Raw</span>
          </div>
          <div className="my-3 py-2 px-1 rounded bg-zinc-950/60 border border-zinc-800/80 text-center">
            <span className="text-xs font-mono line-through text-zinc-500">62.1% Acc</span>
          </div>
          <span className="text-[9px] text-zinc-500">Severe Occlusion</span>
        </div>

        <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-300">Restored Stage</span>
            <span className="text-[10px] text-emerald-400 font-mono">Ensemble</span>
          </div>
          <div className="my-3 py-2 px-1 rounded bg-cyan-900/30 border border-cyan-500/40 text-center">
            <span className="text-xs font-mono font-bold text-cyan-200">81.4% Acc</span>
          </div>
          <span className="text-[9px] text-cyan-300/80">+19.32% vs Baseline</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>Dual-stage architecture</span>
        <span>Backbone: EfficientNet-B2</span>
      </div>
    </div>
  );
};

// 5. AI-Generated Image Detector Graphic
const DetectorGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <span className="text-zinc-200">Few-Shot Unseen Detection</span>
        <span className="text-purple-400">0.96 ROC-AUC</span>
      </div>

      <div className="relative h-32 rounded-lg bg-zinc-950 border border-zinc-800 p-2 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 240 100">
          <circle cx="50" cy="35" r="4" fill="#a855f7" />
          <circle cx="58" cy="42" r="3" fill="#a855f7" opacity="0.8" />
          <circle cx="44" cy="46" r="3" fill="#a855f7" opacity="0.7" />
          <circle cx="65" cy="30" r="3" fill="#a855f7" opacity="0.6" />
          <text x="35" y="20" fill="#a855f7" fontSize="8" fontFamily="monospace">Midjourney</text>

          <circle cx="120" cy="70" r="4" fill="#38bdf8" />
          <circle cx="110" cy="76" r="3" fill="#38bdf8" opacity="0.8" />
          <circle cx="128" cy="64" r="3" fill="#38bdf8" opacity="0.7" />
          <text x="105" y="90" fill="#38bdf8" fontSize="8" fontFamily="monospace">Wukong</text>

          <circle cx="190" cy="40" r="4" fill="#ec4899" />
          <circle cx="198" cy="48" r="3" fill="#ec4899" opacity="0.8" />
          <circle cx="182" cy="35" r="3" fill="#ec4899" opacity="0.7" />
          <text x="170" y="24" fill="#ec4899" fontSize="8" fontFamily="monospace">Unseen Gen</text>

          <path d="M 20 80 C 100 50, 150 40, 220 15" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>

        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-zinc-400">
          50 examples per generator
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-purple-300">
          50 test conditions
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>Adaptation: Rapid Few-Shot</span>
        <span>Generalization: Unseen Diffusion</span>
      </div>
    </div>
  );
};

// 6. TaxCalc Pakistan Graphic
const TaxGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <span className="text-zinc-200">Flutter Property Tax Engine</span>
        <span className="text-emerald-400">PKR Currency</span>
      </div>

      <div className="space-y-2">
        {/* Parties status pill bar */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-2 rounded bg-zinc-800/40 border border-zinc-700/60 flex items-center justify-between">
            <span className="text-zinc-400">Buyer Share:</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">Filer (3%)</span>
          </div>
          <div className="p-2 rounded bg-zinc-800/40 border border-zinc-700/60 flex items-center justify-between">
            <span className="text-zinc-400">Seller Share:</span>
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Non-Filer (6%)</span>
          </div>
        </div>

        {/* Statutory tax breakdown */}
        <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono space-y-1">
          <div className="flex items-center justify-between text-zinc-300">
            <span>Stamp Duty (3%)</span>
            <span className="text-zinc-400">Section 236K (Advance)</span>
          </div>
          <div className="flex items-center justify-between text-zinc-300">
            <span>PLRA &amp; Town Committee</span>
            <span className="text-zinc-400">CGT 236C Assessment</span>
          </div>
        </div>

        {/* PDF Export Banner */}
        <div className="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-between text-[10px] font-mono">
          <span className="text-emerald-300">Audit-Ready Report</span>
          <span className="text-emerald-400 font-semibold">PDF Generated &amp; Saved</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>State: Provider &amp; SharedPrefs</span>
        <span>Platform: Cross-Platform Flutter</span>
      </div>
    </div>
  );
};

// 7. Parallel Plagiarism Checker Graphic
const ParallelGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <span className="text-zinc-200">Multiprocessing AST Pipeline</span>
        <span className="text-cyan-400">nC2 Pairs</span>
      </div>

      {/* Parallel Worker Cores grid */}
      <div className="grid grid-cols-4 gap-1.5 text-center font-mono text-[9px]">
        {['Core 0', 'Core 1', 'Core 2', 'Core 3'].map((core, i) => (
          <div
            key={core}
            className="p-1.5 rounded bg-zinc-800/50 border border-cyan-500/30 flex flex-col items-center justify-center gap-1"
          >
            <span className="text-zinc-400">{core}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[8px] text-cyan-300 font-semibold">{(92 + i * 2)}%</span>
          </div>
        ))}
      </div>

      {/* Side-by-side diff preview snippet */}
      <div className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-[10px] font-mono space-y-1">
        <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800/80 pb-1">
          <span>file_alpha.py ↔ file_beta.py</span>
          <span className="text-rose-400 font-bold">89.4% Match</span>
        </div>
        <div className="text-[9px] text-zinc-500 leading-tight">
          Normalized syntax tokens · Stripped docstrings &amp; imports
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>UI: Streamlit</span>
        <span>Parallelism: Python Multiprocessing</span>
      </div>
    </div>
  );
};

// 8. Topaz Executive Simulation Graphic
const TopazGraphic: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm px-6 py-4 flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-zinc-200">Topaz-VBE Quarterly Cycle</span>
        </div>
        <span className="text-emerald-400">Quarter 4 Active</span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-1.5 text-center font-mono">
        <div className="p-1.5 rounded bg-zinc-800/40 border border-zinc-700/60">
          <span className="block text-[9px] text-zinc-400">Net Revenue</span>
          <span className="block text-[11px] font-bold text-zinc-100">$1.24M</span>
        </div>
        <div className="p-1.5 rounded bg-zinc-800/40 border border-zinc-700/60">
          <span className="block text-[9px] text-zinc-400">Op. Margin</span>
          <span className="block text-[11px] font-bold text-emerald-400">+18.2%</span>
        </div>
        <div className="p-1.5 rounded bg-zinc-800/40 border border-zinc-700/60">
          <span className="block text-[9px] text-zinc-400">Depreciation</span>
          <span className="block text-[11px] font-bold text-amber-300">2.5% Bal</span>
        </div>
      </div>

      {/* Subsystem Matrix */}
      <div className="space-y-1.5 text-[10px] font-mono">
        <div className="p-2 rounded bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
          <span className="text-zinc-300">Operations &amp; Plant:</span>
          <span className="text-emerald-400">97.4% Machine Efficiency</span>
        </div>
        <div className="p-2 rounded bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
          <span className="text-zinc-300">Multi-Market Logistics:</span>
          <span className="text-cyan-400">North · South · West · Export</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
        <span>Deterministic Financials</span>
        <span>Browser-Only Executive Sim</span>
      </div>
    </div>
  );
};

