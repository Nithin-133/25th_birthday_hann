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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStage(1)}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E8445A] to-[#BE123C] text-white font-serif italic text-lg shadow-[0_0_30px_rgba(232,68,90,0.4)] hover:shadow-[0_0_40px_rgba(232,68,90,0.6)] transition-all"
          >
            Unlock Final Gift
          </motion.button>
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
            className={`fixed inset-0 z-[200] flex flex-col items-center justify-center p-6 overflow-hidden ${
              isMidnight
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
