import React from 'react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = '', size = 18 }) => {
  const norm = name.trim().toLowerCase();

  // Python
  if (norm === 'python') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M11.92 2C6.98 2 7.29 4.14 7.29 4.14V6.36H12V7.07H5.16S2 6.72 2 11.66c0 4.93 2.76 4.76 2.76 4.76h1.65v-2.31s-.09-2.76 2.72-2.76h4.69s2.63.04 2.63-2.58V4.58S16.85 2 11.92 2zM9.54 3.48a.95.95 0 110 1.9.95.95 0 010-1.9z"
          fill="#3b82f6"
        />
        <path
          d="M12.08 22c4.94 0 4.63-2.14 4.63-2.14v-2.22H12v-.71h6.84s3.16.35 3.16-4.59c0-4.93-2.76-4.76-2.76-4.76h-1.65v2.31s.09 2.76-2.72 2.76H10.18s-2.63-.04-2.63 2.58v4.19S7.15 22 12.08 22zm2.38-1.48a.95.95 0 110-1.9.95.95 0 010 1.9z"
          fill="#fbbf24"
        />
      </svg>
    );
  }

  // C#
  if (norm === 'c#' || norm === 'csharp') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4.5" fill="#8b5cf6" fillOpacity="0.15" stroke="#a78bfa" strokeWidth="1.2" />
        <path
          d="M10.8 8.4a3.8 3.8 0 100 7.2 3.6 3.6 0 002.5-.9l-.9-1.2a2.3 2.3 0 01-1.6.6 2.3 2.3 0 110-4.6c.6 0 1.2.2 1.6.6l.9-1.2a3.6 3.6 0 00-2.5-.5z"
          fill="#a78bfa"
        />
        <path
          d="M15.5 10v1.1h1.1V10h.8v1.1h.9v.8h-.9v1.4h.9v.8h-.9V15h-.8v-1.1h-1.1V15h-.8v-1.1H14v-.8h.8v-1.4H14v-.8h.8V10h.7zm.7 1.9v1.4h1.1v-1.4h-1.1z"
          fill="#c4b5fd"
        />
      </svg>
    );
  }

  // .NET or ASP.NET
  if (norm === '.net' || norm.includes('asp.net')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4.5" fill="#6366f1" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1.2" />
        <circle cx="5" cy="17" r="1.5" fill="#818cf8" />
        <path
          d="M7.5 17V7h1.8l3.4 6.2V7h1.6v10h-1.6l-3.6-6.4V17H7.5zm8.5-7.8h4.4v1.5h-2.7v2.6h2.4v1.5h-2.4v2.9h2.8V19H16V9.2z"
          fill="#818cf8"
        />
      </svg>
    );
  }

  // PostgreSQL
  if (norm === 'postgresql' || norm === 'postgres') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.6 4.8c1.3 0 2.4.9 2.7 2.2.4 1.7-.6 3.4-2.3 3.8l-.5.1v1.6c.9.2 1.6.8 1.9 1.7.3 1-.1 2-.9 2.5l-.8.5-1-.9c.4-.3.6-.8.4-1.3-.2-.5-.6-.9-1.2-1v-3.2c-.3 0-.6-.1-.9-.2l-.6 1.4-1.3-.6.7-1.6c-.6-.7-.9-1.6-.7-2.6.3-1.4 1.5-2.3 2.9-2.3h1.7zm-1.8 1.8c-.7 0-1.2.4-1.4 1-.2.6 0 1.2.5 1.5l.9.4v-2.9h0zm1.7 0v2.9l.4-.1c.7-.2 1.2-.8 1-1.6-.1-.7-.7-1.2-1.4-1.2z"
          fill="#38bdf8"
        />
      </svg>
    );
  }

  // SQL
  if (norm === 'sql') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#38bdf8" strokeWidth="1.5" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#38bdf8" strokeWidth="1.5" />
      </svg>
    );
  }

  // FastAPI
  if (norm === 'fastapi') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.2" />
        <path d="M12.5 4L6 13h5.5l-1 7L18 10h-5.5l1-6z" fill="#10b981" />
      </svg>
    );
  }

  // React
  if (norm === 'react') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="2.2" fill="#00d8ff" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#00d8ff" strokeWidth="1.3" transform="rotate(0 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#00d8ff" strokeWidth="1.3" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#00d8ff" strokeWidth="1.3" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  // Next.js
  if (norm === 'next.js' || norm === 'nextjs') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M9 8v8h1.8v-4.9l4.8 6.5c.3-.1.6-.3.9-.5L10.8 8H9z" fill="currentColor" />
        <path d="M15.2 8h1.8v5.5h-1.8z" fill="currentColor" />
      </svg>
    );
  }

  // Flutter
  if (norm === 'flutter') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M14.3 2.5L5.7 11.1l2.6 2.6L19.5 2.5H14.3z" fill="#38bdf8" />
        <path d="M14.3 12.8L10 17.1l4.3 4.4h5.2l-6.9-7 2.6-2.6 2.6 2.6 4.3-4.3h-5.2l-2.6 2.6z" fill="#0284c7" />
        <path d="M12.6 14.5l-2.6 2.6 4.3 4.4h5.2l-6.9-7z" fill="#0369a1" />
      </svg>
    );
  }

  // TypeScript
  if (norm === 'typescript' || norm === 'ts') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect width="24" height="24" rx="4.5" fill="#3178c6" fillOpacity="0.15" stroke="#3178c6" strokeWidth="1.2" />
        <path d="M5 10.5h5.5v1.5H8.6V19H7v-7H5v-1.5zm8 4c.6-.4 1.4-.7 2.2-.7 1.3 0 2 .6 2 1.6 0 .9-.6 1.4-1.8 1.9-1.4.5-2.2 1.2-2.2 2.4 0 1.6 1.3 2.6 3.1 2.6 1 0 1.8-.3 2.5-.7l-.4-1.3c-.6.3-1.3.6-2 .6-1.1 0-1.7-.5-1.7-1.3 0-.8.6-1.3 1.8-1.8 1.4-.6 2.2-1.3 2.2-2.5 0-1.6-1.2-2.6-3-2.6-.9 0-1.8.3-2.3.6l.4 1.3z" fill="#3178c6" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12.5 6.5c-2.3 0-3.8 1.2-4.3 3.5 1-.8 2.1-1.1 3.2-.8.6.2 1.1.7 1.6 1.2.8.9 1.8 1.9 3.8 1.9 2.3 0 3.8-1.2 4.3-3.5-1 .8-2.1 1.1-3.2.8-.6-.2-1.1-.7-1.6-1.2-.9-.9-1.9-1.9-3.8-1.9zm-6 5.8c-2.3 0-3.8 1.1-4.3 3.5 1-.8 2.1-1.1 3.2-.8.6.2 1.1.7 1.6 1.2.9.9 1.8 1.9 3.8 1.9 2.3 0 3.8-1.2 4.3-3.5-1 .8-2.1 1.1-3.2.8-.6-.2-1.1-.7-1.6-1.2-.8-.9-1.8-1.9-3.8-1.9z"
          fill="#38bdf8"
        />
      </svg>
    );
  }

  // PyTorch
  if (norm === 'pytorch') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M12.7 3.5a5.5 5.5 0 00-3.9 1.6 5.6 5.6 0 00-1.6 4v.4l2-2a3.6 3.6 0 012.6-1.1 3.6 3.6 0 013.6 3.6 3.6 3.6 0 01-1 2.5l-3.8 3.8a5.5 5.5 0 001.6 9.4 5.5 5.5 0 005.4-1.6 5.5 5.5 0 001.6-3.9c0-1.4-.5-2.7-1.5-3.8l-1.3 1.3c.7.7 1.1 1.6 1.1 2.5a3.6 3.6 0 01-3.6 3.6 3.6 3.6 0 01-2.5-1 3.6 3.6 0 01-.3-4.8l4-4a5.5 5.5 0 001.6-4 5.5 5.5 0 00-5-5.5z"
          fill="#f97316"
        />
        <circle cx="15.5" cy="5.5" r="1.2" fill="#ef4444" />
      </svg>
    );
  }

  // OpenCV
  if (norm === 'opencv') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="7" r="3.8" stroke="#ef4444" strokeWidth="1.8" />
        <circle cx="7.2" cy="15.8" r="3.8" stroke="#3b82f6" strokeWidth="1.8" />
        <circle cx="16.8" cy="15.8" r="3.8" stroke="#10b981" strokeWidth="1.8" />
      </svg>
    );
  }

  // YOLO / Computer Vision / Image Restoration
  if (norm.includes('yolo') || norm.includes('vision') || norm.includes('efficientnet')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#f59e0b" strokeWidth="1.4" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="3.5" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="12" y1="5" x2="12" y2="8.5" stroke="#f59e0b" strokeWidth="1.4" />
        <line x1="12" y1="15.5" x2="12" y2="19" stroke="#f59e0b" strokeWidth="1.4" />
        <line x1="5" y1="12" x2="8.5" y2="12" stroke="#f59e0b" strokeWidth="1.4" />
        <line x1="15.5" y1="12" x2="19" y2="12" stroke="#f59e0b" strokeWidth="1.4" />
      </svg>
    );
  }

  // RAG / pgvector / LLMs
  if (norm.includes('rag') || norm.includes('vector') || norm.includes('llm')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="6" cy="6" r="2.5" fill="#10b981" />
        <circle cx="18" cy="6" r="2.5" fill="#10b981" />
        <circle cx="12" cy="18" r="2.5" fill="#10b981" />
        <path d="M7.8 7.8L10.5 16M16.2 7.8L13.5 16M8.5 6h7" stroke="#10b981" strokeWidth="1.4" strokeDasharray="2 2" />
      </svg>
    );
  }

  // Git / GitHub
  if (norm === 'github') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }

  if (norm === 'git') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path
          d="M21.6 10.8l-8.4-8.4a1.8 1.8 0 00-2.5 0L8.2 4.9l3.2 3.2a2.3 2.3 0 012.9 2.9l3.1 3.1a2.3 2.3 0 11-1.3 1.3l-2.9-2.9v4.2a2.3 2.3 0 11-1.8 0V11a2.3 2.3 0 01-1.2-3L6.9 4.8 2.4 9.3a1.8 1.8 0 000 2.5l8.4 8.4a1.8 1.8 0 002.5 0l8.3-8.4a1.8 1.8 0 000-2.5z"
          fill="#f97316"
        />
      </svg>
    );
  }

  // Vercel
  if (norm === 'vercel') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2L23 21H1L12 2z" />
      </svg>
    );
  }

  // Docker
  if (norm.includes('docker')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 14h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm-3-3h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2h-2zm3 0h2v2h-2z" fill="#0284c7" />
        <path d="M22 13c-.4-.1-1.3-.1-1.9.4-.6.5-.9 1.1-.9 1.1s-1-.6-2.2-.4c-.3.1-.7.2-1 .4v-3.5H3v6c0 3.3 3.6 5 9 5s10-1.7 10-5c0-.9-.5-2.2-1-3l1-1z" stroke="#0284c7" strokeWidth="1.2" fill="#0284c7" fillOpacity="0.1" />
      </svg>
    );
  }

  // Kubernetes
  if (norm.includes('kubernetes') || norm === 'k8s') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="#326ce5" strokeWidth="1.3" />
        <path d="M12 5l6 3.5v7L12 19l-6-3.5v-7L12 5z" stroke="#326ce5" strokeWidth="1.2" />
        <circle cx="12" cy="12" r="2" fill="#326ce5" />
      </svg>
    );
  }

  // AWS / AWS EC2
  if (norm.includes('aws') || norm.includes('ec2')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 15c4.5 3 9.5 3 14 0" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18.5 13.5L20 15l-2 .8" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="5" y="11" fill="#f59e0b" fontSize="7" fontWeight="bold" fontFamily="monospace">AWS</text>
      </svg>
    );
  }

  // Terraform
  if (norm.includes('terraform')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 3h4.5v5.5H4zM9.5 8.5H14V14H9.5zM15 8.5h4.5V14H15zM9.5 14.5H14V20H9.5z" fill="#7c3aed" fillOpacity="0.8" />
      </svg>
    );
  }

  // Linux
  if (norm.includes('linux')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="13" rx="6" ry="7" fill="#fbbf24" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.3" />
        <circle cx="10" cy="10" r="1" fill="#18181b" />
        <circle cx="14" cy="10" r="1" fill="#18181b" />
        <path d="M11 13h2" stroke="#f97316" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // Jenkins
  if (norm.includes('jenkins')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="10" r="5" stroke="#ef4444" strokeWidth="1.3" fill="#ef4444" fillOpacity="0.1" />
        <path d="M7 17c1.5-2 3-2 5-2s3.5 0 5 2v3H7v-3z" stroke="#ef4444" strokeWidth="1.3" fill="#ef4444" fillOpacity="0.2" />
      </svg>
    );
  }

  // Ansible
  if (norm.includes('ansible')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="#ef4444" strokeWidth="1.3" />
        <path d="M7 18L12 6l5 12M9.5 13.5h5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // Nginx
  if (norm.includes('nginx')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1.2" />
        <path d="M7 17V7l10 10V7" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Grafana / Prometheus / Loki
  if (norm.includes('grafana') || norm.includes('prometheus') || norm.includes('loki')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="#f97316" strokeWidth="1.3" fill="#f97316" fillOpacity="0.1" />
        <path d="M12 7v5l3 3" stroke="#f97316" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M8 17h8" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  // Postman / Selenium / Cypress / JMeter / QA
  if (norm.includes('postman') || norm.includes('selenium') || norm.includes('cypress') || norm.includes('jmeter') || norm.includes('testing') || norm.includes('qa')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="4" width="18" height="16" rx="4" stroke="#10b981" strokeWidth="1.3" fill="#10b981" fillOpacity="0.1" />
      </svg>
    );
  }

  // Oracle / MySQL
  if (norm.includes('oracle') || norm.includes('mysql')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <ellipse cx="12" cy="7" rx="7" ry="2.5" stroke="#ea580c" strokeWidth="1.3" fill="#ea580c" fillOpacity="0.1" />
        <path d="M5 7v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V7" stroke="#ea580c" strokeWidth="1.3" />
        <path d="M5 12v5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-5" stroke="#ea580c" strokeWidth="1.3" />
      </svg>
    );
  }

  // Firebase / Firestore
  if (norm.includes('firebase') || norm.includes('firestore')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4.5 17L7 4.5l4 6.5L8.5 17H4.5z" fill="#f59e0b" fillOpacity="0.8" />
        <path d="M19.5 17L12 3l-3 7.5 10.5 6.5z" fill="#f97316" fillOpacity="0.9" />
      </svg>
    );
  }

  // GitHub Actions / CI/CD
  if (norm.includes('actions') || norm.includes('ci/cd')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="6" cy="6" r="2.5" stroke="#22c55e" strokeWidth="1.4" />
        <circle cx="18" cy="18" r="2.5" stroke="#22c55e" strokeWidth="1.4" />
        <circle cx="6" cy="18" r="2.5" stroke="#22c55e" strokeWidth="1.4" />
        <path d="M6 8.5v7M8.5 6h4a3.5 3.5 0 013.5 3.5v6" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    );
  }

  // REST APIs / Generic API
  if (norm.includes('api') || norm.includes('rest')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="3" y="5" width="18" height="14" rx="3" stroke="#8b5cf6" strokeWidth="1.4" />
        <path d="M7 12h10M14 9l3 3-3 3" stroke="#8b5cf6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Default fallback icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
};
