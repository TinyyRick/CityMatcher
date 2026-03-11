import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions } from '../data/questions';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function Quiz({ onComplete }: { onComplete: (answers: Record<string, number>) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [direction, setDirection] = useState(1);

  const question = questions[currentIndex];
  const currentAnswer = answers[question.key] || 5;

  const handleNext = () => {
    // Save default answer if not interacted
    if (answers[question.key] === undefined) {
      setAnswers(prev => ({ ...prev, [question.key]: 5 }));
    }

    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete({ ...answers, [question.key]: answers[question.key] || 5 });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({
      ...answers,
      [question.key]: parseInt(e.target.value, 10)
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-2xl mx-auto w-full bg-white">
      <div className="flex items-center justify-between mb-8 mt-4 md:mt-12">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 text-gray-400 hover:text-gray-900 disabled:opacity-0 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="text-sm font-medium text-gray-500">
          {currentIndex + 1} / {questions.length}
        </div>
        <div className="w-10" />
      </div>

      <div className="w-full bg-gray-100 h-2 rounded-full mb-12 overflow-hidden">
        <motion.div
          className="h-full bg-indigo-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col"
          >
            <h2 className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-2">
              {question.title}
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12 leading-tight">
              {question.text}
            </h3>

            <div className="mt-auto mb-24">
              <div className="flex justify-between text-sm font-medium text-gray-500 mb-6">
                <span>{question.minLabel}</span>
                <span>{question.maxLabel}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={currentAnswer}
                onChange={handleSliderChange}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="text-center mt-6 text-4xl font-bold text-indigo-600">
                {currentAnswer}
              </div>
              <motion.div 
                key={currentAnswer <= 3 ? 'low' : currentAnswer >= 8 ? 'high' : 'mid'}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4 text-lg font-medium text-indigo-900 h-8"
              >
                {currentAnswer <= 3 
                  ? question.dynamicLabels.low 
                  : currentAnswer >= 8 
                    ? question.dynamicLabels.high 
                    : question.dynamicLabels.mid}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleNext}
        className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mb-8 shadow-lg shadow-gray-200"
      >
        {currentIndex === questions.length - 1 ? '查看结果' : '下一题'}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
