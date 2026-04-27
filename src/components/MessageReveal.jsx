import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ScannerStage from './ScannerStage';
import TriviaStage from './TriviaStage';
import ThreadStage from './ThreadStage';
import FinaleStage from './FinaleStage';

const MessageReveal = ({ isMidnight }) => {
  const [stage, setStage] = useState(0);

  return (
    <>
      {/* The Entry Button */}
      {stage === 0 && (
        <div className="w-full flex justify-center py-24">
          <button
            onClick={yourClickFunctionHere} // Keep your existing onClick handler!
            className={`group relative overflow-hidden rounded-full px-10 py-5 transition-all duration-500 hover:scale-105 active:scale-95 ${isMidnight
                ? 'bg-slate-900 border border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:shadow-[0_0_40px_rgba(244,63,94,0.3)] hover:border-rose-500/60'
                : 'bg-white border border-[#C5A059]/30 shadow-[0_15px_30px_rgba(197,160,89,0.1)] hover:shadow-[0_20px_40px_rgba(197,160,89,0.2)] hover:border-[#C5A059]/60'
              }`}
          >
            {/* Elegant Hover Glow */}
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10 ${isMidnight ? 'bg-gradient-to-r from-rose-500 to-purple-500' : 'bg-gradient-to-r from-[#C5A059] to-[#FFB6C1]'
              }`}></div>

            {/* Premium Typography */}
            <span className={`relative z-10 font-serif text-sm md:text-base uppercase tracking-[0.3em] font-medium transition-colors duration-500 ${isMidnight ? 'text-rose-300' : 'text-[#C5A059]'
              }`}>
              Unlock Final Gift
            </span>
          </button>
        </div>
      )}

      {/* The Full Screen Orchestrator */}
      <AnimatePresence>
        {stage > 0 && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 overflow-hidden ${isMidnight
                ? 'bg-[#0B1121] text-slate-200'
                : 'bg-[#FDFBF7] text-[#554433]'
              }`}
          >
            <button
              onClick={() => setStage(0)}
              className="absolute top-6 right-6 p-2 opacity-50 hover:opacity-100 z-50"
            >
              <X className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              {stage === 1 && (
                <ScannerStage
                  isMidnight={isMidnight}
                  onComplete={() => setStage(2)}
                />
              )}
              {stage === 2 && (
                <TriviaStage
                  isMidnight={isMidnight}
                  onComplete={() => setStage(3)}
                />
              )}
              {stage === 3 && <ThreadStage onComplete={() => setStage(4)} />}
              {stage === 4 && <FinaleStage isMidnight={isMidnight} />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessageReveal;
