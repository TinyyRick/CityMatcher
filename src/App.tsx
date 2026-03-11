import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Results from './components/Results';

export default function App() {
  const [stage, setStage] = useState<'landing' | 'quiz' | 'results'>('landing');
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleStart = () => {
    setStage('quiz');
  };

  const handleComplete = (finalAnswers: Record<string, number>) => {
    setAnswers(finalAnswers);
    setStage('results');
  };

  const handleRestart = () => {
    setAnswers({});
    setStage('landing');
  };

  return (
    <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
      <AnimatePresence mode="wait">
        {stage === 'landing' && <Landing key="landing" onStart={handleStart} />}
        {stage === 'quiz' && <Quiz key="quiz" onComplete={handleComplete} />}
        {stage === 'results' && <Results key="results" answers={answers} onRestart={handleRestart} />}
      </AnimatePresence>
    </div>
  );
}
