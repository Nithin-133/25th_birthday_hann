import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

const ScannerStage = ({ isMidnight, onComplete }) => {
  const [scanProgress, setScanProgress] = useState(0);
  const scanInterval = useRef(null);

  const startScan = () => {
    scanInterval.current = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval.current);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const stopScan = () => {
    clearInterval(scanInterval.current);
    if (scanProgress < 100) setScanProgress(0);
  };

  return (
    <motion.div 
      key="stage1" 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.1 }} 
      className="flex flex-col items-center text-center"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-4">Verification Required</span>
      <h2 className="text-3xl font-serif mb-16">Soulmate Identity Check</h2>
      
      {/* FIXED ALIGNMENT: Wrapper ensures absolute centering */}
      <div className="relative flex items-center justify-center w-32 h-32">
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle cx="64" cy="64" r="60" fill="none" stroke={isMidnight ? '#1E293B' : '#EAE0D1'} strokeWidth="4" />
          <circle cx="64" cy="64" r="60" fill="none" stroke="#E8445A" strokeWidth="4" strokeDasharray="377" strokeDashoffset={377 - (377 * scanProgress) / 100} className="transition-all duration-100" />
        </svg>
        
        <motion.button
          onPointerDown={startScan}
          onPointerUp={stopScan}
          onPointerLeave={stopScan}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-colors border shadow-lg ${
            scanProgress > 0 ? 'bg-rose-50 border-rose-200' : (isMidnight ? 'bg-slate-800 border-slate-700' : 'bg-white border-stone-200')
          }`}
        >
          <Fingerprint className={`w-12 h-12 transition-colors ${scanProgress > 0 ? 'text-[#E8445A]' : 'text-stone-300'}`} />
        </motion.button>
      </div>
      <p className="mt-12 text-sm uppercase tracking-widest opacity-60 animate-pulse">Press and hold</p>
    </motion.div>
  );
};

export default ScannerStage;