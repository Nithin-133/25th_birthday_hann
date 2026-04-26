import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Define your 5 questions here
const TRIVIA_QUESTIONS = [
  { q: 'Which movie did we watch at our first movie date?', a: 'saiyaara' },
  { q: 'Where was our first kiss?', a: 'mall' },
  {
    q: 'Which color outfit did we wear on our first day of relationship',
    a: 'white',
  },
  { q: 'what was our first date venue', a: 'citrus trail' },
  { q: 'What month is our anniversary?', a: 'may' },
];

const TriviaStage = ({ isMidnight, onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);

  const checkAnswer = () => {
    const correctAnswer = TRIVIA_QUESTIONS[currentQ].a;

    if (answer.toLowerCase().trim() === correctAnswer) {
      if (currentQ < TRIVIA_QUESTIONS.length - 1) {
        // Move to next question
        setCurrentQ(currentQ + 1);
        setAnswer('');
        setError(false);
      } else {
        // All 5 answered correctly
        onComplete();
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <motion.div
      key="stage2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex flex-col items-center text-center w-full max-w-sm"
    >
      <span className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-4">
        Memory Check ({currentQ + 1} of 5)
      </span>

      <AnimatePresence mode="wait">
        <motion.h2
          key={currentQ}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-3xl font-serif mb-8 min-h-[80px] flex items-center justify-center"
        >
          {TRIVIA_QUESTIONS[currentQ].q}
        </motion.h2>
      </AnimatePresence>

      <div className="w-full relative">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
          placeholder="Type your answer..."
          className={`w-full px-6 py-4 rounded-xl border text-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition-all ${
            error
              ? 'border-red-400 bg-red-50 text-red-900'
              : isMidnight
              ? 'bg-slate-800 border-slate-700 text-white'
              : 'bg-white border-stone-200'
          }`}
        />
        <button
          onClick={checkAnswer}
          className="absolute right-2 top-2 bottom-2 aspect-square bg-[#E8445A] rounded-lg flex items-center justify-center text-white hover:bg-rose-600 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-4 font-medium">
          Hmm... try again!
        </p>
      )}
    </motion.div>
  );
};

export default TriviaStage;
