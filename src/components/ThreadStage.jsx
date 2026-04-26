import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ThreadStage = ({ onComplete }) => {
  const [threadTraced, setThreadTraced] = useState(false);

  return (
    <motion.div 
      key="stage3" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="flex flex-col items-center text-center w-full"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-4">The Final Step</span>
      <h2 className="text-3xl font-serif mb-12">Follow the thread of fate...</h2>
      
      <div className="relative w-64 h-64 mb-12">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(232,68,90,0.5)]">
          <motion.path
            d="M 50,80 C 0,50 0,20 25,10 C 50,0 50,30 50,30 C 50,30 50,0 75,10 C 100,20 100,50 50,80 Z"
            fill="transparent"
            stroke="#E8445A"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: threadTraced ? 1 : 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            onAnimationComplete={() => {
              // FIXED: Only trigger completion if the thread was actually pulled
              if (threadTraced) {
                setTimeout(() => onComplete(), 1000);
              }
            }}
          />
        </svg>
      </div>

      <motion.button 
        onPointerDown={() => setThreadTraced(true)}
        className="px-8 py-3 rounded-full bg-stone-100 text-stone-600 border border-stone-200 uppercase tracking-widest text-xs shadow-sm active:bg-stone-200"
      >
        Hold to trace
      </motion.button>
    </motion.div>
  );
};

export default ThreadStage;