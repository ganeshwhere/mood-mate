import { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [timer, setTimer] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const phases = {
    inhale: { duration: 4, label: 'Breathe In', color: 'bg-blue-500' },
    hold: { duration: 7, label: 'Hold', color: 'bg-green-500' },
    exhale: { duration: 8, label: 'Breathe Out', color: 'bg-purple-500' },
    rest: { duration: 2, label: 'Rest', color: 'bg-gray-400' },
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer(prev => {
          const currentPhaseDuration = phases[currentPhase].duration;
          if (prev >= currentPhaseDuration) {
            // Move to next phase
            switch (currentPhase) {
              case 'inhale':
                setCurrentPhase('hold');
                return 0;
              case 'hold':
                setCurrentPhase('exhale');
                return 0;
              case 'exhale':
                setCurrentPhase('rest');
                return 0;
              case 'rest':
                setCurrentPhase('inhale');
                setCyclesCompleted(prev => prev + 1);
                return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, currentPhase]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimer(0);
    setCyclesCompleted(0);
  };

  const currentPhaseDuration = phases[currentPhase].duration;
  const progress = (timer / currentPhaseDuration) * 100;

  return (
    <div className="p-6 bg-card rounded-xl border shadow-sm animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">4-7-8 Breathing Exercise</h3>
      <p className="mb-4 text-muted-foreground">
        This breathing technique can help reduce anxiety and help you fall asleep.
      </p>

      <div className="flex flex-col items-center my-6">
        <div className="relative mb-4">
          <div
            className={cn(
              'w-48 h-48 rounded-full flex items-center justify-center text-2xl font-bold transition-all',
              phases[currentPhase].color,
              'opacity-20'
            )}
          />
          <div
            className={cn(
              'absolute inset-0 rounded-full transition-all',
              phases[currentPhase].color,
              'opacity-30'
            )}
            style={{
              clipPath: `circle(${progress}% at center)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">{timer}</span>
            <span className="font-medium text-lg">{phases[currentPhase].label}</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-center">
          <p>Cycles completed: {cyclesCompleted}</p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={toggleActive}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            {isActive ? <Pause size={18} /> : <Play size={18} />}
            <span>{isActive ? 'Pause' : 'Start'}</span>
          </button>
          <button
            onClick={resetExercise}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground"
          >
            <RefreshCw size={18} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-sm border-t pt-4">
        <h4 className="font-medium mb-2">Instructions:</h4>
        <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
          <li>Exhale completely through your mouth, making a whoosh sound.</li>
          <li>Close your mouth and inhale quietly through your nose to a count of 4.</li>
          <li>Hold your breath for a count of 7.</li>
          <li>Exhale completely through your mouth, making a whoosh sound to a count of 8.</li>
        </ol>
      </div>
    </div>
  );
};

export default BreathingExercise;
