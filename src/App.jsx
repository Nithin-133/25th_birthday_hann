import React, { useState } from 'react';
import HeartTree from './components/HeartTree';
import PhotoString from './components/PhotoString';
import { Heart, Stars, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MessageReveal from './components/MessageReveal';

function App() {
  // STATE 1: The Heart Trap Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  // STATE 2: The Midnight Theme Switch
  const [isMidnight, setIsMidnight] = useState(false);

  // Trap Button Logic
  const noPhrases = [
    'No',
    'Are you sure?',
    'Think again!',
    'Last chance...',
    "Don't do this to me!",
    "You're breaking my heart ;(",
  ];
  const handleNoClick = () => setNoCount(noCount + 1);
  const yesButtonSize = noCount * 20 + 16;

  return (
    <div
      className={`min-h-screen font-sans selection:bg-rose-100 transition-colors duration-1000 relative ${
        isMidnight
          ? 'bg-[#0B1121] text-slate-200'
          : 'bg-[#FDFBF7] text-[#554433]'
      }`}
    >
      {/* Atmosphere Layer: Stars fade in at night */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0 ${
          isMidnight ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B1121]/90"></div>
      </div>

      {/* --- HEADER --- */}
      <nav
        className={`p-4 md:p-6 flex justify-between items-center border-b backdrop-blur-md sticky top-0 z-50 transition-colors duration-1000 ${
          isMidnight
            ? 'border-slate-800/50 bg-[#0B1121]/80'
            : 'border-stone-200/50 bg-[#FDFBF7]/80'
        }`}
      >
        <h1 className="font-serif text-lg md:text-2xl tracking-widest text-[#C5A059] uppercase">
          Celebration
        </h1>
        <div className="flex gap-4">
          {/* Heart Icon: Triggers Modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-110 transition-transform active:scale-95"
          >
            <Heart className="text-[#FFB6C1] fill-[#FFB6C1] w-6 h-6" />
          </button>

          {/* Stars Icon: Triggers Midnight Theme */}
          <button
            onClick={() => setIsMidnight(!isMidnight)}
            className="hover:scale-110 transition-transform active:scale-95"
          >
            <Stars
              className={`w-6 h-6 transition-colors duration-1000 ${
                isMidnight
                  ? 'text-yellow-300 fill-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.5)] rounded-full'
                  : 'text-[#C5A059]'
              }`}
            />
          </button>
        </div>
      </nav>

      {/* --- HEART TRAP MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center z-10 overflow-hidden"
            >
              {!yesPressed && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {yesPressed ? (
                <div className="text-center py-8">
                  <img
                    src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
                    alt="Happy Bears"
                    className="w-48 h-48 mx-auto mb-6 rounded-xl object-cover"
                  />
                  <h3 className="text-3xl font-serif text-[#FFB6C1] mb-2">
                    I knew it! ❤️
                  </h3>
                  <p className="text-stone-500">I love you too.</p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setYesPressed(false);
                      setNoCount(0);
                    }}
                    className="mt-8 px-6 py-2 bg-stone-100 text-stone-600 rounded-full text-sm font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="text-center w-full">
                  <img
                    src="https://media.tenor.com/VIChDQ6ejRQAAAAi/peach-cat-seung-gi.gif"
                    alt="Cute begging cat"
                    className="w-40 h-40 mx-auto mb-6 rounded-xl object-cover"
                  />
                  <h3 className="text-2xl font-serif text-stone-700 mb-8">
                    Do you love me?
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-h-[120px]">
                    <button
                      onClick={() => setYesPressed(true)}
                      className="bg-[#FFB6C1] text-white font-medium rounded-xl shadow-md hover:bg-[#ff9eb0] transition-all"
                      style={{
                        fontSize: yesButtonSize,
                        padding: `${yesButtonSize / 2}px ${yesButtonSize}px`,
                      }}
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleNoClick}
                      className="bg-stone-100 text-stone-600 px-6 py-3 rounded-xl font-medium hover:bg-stone-200 transition-colors"
                    >
                      {noPhrases[Math.min(noCount, noPhrases.length - 1)]}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- HERO / TREE SECTION --- */}
      <main className="w-full pt-10 md:pt-16 flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full px-4"
        >
          <span
            className={`text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3 md:mb-4 block transition-colors duration-1000 ${
              isMidnight ? 'text-slate-400' : 'text-stone-400'
            }`}
          >
            A Special Custom Creation
          </span>
          <h2
            className={`text-4xl md:text-5xl font-serif mb-8 md:mb-12 italic transition-colors duration-1000 ${
              isMidnight ? 'text-white' : 'text-stone-700'
            }`}
          >
            Happy 25th Birthday Baby !!
          </h2>
        </motion.div>

        {/* The wrapper handles the background color transition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`w-full max-w-[520px] mx-4 shadow-lg rounded-2xl overflow-hidden border transition-colors duration-1000 [&>canvas]:!w-full [&>canvas]:!h-auto [&>canvas]:!max-w-full relative z-10 ${
            isMidnight
              ? 'bg-[#0F172A] border-slate-700 shadow-slate-900/50'
              : 'bg-[#fdf6ec] border-[#EAE0D1] shadow-stone-200/50'
          }`}
        >
          <HeartTree isMidnight={isMidnight} />
        </motion.div>
      </main>

      {/* --- PHOTO STRING SECTION --- */}
      <section
        className={`border-t transition-colors duration-1000 mt-16 pb-12 relative z-10 ${
          isMidnight
            ? 'border-slate-800/50 bg-gradient-to-b from-[#0B1121] to-[#080d1a]'
            : 'border-[#EAE0D1]/50 bg-gradient-to-b from-[#FDFBF7] to-white'
        }`}
      >
        <div className="text-center pt-16 pb-4">
          <h3
            className={`text-2xl font-serif italic transition-colors duration-1000 ${
              isMidnight ? 'text-slate-300' : 'text-stone-600'
            }`}
          >
            A Trail of Memories
          </h3>
        </div>
        <PhotoString isMidnight={isMidnight} />
      </section>

      <section className={`relative z-50 w-full min-h-screen flex flex-col transition-colors duration-1000 ${
        isMidnight ? 'bg-[#080d1a]' : 'bg-white'
      }`}>
         <MessageReveal isMidnight={isMidnight} />
      </section>

      <footer
        className={`py-12 text-center border-t relative z-10 transition-colors duration-1000 ${
          isMidnight ? 'border-slate-800' : 'border-[#EAE0D1]'
        }`}
      >
        <p
          className={`text-xs uppercase tracking-widest transition-colors duration-1000 ${
            isMidnight ? 'text-slate-500' : 'text-stone-400'
          }`}
        >
          Made with precision and care.
        </p>
      </footer>
    </div>
  );
}

export default App;
