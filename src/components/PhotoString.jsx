import React from 'react';
import { motion } from 'framer-motion';

// Added missing captions to 5 and 6 so they don't break the layout!
const photos = [
  {
    id: 1,
    src: 'https://files.catbox.moe/ec9l34.jpeg',
  },
  {
    id: 2,
    src: 'https://files.catbox.moe/g7m7cl.jpeg',
  },
  {
    id: 3,
    src: 'https://files.catbox.moe/tidtrj.jpeg',
  },
  {
    id: 4,
    src: 'https://files.catbox.moe/08nnkj.jpeg',
  },
  {
    id: 5,
    src: 'https://files.catbox.moe/eex2jc.jpeg',
  },
  {
    id: 6,
    src: 'https://files.catbox.moe/gsmveq.jpeg',
  },
];

const PhotoString = ({ isMidnight }) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 md:py-16 px-4 sm:px-6 overflow-hidden min-h-[500px]">
      {/* RESPONSIVE ROPES: 
        Mobile (3 rows) needs 3 ropes. 
        Tablet/Desktop (2 rows) needs 2 ropes. 
      */}
      <div
        className={`absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col justify-around transition-opacity duration-1000 ${
          isMidnight ? 'opacity-20' : 'opacity-40'
        } z-0`}
      >
        {/* Rope 1: Always visible */}
        <div
          className={`w-[110%] -ml-[5%] h-24 md:h-32 border-b-[2px] rounded-[50%] mt-8 md:mt-12 ${
            isMidnight ? 'border-slate-600' : 'border-stone-300'
          }`}
        ></div>

        {/* Rope 2: Always visible */}
        <div
          className={`w-[110%] -ml-[5%] h-24 md:h-32 border-b-[2px] rounded-[50%] ${
            isMidnight ? 'border-slate-600' : 'border-stone-300'
          }`}
        ></div>

        {/* Rope 3: ONLY visible on small mobile screens (because photos wrap to 3 rows) */}
        <div
          className={`w-[110%] -ml-[5%] h-24 border-b-[2px] rounded-[50%] block md:hidden ${
            isMidnight ? 'border-slate-600' : 'border-stone-300'
          }`}
        ></div>
      </div>

      {/* RESPONSIVE GRID: 
        Mobile: w-[42%] (2 per row)
        Small Tablet: sm:w-[30%] (3 per row)
        Tablet: md:w-[25%] (3-4 per row)
        Desktop: lg:w-[20%] (4-5 per row)
      */}
      <div className="relative z-10 flex flex-wrap justify-center gap-x-4 gap-y-12 sm:gap-x-8 sm:gap-y-16 md:gap-x-12 md:gap-y-24">
        {photos.map((photo, index) => {
          const rotations = [
            'rotate-[-4deg]',
            'rotate-[3deg]',
            'rotate-[-2deg]',
            'rotate-[4deg]',
          ];
          const rotationClass = rotations[index % 4];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`w-[42%] sm:w-[30%] md:w-[25%] lg:w-[20%] relative group ${rotationClass} hover:rotate-0 hover:scale-105 transition-all duration-300 hover:z-20`}
            >
              {/* The Pin */}
              <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-3 h-5 md:w-4 md:h-6 bg-white/90 backdrop-blur-md border border-stone-200 rounded shadow-[0_0_15px_rgba(255,220,100,0.9)] z-20 flex flex-col items-center justify-start pt-1">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#FFF5C3] shadow-[0_0_10px_#FFF5C3]"></div>
              </div>

              {/* The Polaroid Surface */}
              <div
                className={`p-1.5 pb-6 sm:p-2 sm:pb-8 md:p-3 md:pb-12 rounded-sm border relative overflow-hidden transition-colors duration-1000 ${
                  isMidnight
                    ? 'bg-slate-800 border-slate-700 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.6)]'
                    : 'bg-white border-stone-200 shadow-xl'
                }`}
              >
                {/* The Image Container */}
                <div
                  className={`w-full pt-[100%] relative border overflow-hidden ${
                    isMidnight
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-stone-100 border-stone-100'
                  }`}
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-center text-[8px] md:text-[10px] uppercase tracking-widest ${
                      isMidnight ? 'text-slate-600' : 'text-stone-400'
                    }`}
                  >
                    Loading...
                  </div>
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    loading="lazy"
                  />
                </div>

                {/* Responsive Caption Text */}
                <p
                  className={`absolute bottom-1.5 sm:bottom-2 md:bottom-4 left-0 w-full text-center font-serif italic text-xs sm:text-sm md:text-base transition-colors duration-1000 ${
                    isMidnight ? 'text-slate-300' : 'text-stone-600'
                  }`}
                >
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoString;
