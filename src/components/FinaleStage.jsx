import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Pause, Music } from 'lucide-react';

const FinaleStage = ({ isMidnight }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Autoplay when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      // The browser allows this because she already clicked through previous stages!
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true); // Start spinning the vinyl
        })
        .catch((error) => {
          // Fallback just in case her specific browser blocks it
          //console.warn('Autoplay was prevented by the browser:', error);
        });
    }

    // Cleanup audio if they somehow close the modal
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <motion.div
      key="stage4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-5xl h-full flex flex-col md:flex-row gap-12 overflow-y-auto pb-24 pt-8 md:pt-16 items-center md:items-start"
    >
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="https://files.catbox.moe/efyi4l.mp3" loop />

      {/* --- LEFT SIDE: The Midnight Vinyl Player --- */}
      <div className="w-full md:w-5/12 flex flex-col items-center justify-center pt-8 md:sticky md:top-10">
        {/* The Record Player Frame */}
        <div
          className={`relative p-4 md:p-6 rounded-3xl shadow-2xl ${
            isMidnight
              ? 'bg-slate-800/80 border border-slate-700'
              : 'bg-white border border-stone-200'
          }`}
        >
          {/* The Spinning Vinyl Record */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center shadow-inner overflow-hidden border-4 ${
              isMidnight
                ? 'bg-[#0a0a0a] border-slate-900'
                : 'bg-[#111] border-stone-800'
            }`}
          >
            {/* Vinyl Grooves (CSS Rings) */}
            <div className="absolute inset-2 rounded-full border border-white/5"></div>
            <div className="absolute inset-6 rounded-full border border-white/5"></div>
            <div className="absolute inset-10 rounded-full border border-white/10"></div>
            <div className="absolute inset-16 rounded-full border border-white/5"></div>

            {/* --- NEW: Center Label with Custom Image --- */}
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.8)] overflow-hidden border border-white/10">
              {/* REPLACE THIS SRC WITH YOUR ACTUAL IMAGE LINK */}
              <img
                src="https://files.catbox.moe/h1ojc5.jpeg"
                alt="Record Center"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Spindle hole (The black dot in the center) */}
              <div className="relative z-10 w-3 h-3 rounded-full bg-[#111] border border-white/30 shadow-inner"></div>
            </div>

            {/* Vinyl Lighting Reflection (Static while record spins) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent mix-blend-overlay pointer-events-none"></div>
          </motion.div>

          {/* Play/Pause Controls */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={togglePlay}
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                isMidnight
                  ? 'bg-rose-500 text-white'
                  : 'bg-[#E8445A] text-white'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>
            <div className="flex items-center gap-2 opacity-60">
              <Music className="w-3 h-3 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-medium">
                {isPlaying ? 'Now Playing' : 'Play Soundtrack'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: The Love Letter --- */}
      <div className="w-full md:w-7/12 flex flex-col justify-center px-4 md:px-8">
        <h2
          className={`text-4xl md:text-6xl font-serif italic mb-10 relative ${
            isMidnight ? 'text-rose-300' : 'text-[#C5A059]'
          }`}
        >
          Happy 25th Birthday
        </h2>

        {/* The Letter Content */}
        <div
          className={`space-y-6 font-serif leading-loose text-base md:text-lg tracking-wide ${
            isMidnight ? 'text-slate-300' : 'text-stone-700'
          }`}
        >
          <p>My one and only, </p>
          <p>
            Other than Harshitha whoever is reading don't read I'm warning you
            😂 (I'm not responsible if you feel cringe){' '}
          </p>
          <p>
            Silver jublee it is, you know right this birthday was the turning
            point, our relationship started with this point if you remember 😉.
          </p>
          <p>
            Actually I'm out of words i don't know what to say it is been almost
            3 fantabulous years and way more to go. The whole point is Thank you
            💖 for all the joy, happiness and overwhelming support you have
            showered towards me.
          </p>
          <p>
            I don't know how you'll react for all this 😂😂...... my intention
            is to surprise you with something or the other on every occassion.
          </p>
          <p>
            I love you too much I guess 😘💖, though this addiction just keeps
            growing every single day and also you need to concentrate towards
            your health.
          </p>
        </div>

        {/* Sign-off */}
        <div className="mt-16 pt-8 border-t border-stone-200/20 flex justify-between items-center">
          <span className="text-xs uppercase tracking-[0.3em] opacity-50">
            Forever yours
          </span>
          <Heart className="w-6 h-6 text-[#FFB6C1] fill-[#FFB6C1]" />
        </div>
      </div>
    </motion.div>
  );
};

export default FinaleStage;
