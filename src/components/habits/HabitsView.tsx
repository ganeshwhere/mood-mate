import { useState } from 'react';
import { Plus, X, Save, Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import PageContainer from '../layout/PageContainer';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface Habit {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[];
  streak: number;
  category: 'wellness' | 'productivity' | 'mindfulness' | 'other';
}

const categoryColors = {
  wellness: 'text-green-600 dark:text-green-400',
  productivity: 'text-blue-600 dark:text-blue-400',
  mindfulness: 'text-purple-600 dark:text-purple-400',
  other: 'text-gray-600 dark:text-gray-400',
};

const categoryBg = {
  wellness: 'bg-green-100/80 dark:bg-green-900/20',
  productivity: 'bg-blue-100/80 dark:bg-blue-900/20',
  mindfulness: 'bg-purple-100/80 dark:bg-purple-900/20',
  other: 'bg-gray-100/80 dark:bg-gray-800/40',
};

const initialHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    description: '10 minutes of mindfulness to start the day',
    frequency: 'daily',
    completedDates: ['2023-10-27', '2023-10-28'],
    streak: 2,
    category: 'mindfulness',
  },
  {
    id: '2',
    name: 'Gratitude Journal',
    description: "Write down 3 things I'm grateful for",
    frequency: 'daily',
    completedDates: ['2023-10-28'],
    streak: 1,
    category: 'mindfulness',
  },
  {
    id: '3',
    name: 'Exercise',
    description: '30 minutes of physical activity',
    frequency: 'daily',
    completedDates: [],
    streak: 0,
    category: 'wellness',
  },
];

const HabitsView = () => {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newHabit, setNewHabit] = useState<Omit<Habit, 'id' | 'completedDates' | 'streak'>>({
    name: '',
    description: '',
    frequency: 'daily',
    category: 'wellness',
  });

  const today = new Date().toISOString().split('T')[0];

  const handleAddHabit = () => {
    if (newHabit.name.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        ...newHabit,
        completedDates: [],
        streak: 0,
      };
      setHabits([...habits, habit]);
      setNewHabit({
        name: '',
        description: '',
        frequency: 'daily',
        category: 'wellness',
      });
      setIsAdding(false);
    }
  };

  const handleUpdateHabit = (id: string) => {
    if (newHabit.name.trim()) {
      setHabits(
        habits.map(habit =>
          habit.id === id
            ? {
                ...habit,
                name: newHabit.name,
                description: newHabit.description,
                frequency: newHabit.frequency,
                category: newHabit.category,
              }
            : habit
        )
      );
      setNewHabit({
        name: '',
        description: '',
        frequency: 'daily',
        category: 'wellness',
      });
      setIsEditing(null);
    }
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const startEditing = (habit: Habit) => {
    setIsEditing(habit.id);
    setNewHabit({
      name: habit.name,
      description: habit.description,
      frequency: habit.frequency,
      category: habit.category,
    });
  };

  const toggleHabitCompletion = (id: string) => {
    setHabits(
      habits.map(habit => {
        if (habit.id === id) {
          const isCompletedToday = habit.completedDates.includes(today);
          let newCompletedDates;
          let newStreak;

          if (isCompletedToday) {
            // Remove today's date if already completed
            newCompletedDates = habit.completedDates.filter(date => date !== today);
            newStreak = habit.streak > 0 ? habit.streak - 1 : 0;
          } else {
            // Today's date if not completed
            newCompletedDates = [...habit.completedDates, today];
            newStreak = habit.streak + 1;
          }

          return {
            ...habit,
            completedDates: newCompletedDates,
            streak: newStreak,
          };
        }
        return habit;
      })
    );
  };

  // Calculate completion stats
  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => habit.completedDates.includes(today)).length;
  const completionPercentage = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;

  return (
    <PageContainer
      title="Habit Tracker"
      subtitle="Build positive routines for better mental health"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl border shadow-sm p-6 mb-6 dark:border-border">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">Your Habits</h3>
              <p className="text-muted-foreground">Track your daily and weekly routines</p>
            </div>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                <span>Add Habit</span>
              </button>
            )}
          </div>

          {/* Today's Progress */}
          <div className="mb-6 p-4 bg-accent/10 dark:bg-accent/20 rounded-lg">
            <h4 className="font-medium mb-2">Today's Progress</h4>
            <div className="flex items-center gap-3">
              <Progress value={completionPercentage} className="h-2 flex-1" />
              <span className="text-sm font-medium">
                {completedToday}/{totalHabits}
              </span>
            </div>
          </div>

          {isAdding && (
            <div className="mb-6 bg-accent/10 dark:bg-accent/20 p-4 rounded-lg animate-fade-in">
              <div className="mb-4">
                <label htmlFor="habitName" className="block text-sm font-medium mb-1">
                  Habit Name
                </label>
                <input
                  id="habitName"
                  type="text"
                  value={newHabit.name}
                  onChange={e => setNewHabit({ ...newHabit, name: e.target.value })}
                  className="w-full rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="e.g., Morning Meditation"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="habitDescription" className="block text-sm font-medium mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="habitDescription"
                  rows={2}
                  value={newHabit.description}
                  onChange={e => setNewHabit({ ...newHabit, description: e.target.value })}
                  className="w-full rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="Describe your habit..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium mb-1">
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    value={newHabit.frequency}
                    onChange={e =>
                      setNewHabit({
                        ...newHabit,
                        frequency: e.target.value as 'daily' | 'weekly',
                      })
                    }
                    className="w-full rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={newHabit.category}
                    onChange={e =>
                      setNewHabit({
                        ...newHabit,
                        category: e.target.value as
                          | 'wellness'
                          | 'productivity'
                          | 'mindfulness'
                          | 'other',
                      })
                    }
                    className="w-full rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="wellness">Wellness</option>
                    <option value="productivity">Productivity</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewHabit({
                      name: '',
                      description: '',
                      frequency: 'daily',
                      category: 'wellness',
                    });
                  }}
                  className="px-3 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm transition-colors"
                >
                  <X size={16} className="mr-1 inline" />
                  Cancel
                </button>
                <button
                  onClick={handleAddHabit}
                  disabled={!newHabit.name.trim()}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm disabled:opacity-50 transition-colors"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {habits.map(habit => (
              <div
                key={habit.id}
                className={cn(
                  'p-4 rounded-lg border relative hover:shadow-sm transition-shadow',
                  isEditing === habit.id ? 'ring-2 ring-primary' : '',
                  categoryBg[habit.category]
                )}
              >
                {isEditing === habit.id ? (
                  <div className="animate-fade-in space-y-3">
                    <input
                      type="text"
                      value={newHabit.name}
                      onChange={e => setNewHabit({ ...newHabit, name: e.target.value })}
                      className="w-full rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    <textarea
                      rows={2}
                      value={newHabit.description}
                      onChange={e => setNewHabit({ ...newHabit, description: e.target.value })}
                      className="w-full rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={newHabit.frequency}
                        onChange={e =>
                          setNewHabit({
                            ...newHabit,
                            frequency: e.target.value as 'daily' | 'weekly',
                          })
                        }
                        className="rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                      <select
                        value={newHabit.category}
                        onChange={e =>
                          setNewHabit({
                            ...newHabit,
                            category: e.target.value as
                              | 'wellness'
                              | 'productivity'
                              | 'mindfulness'
                              | 'other',
                          })
                        }
                        className="rounded-md p-2 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="wellness">Wellness</option>
                        <option value="productivity">Productivity</option>
                        <option value="mindfulness">Mindfulness</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => {
                          setIsEditing(null);
                          setNewHabit({
                            name: '',
                            description: '',
                            frequency: 'daily',
                            category: 'wellness',
                          });
                        }}
                        className="px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateHabit(habit.id)}
                        className="px-2 py-1 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground text-xs transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start">
                    <button
                      onClick={() => toggleHabitCompletion(habit.id)}
                      className="flex-shrink-0 mt-1 mr-3"
                    >
                      {habit.completedDates.includes(today) ? (
                        <CheckCircle className="text-primary" size={20} />
                      ) : (
                        <Circle className="text-muted-foreground" size={20} />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{habit.name}</h4>
                        <span
                          className={cn(
                            'text-xs px-2 py-0.5 rounded-full',
                            categoryColors[habit.category]
                          )}
                        >
                          {habit.category}
                        </span>
                      </div>
                      {habit.description && (
                        <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>
                      )}
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span className="mr-4">
                          {habit.frequency === 'daily' ? 'Daily' : 'Weekly'}
                        </span>
                        <span className="flex items-center">
                          <CheckCircle size={12} className="mr-1" />
                          Streak: {habit.streak}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => startEditing(habit)}
                        className="p-1 rounded-full hover:bg-secondary"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteHabit(habit.id)}
                        className="p-1 rounded-full hover:bg-secondary"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {habits.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No habits tracked yet.</p>
              <p className="text-sm">Start by adding a habit you want to develop!</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t dark:border-border">
            <h4 className="font-medium mb-2">Tips for Habit Building:</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              <li>Start small - focus on one or two habits at a time</li>
              <li>Be consistent - try to do it at the same time each day</li>
              <li>Track your progress to stay motivated</li>
              <li>Link new habits to existing routines</li>
              <li>Celebrate your streaks and progress!</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default HabitsView;
