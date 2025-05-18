import { useState } from 'react';
import {
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  Heart,
  Save,
  XCircle,
  BarChart4,
  LayoutGrid,
  List,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '../layout/PageContainer';
import { Progress } from '@/components/ui/progress';

const moodOptions = [
  {
    value: 1,
    label: 'Terrible',
    icon: Frown,
    color: 'text-red-500 border-red-500',
    background: 'bg-red-50 dark:bg-red-900/20',
  },
  {
    value: 2,
    label: 'Bad',
    icon: Frown,
    color: 'text-orange-500 border-orange-500',
    background: 'bg-orange-50 dark:bg-orange-900/20',
  },
  {
    value: 3,
    label: 'Okay',
    icon: Meh,
    color: 'text-yellow-500 border-yellow-500',
    background: 'bg-yellow-50 dark:bg-yellow-900/20',
  },
  {
    value: 4,
    label: 'Good',
    icon: Smile,
    color: 'text-green-500 border-green-500',
    background: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    value: 5,
    label: 'Great',
    icon: ThumbsUp,
    color: 'text-blue-500 border-blue-500',
    background: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    value: 6,
    label: 'Amazing',
    icon: Heart,
    color: 'text-purple-500 border-purple-500',
    background: 'bg-purple-50 dark:bg-purple-900/20',
  },
];

const emotionOptions = [
  // Negative emotions
  { label: 'Angry', category: 'negative', intensity: 3 },
  { label: 'Anxious', category: 'negative', intensity: 2 },
  { label: 'Sad', category: 'negative', intensity: 2 },
  { label: 'Stressed', category: 'negative', intensity: 2 },
  { label: 'Overwhelmed', category: 'negative', intensity: 3 },
  { label: 'Lonely', category: 'negative', intensity: 2 },
  { label: 'Frustrated', category: 'negative', intensity: 2 },
  { label: 'Disappointed', category: 'negative', intensity: 1 },
  // Neutral emotions
  { label: 'Calm', category: 'neutral', intensity: 1 },
  { label: 'Content', category: 'neutral', intensity: 1 },
  { label: 'Curious', category: 'neutral', intensity: 1 },
  { label: 'Surprised', category: 'neutral', intensity: 1 },
  { label: 'Nostalgic', category: 'neutral', intensity: 1 },
  // Positive emotions
  { label: 'Happy', category: 'positive', intensity: 2 },
  { label: 'Excited', category: 'positive', intensity: 3 },
  { label: 'Grateful', category: 'positive', intensity: 2 },
  { label: 'Inspired', category: 'positive', intensity: 2 },
  { label: 'Proud', category: 'positive', intensity: 2 },
  { label: 'Loving', category: 'positive', intensity: 2 },
  { label: 'Optimistic', category: 'positive', intensity: 2 },
  { label: 'Peaceful', category: 'positive', intensity: 1 },
];

const activityTags = [
  'Exercise',
  'Work',
  'Social',
  'Family',
  'Relaxation',
  'Entertainment',
  'Learning',
  'Nature',
  'Creative',
  'Travel',
  'Eating',
  'Shopping',
  'Reading',
  'Meditation',
  'Sleep',
];

// Mock previous entries - in a real app would come from backend
const mockEntries = [
  {
    id: '1',
    mood: 4,
    emotions: ['Happy', 'Grateful'],
    tags: ['Family', 'Social'],
    note: 'Had a lovely dinner with family',
    date: '2023-10-29T18:45:00',
  },
  {
    id: '2',
    mood: 2,
    emotions: ['Stressed', 'Anxious'],
    tags: ['Work'],
    note: 'Difficult meeting at work today',
    date: '2023-10-28T14:20:00',
  },
  {
    id: '3',
    mood: 5,
    emotions: ['Excited', 'Proud'],
    tags: ['Exercise', 'Nature'],
    note: 'Completed my first 10k run!',
    date: '2023-10-27T09:15:00',
  },
  {
    id: '4',
    mood: 3,
    emotions: ['Calm', 'Content'],
    tags: ['Reading', 'Relaxation'],
    note: 'Spent the evening reading my new book',
    date: '2023-10-26T21:30:00',
  },
  {
    id: '5',
    mood: 1,
    emotions: ['Sad', 'Lonely'],
    tags: [],
    note: 'Missing my friends who moved away',
    date: '2023-10-25T20:00:00',
  },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [entries, setEntries] = useState(mockEntries);
  const [viewMode, setViewMode] = useState<'form' | 'history' | 'analytics'>('form');
  const [historyView, setHistoryView] = useState<'grid' | 'list'>('grid');

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
  };

  const handleEmotionToggle = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      // Limit to 3 emotions
      if (selectedEmotions.length < 3) {
        setSelectedEmotions([...selectedEmotions, emotion]);
      }
    }
  };

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood === null) return;

    const newEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      emotions: selectedEmotions,
      tags: selectedTags,
      note,
      date: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);

    // Reset form
    setSelectedMood(null);
    setSelectedEmotions([]);
    setNote('');
    setSelectedTags([]);

    // Show success toast
    // toast({ title: "Mood tracked successfully!" });
  };

  const getEmotionCategoryCount = () => {
    const counts = {
      positive: 0,
      neutral: 0,
      negative: 0,
    };

    entries.forEach(entry => {
      entry.emotions.forEach(emotion => {
        const found = emotionOptions.find(e => e.label === emotion);
        if (found) {
          counts[found.category as keyof typeof counts]++;
        }
      });
    });

    return counts;
  };

  const emotionCounts = getEmotionCategoryCount();
  const totalEmotions = emotionCounts.positive + emotionCounts.neutral + emotionCounts.negative;

  const getMoodOption = (value: number) =>
    moodOptions.find(option => option.value === value) || moodOptions[0];

  return (
    <PageContainer title="Mood Tracker" subtitle="How are you feeling today?">
      <div className="mb-6">
        <div className="bg-card rounded-lg border p-1 inline-flex">
          <button
            onClick={() => setViewMode('form')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'form'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            Track Mood
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'history'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            History
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'analytics'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            Insights
          </button>
        </div>
      </div>

      {viewMode === 'form' && (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h2 className="text-lg font-medium mb-4">How are you feeling?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {moodOptions.map(option => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleMoodSelect(option.value)}
                    className={cn(
                      'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all',
                      'hover:bg-secondary',
                      selectedMood === option.value
                        ? `${option.color} ${option.background}`
                        : 'border-border'
                    )}
                  >
                    <Icon
                      size={36}
                      className={selectedMood === option.value ? option.color : 'text-foreground'}
                    />
                    <span className="mt-2 text-sm font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Which emotions are you experiencing?</h2>
              <span className="text-sm text-muted-foreground">Select up to 3</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {emotionOptions.map(emotion => (
                <button
                  key={emotion.label}
                  type="button"
                  onClick={() => handleEmotionToggle(emotion.label)}
                  disabled={
                    !selectedEmotions.includes(emotion.label) && selectedEmotions.length >= 3
                  }
                  className={cn(
                    'px-3 py-1 rounded-full text-sm transition-all',
                    selectedEmotions.includes(emotion.label)
                      ? emotion.category === 'positive'
                        ? 'bg-green-500 text-white'
                        : emotion.category === 'negative'
                          ? 'bg-red-500 text-white'
                          : 'bg-blue-500 text-white'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                    !selectedEmotions.includes(emotion.label) &&
                      selectedEmotions.length >= 3 &&
                      'opacity-50 cursor-not-allowed'
                  )}
                >
                  {emotion.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-lg font-medium mb-4">What have you been doing?</h2>
            <div className="flex flex-wrap gap-2">
              {activityTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={cn(
                    'px-3 py-1 rounded-full text-sm transition-all',
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <h2 className="text-lg font-medium mb-4">Add a note (optional)</h2>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              className="w-full h-32 p-3 rounded-lg border bg-background resize-none focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="How are you feeling? What's on your mind today?"
            />
          </div>

          <div className="flex justify-end animate-fade-in" style={{ animationDelay: '200ms' }}>
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              disabled={selectedMood === null}
            >
              <Save size={18} className="mr-2" />
              Save Entry
            </button>
          </div>
        </form>
      )}

      {viewMode === 'history' && (
        <div className="animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Your Mood History</h2>
            <div className="flex bg-secondary rounded-md p-1">
              <button
                onClick={() => setHistoryView('grid')}
                className={cn(
                  'p-1 rounded',
                  historyView === 'grid' ? 'bg-background' : 'hover:bg-background/50'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setHistoryView('list')}
                className={cn(
                  'p-1 rounded',
                  historyView === 'list' ? 'bg-background' : 'hover:bg-background/50'
                )}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No mood entries found</p>
              <p className="text-sm">Start tracking your mood to see your history</p>
            </div>
          ) : historyView === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {entries.map(entry => {
                const moodOption = getMoodOption(entry.mood);
                const Icon = moodOption.icon;
                return (
                  <div
                    key={entry.id}
                    className="bg-card border rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className={cn('p-2 rounded-full mr-3', moodOption.background)}>
                        <Icon className={moodOption.color} size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium">{moodOption.label}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {entry.emotions.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {entry.emotions.map(emotion => {
                            const emotionData = emotionOptions.find(e => e.label === emotion);
                            return (
                              <span
                                key={emotion}
                                className={cn(
                                  'text-xs px-2 py-0.5 rounded-full',
                                  emotionData?.category === 'positive'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                    : emotionData?.category === 'negative'
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                )}
                              >
                                {emotion}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {entry.note && <p className="text-sm mb-3 line-clamp-3">{entry.note}</p>}

                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {entry.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map(entry => {
                const moodOption = getMoodOption(entry.mood);
                const Icon = moodOption.icon;
                return (
                  <div
                    key={entry.id}
                    className="bg-card border rounded-lg p-3 flex items-start hover:shadow-sm transition-shadow"
                  >
                    <div className={cn('p-2 rounded-full mr-3 mt-1', moodOption.background)}>
                      <Icon className={moodOption.color} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm">{moodOption.label}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleString()}
                        </p>
                      </div>

                      {entry.note && <p className="text-sm mb-2 line-clamp-2">{entry.note}</p>}

                      <div className="flex flex-wrap gap-1">
                        {entry.emotions.map(emotion => {
                          const emotionData = emotionOptions.find(e => e.label === emotion);
                          return (
                            <span
                              key={emotion}
                              className={cn(
                                'text-xs px-2 py-0.5 rounded-full',
                                emotionData?.category === 'positive'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                  : emotionData?.category === 'negative'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              )}
                            >
                              {emotion}
                            </span>
                          );
                        })}

                        {entry.tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {viewMode === 'analytics' && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Emotion Balance</h3>

              {totalEmotions > 0 ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Positive Emotions</span>
                        <span>{Math.round((emotionCounts.positive / totalEmotions) * 100)}%</span>
                      </div>
                      <Progress
                        value={(emotionCounts.positive / totalEmotions) * 100}
                        className="h-2 bg-secondary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Neutral Emotions</span>
                        <span>{Math.round((emotionCounts.neutral / totalEmotions) * 100)}%</span>
                      </div>
                      <Progress
                        value={(emotionCounts.neutral / totalEmotions) * 100}
                        className="h-2 bg-secondary"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Negative Emotions</span>
                        <span>{Math.round((emotionCounts.negative / totalEmotions) * 100)}%</span>
                      </div>
                      <Progress
                        value={(emotionCounts.negative / totalEmotions) * 100}
                        className="h-2 bg-secondary"
                      />
                    </div>
                  </div>

                  <div className="mt-8 text-sm border-t pt-4">
                    <h4 className="font-medium mb-2">Analysis:</h4>
                    <p className="text-muted-foreground">
                      {emotionCounts.positive > emotionCounts.negative
                        ? "You're experiencing more positive than negative emotions. Keep up the good work!"
                        : emotionCounts.negative > emotionCounts.positive
                          ? "You've been experiencing more negative emotions lately. Consider trying some self-care activities."
                          : 'Your emotions are balanced between positive and negative. Maintaining emotional awareness is great!'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Not enough data to analyze emotions</p>
                  <p className="text-sm">Start tracking your mood to see insights</p>
                </div>
              )}
            </div>

            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Mood Trend</h3>

              {entries.length > 0 ? (
                <>
                  <div className="h-48 flex items-end space-x-2">
                    {entries
                      .slice(0, 10)
                      .reverse()
                      .map((entry, index) => {
                        const height = (entry.mood / 6) * 100;
                        const moodOption = getMoodOption(entry.mood);

                        return (
                          <div key={entry.id} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-full rounded-t-sm transition-all duration-500"
                              style={{
                                height: `${height}%`,
                                backgroundColor: moodOption.color.includes('red')
                                  ? '#ef4444'
                                  : moodOption.color.includes('orange')
                                    ? '#f97316'
                                    : moodOption.color.includes('yellow')
                                      ? '#eab308'
                                      : moodOption.color.includes('green')
                                        ? '#22c55e'
                                        : moodOption.color.includes('blue')
                                          ? '#3b82f6'
                                          : '#a855f7', // purple
                              }}
                            />
                            <div className="text-xs text-muted-foreground mt-2 w-full text-center truncate">
                              {new Date(entry.date).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="mt-8 text-sm border-t pt-4">
                    <h4 className="font-medium mb-2">Insight:</h4>
                    <p className="text-muted-foreground">
                      {entries[0].mood > entries[1]?.mood
                        ? 'Your mood has improved recently. Great job!'
                        : entries[0].mood < entries[1]?.mood
                          ? 'Your mood has decreased slightly. Consider activities that boost your wellbeing.'
                          : 'Your mood has been relatively stable lately.'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Not enough data to show mood trend</p>
                  <p className="text-sm">Start tracking your mood to see insights</p>
                </div>
              )}
            </div>

            <div className="bg-card border rounded-xl p-6 lg:col-span-2">
              <h3 className="text-lg font-medium mb-4">Activity Impact</h3>

              {entries.some(entry => entry.tags.length > 0) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {activityTags.slice(0, 6).map(tag => {
                    const entriesWithTag = entries.filter(entry => entry.tags.includes(tag));
                    if (entriesWithTag.length === 0) return null;

                    const avgMood =
                      entriesWithTag.reduce((sum, entry) => sum + entry.mood, 0) /
                      entriesWithTag.length;
                    const avgMoodPercentage = (avgMood / 6) * 100;

                    return (
                      <div key={tag} className="bg-secondary/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{tag}</h4>
                        <Progress value={avgMoodPercentage} className="h-2 mb-2 bg-secondary" />
                        <p className="text-sm text-muted-foreground">
                          Average mood: {avgMood.toFixed(1)}/6
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on {entriesWithTag.length} entries
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Not enough data to analyze activity impact</p>
                  <p className="text-sm">Tag your activities when tracking mood to see insights</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default MoodTracker;
