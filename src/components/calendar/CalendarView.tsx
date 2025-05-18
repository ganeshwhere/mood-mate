import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  BarChart,
  Calendar as CalendarIcon,
  List,
  Star,
  Brain,
  Smile,
  Frown,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
  Activity,
  Clock,
  X,
} from 'lucide-react';
import PageContainer from '../layout/PageContainer';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data - in a real app would come from backend
const moodData = {
  '2024-03-01': {
    mood: 4,
    note: 'Started a new project at work!',
    emotions: ['Excited', 'Motivated'],
    activities: ['Work', 'Learning'],
  },
  '2024-03-03': {
    mood: 5,
    note: 'Weekend brunch with friends',
    emotions: ['Happy', 'Grateful'],
    activities: ['Social', 'Food'],
  },
  '2024-03-05': {
    mood: 3,
    note: 'Regular workday, nothing special',
    emotions: ['Content', 'Neutral'],
    activities: ['Work'],
  },
  '2024-03-07': {
    mood: 4,
    note: 'Evening yoga session was refreshing',
    emotions: ['Peaceful', 'Energized'],
    activities: ['Exercise', 'Wellness'],
  },
  '2024-03-10': {
    mood: 2,
    note: 'Feeling under pressure with deadlines',
    emotions: ['Stressed', 'Anxious'],
    activities: ['Work'],
  },
  '2024-03-12': {
    mood: 4,
    note: 'Completed a major milestone!',
    emotions: ['Proud', 'Accomplished'],
    activities: ['Work', 'Achievement'],
  },
  '2024-03-14': {
    mood: 5,
    note: 'Great feedback from the team',
    emotions: ['Happy', 'Appreciated'],
    activities: ['Work', 'Social'],
  },
  '2024-03-15': {
    mood: 3,
    note: 'Quiet day at home',
    emotions: ['Relaxed'],
    activities: ['Rest', 'Entertainment'],
  },
  '2024-03-16': {
    mood: 4,
    note: 'Morning run followed by coffee',
    emotions: ['Energetic', 'Content'],
    activities: ['Exercise', 'Self-care'],
  },
  '2024-03-17': {
    mood: 5,
    note: 'Family gathering',
    emotions: ['Loved', 'Joyful'],
    activities: ['Family', 'Social'],
  },
  '2024-02-28': {
    mood: 4,
    note: 'Productive planning session',
    emotions: ['Focused', 'Optimistic'],
    activities: ['Work', 'Planning'],
  },
  '2024-02-25': {
    mood: 3,
    note: 'Rainy day, stayed in',
    emotions: ['Calm', 'Reflective'],
    activities: ['Rest', 'Reading'],
  },
  '2024-02-22': {
    mood: 5,
    note: 'Surprise celebration at work',
    emotions: ['Happy', 'Grateful'],
    activities: ['Work', 'Celebration'],
  },
};

const getMoodColor = (mood: number) => {
  switch (mood) {
    case 1:
      return 'bg-red-500';
    case 2:
      return 'bg-orange-500';
    case 3:
      return 'bg-yellow-500';
    case 4:
      return 'bg-green-500';
    case 5:
      return 'bg-blue-500';
    default:
      return 'bg-gray-300';
  }
};

const getMoodEmoji = (mood: number) => {
  switch (mood) {
    case 1:
      return '😢';
    case 2:
      return '😕';
    case 3:
      return '😐';
    case 4:
      return '😊';
    case 5:
      return '😁';
    default:
      return '';
  }
};

const getMoodLabel = (mood: number) => {
  switch (mood) {
    case 1:
      return 'Terrible';
    case 2:
      return 'Bad';
    case 3:
      return 'Okay';
    case 4:
      return 'Good';
    case 5:
      return 'Amazing';
    default:
      return 'Unknown';
  }
};

export type ViewMode = 'calendar' | 'stats' | 'list';

interface CalendarViewProps {
  initialView?: ViewMode;
  initialDate?: Date;
}

const CalendarView = ({ initialView = 'calendar', initialDate }: CalendarViewProps) => {
  const [date, setDate] = useState<Date | undefined>(initialDate || new Date());
  const [selectedDayMood, setSelectedDayMood] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(initialView);
  const [selectedMonth, setSelectedMonth] = useState<Date>(initialDate || new Date());
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: new Date(),
    mood: 3,
    emotions: [],
    activities: [],
    note: '',
  });

  const emotions = [
    'Happy',
    'Excited',
    'Grateful',
    'Peaceful',
    'Content',
    'Anxious',
    'Stressed',
    'Sad',
    'Angry',
    'Frustrated',
    'Energetic',
    'Tired',
    'Motivated',
    'Proud',
    'Loved',
  ];

  const activities = [
    'Work',
    'Exercise',
    'Social',
    'Family',
    'Rest',
    'Entertainment',
    'Learning',
    'Self-care',
    'Nature',
    'Food',
    'Reading',
    'Meditation',
    'Shopping',
    'Travel',
  ];

  useEffect(() => {
    if (initialDate) {
      handleSelect(initialDate);
    }
  }, [initialDate]);

  const handleSelect = (day: Date | undefined) => {
    setDate(day);
    if (day) {
      const dateStr = day.toISOString().split('T')[0];
      setSelectedDayMood(moodData[dateStr] || null);
    } else {
      setSelectedDayMood(null);
    }
  };

  const handleMonthChange = (newMonth: Date) => {
    setSelectedMonth(newMonth);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedMonth(prev => (direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1)));
  };

  const getMonthMoodData = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    const monthData = Object.entries(moodData).filter(([dateStr]) => {
      const entryDate = new Date(dateStr);
      return entryDate.getFullYear() === year && entryDate.getMonth() === monthIndex;
    });

    return monthData;
  };

  const currentMonthData = getMonthMoodData(selectedMonth);

  const calculateMonthStats = () => {
    if (currentMonthData.length === 0) return null;

    const moodCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalMood = 0;

    currentMonthData.forEach(([_, data]) => {
      moodCounts[data.mood as keyof typeof moodCounts]++;
      totalMood += data.mood;
    });

    const avgMood = totalMood / currentMonthData.length;
    const topMood = Object.entries(moodCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    // Count emotions
    const emotionsCount: Record<string, number> = {};
    currentMonthData.forEach(([_, data]) => {
      data.emotions.forEach((emotion: string) => {
        emotionsCount[emotion] = (emotionsCount[emotion] || 0) + 1;
      });
    });

    // Get top emotions
    const topEmotions = Object.entries(emotionsCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([emotion]) => emotion);

    // Count activities
    const activitiesCount: Record<string, number> = {};
    currentMonthData.forEach(([_, data]) => {
      (data.activities || []).forEach((activity: string) => {
        activitiesCount[activity] = (activitiesCount[activity] || 0) + 1;
      });
    });

    // Get top activities
    const topActivities = Object.entries(activitiesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([activity]) => activity);

    return {
      entriesCount: currentMonthData.length,
      averageMood: avgMood,
      topMood: parseInt(topMood),
      moodCounts,
      topEmotions,
      topActivities,
    };
  };

  const monthStats = calculateMonthStats();

  const handleAddEntry = () => {
    // In a real app, this would be an API call
    const dateStr = format(newEntry.date, 'yyyy-MM-dd');
    moodData[dateStr] = {
      mood: newEntry.mood,
      emotions: newEntry.emotions,
      activities: newEntry.activities,
      note: newEntry.note,
    };

    // Update the view
    handleSelect(newEntry.date);
    setIsAddingEntry(false);

    // Reset form
    setNewEntry({
      date: new Date(),
      mood: 3,
      emotions: [],
      activities: [],
      note: '',
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="bg-card rounded-lg border p-1 inline-flex">
          <button
            onClick={() => setViewMode('calendar')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'calendar'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            <CalendarIcon size={16} />
            <span>Calendar</span>
          </button>
          <button
            onClick={() => setViewMode('stats')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'stats'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            <BarChart size={16} />
            <span>Monthly Stats</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
              viewMode === 'list'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            )}
          >
            <List size={16} />
            <span>List View</span>
          </button>
        </div>

        <Button onClick={() => setIsAddingEntry(true)} className="flex items-center gap-2">
          <Plus size={16} />
          Add Entry
        </Button>
      </div>

      <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
        <DialogContent className="sm:max-w-[900px] p-0 gap-0">
          <div className="grid grid-cols-2">
            {/* Left side - Calendar */}
            <div className="p-6 pt-6 border-r w-full">
              <DialogHeader className="mb-6">
                <DialogTitle>Select Date</DialogTitle>
              </DialogHeader>
              <Calendar
                mode="single"
                selected={newEntry.date}
                onSelect={date => date && setNewEntry(prev => ({ ...prev, date }))}
                className="rounded-xl w-full p-2"
              />
              <div className="mt-4 text-sm text-muted-foreground text-center">
                Selected: {format(newEntry.date, 'MMMM d, yyyy')}
              </div>
            </div>

            {/* Right side - Mood Entry Form */}
            <div className="p-6 max-h-[95vh] overflow-y-auto">
              <DialogHeader className="mb-4">
                <DialogTitle>Add Mood Entry</DialogTitle>
                <DialogDescription>Record how you're feeling today.</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Mood Rating</Label>
                  <div className="flex justify-between items-center gap-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <Button
                        key={rating}
                        variant={newEntry.mood === rating ? 'default' : 'outline'}
                        className="flex-1 h-12"
                        onClick={() => setNewEntry(prev => ({ ...prev, mood: rating }))}
                      >
                        <span className="text-xl">{getMoodEmoji(rating)}</span>
                      </Button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    {getMoodLabel(newEntry.mood)}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Emotions</Label>
                  <Select
                    value={newEntry.emotions.join(',')}
                    onValueChange={value =>
                      setNewEntry(prev => ({
                        ...prev,
                        emotions: value.split(',').filter(Boolean),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select emotions..." />
                    </SelectTrigger>
                    <SelectContent>
                      {emotions.map(emotion => (
                        <SelectItem key={emotion} value={emotion}>
                          {emotion}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {newEntry.emotions.map(emotion => (
                      <div
                        key={emotion}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {emotion}
                        <button
                          onClick={() =>
                            setNewEntry(prev => ({
                              ...prev,
                              emotions: prev.emotions.filter(e => e !== emotion),
                            }))
                          }
                          className="hover:text-destructive"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Activities</Label>
                  <Select
                    value={newEntry.activities.join(',')}
                    onValueChange={value =>
                      setNewEntry(prev => ({
                        ...prev,
                        activities: value.split(',').filter(Boolean),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activities..." />
                    </SelectTrigger>
                    <SelectContent>
                      {activities.map(activity => (
                        <SelectItem key={activity} value={activity}>
                          {activity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {newEntry.activities.map(activity => (
                      <div
                        key={activity}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs flex items-center gap-1"
                      >
                        {activity}
                        <button
                          onClick={() =>
                            setNewEntry(prev => ({
                              ...prev,
                              activities: prev.activities.filter(a => a !== activity),
                            }))
                          }
                          className="hover:text-destructive"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={newEntry.note}
                    onChange={e => setNewEntry(prev => ({ ...prev, note: e.target.value }))}
                    placeholder="How are you feeling today? What made you feel this way?"
                    className="resize-none h-20"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddingEntry(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEntry}>Save Entry</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence mode="wait">
        {viewMode === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full"
          >
            <div className="lg:col-span-3 bg-card rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">{format(selectedMonth, 'MMMM yyyy')}</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                onMonthChange={handleMonthChange}
                className="w-full [&_.rdp-table]:w-full [&_.rdp-cell]:h-20 [&_.rdp-head_th]:text-base [&_.rdp-button]:text-base [&_.rdp-day_div]:text-lg"
                modifiers={{
                  booked: date => {
                    const dateStr = date.toISOString().split('T')[0];
                    return dateStr in moodData;
                  },
                  today: date => {
                    return format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
                  },
                }}
                modifiersStyles={{
                  booked: {
                    fontWeight: 'bold',
                  },
                  today: {
                    border: '2px solid var(--primary)',
                    borderRadius: '50%',
                  },
                }}
                components={{
                  DayContent: ({ date }) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const dayMood = moodData[dateStr];

                    return (
                      <div className="relative h-full w-full flex items-center justify-center">
                        {date.getDate()}
                        {dayMood && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={cn(
                              'absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full',
                              getMoodColor(dayMood.mood)
                            )}
                          />
                        )}
                      </div>
                    );
                  },
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-xl border shadow-sm p-6"
            >
              <h3 className="text-lg font-medium mb-4">
                {date ? (
                  <>
                    Mood for <span className="font-semibold">{format(date, 'MMMM d, yyyy')}</span>
                  </>
                ) : (
                  'No Date Selected'
                )}
              </h3>

              {selectedDayMood ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center text-2xl',
                        getMoodColor(selectedDayMood.mood)
                      )}
                    >
                      {getMoodEmoji(selectedDayMood.mood)}
                    </motion.div>
                    <div>
                      <h4 className="font-medium">{getMoodLabel(selectedDayMood.mood)}</h4>
                      <p className="text-sm text-muted-foreground">
                        Your mood rating: {selectedDayMood.mood}/5
                      </p>
                    </div>
                  </div>

                  {selectedDayMood.emotions && selectedDayMood.emotions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Emotions:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDayMood.emotions.map((emotion: string) => (
                          <motion.span
                            key={emotion}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs px-2 py-1 bg-secondary rounded-full"
                          >
                            {emotion}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDayMood.activities && selectedDayMood.activities.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Activities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedDayMood.activities.map((activity: string) => (
                          <motion.span
                            key={activity}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {activity}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Your notes:</h4>
                    <p className="text-muted-foreground">{selectedDayMood.note}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-muted-foreground"
                >
                  {date ? (
                    <div className="space-y-4">
                      <p>No mood data recorded for this day</p>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingEntry(true)}
                        className="flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Entry
                      </Button>
                    </div>
                  ) : (
                    <p>Select a date to view mood data</p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {viewMode === 'stats' && monthStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div className="bg-card rounded-xl border shadow-sm p-6 lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">
                  Monthly Overview: {format(selectedMonth, 'MMMM yyyy')}
                </h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-secondary/20 p-4 rounded-lg text-center"
                >
                  <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Entries</p>
                  <p className="text-3xl font-bold">{monthStats.entriesCount}</p>
                  <p className="text-xs text-muted-foreground mt-1">days tracked</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-secondary/20 p-4 rounded-lg text-center"
                >
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Average Mood</p>
                  <p className="text-3xl font-bold">{monthStats.averageMood.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">out of 5</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-secondary/20 p-4 rounded-lg text-center"
                >
                  <Activity className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">Most Common</p>
                  <p className="text-3xl font-bold">{getMoodEmoji(monthStats.topMood)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getMoodLabel(monthStats.topMood)}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6">
              <h3 className="text-base font-medium mb-4 flex items-center">
                <Smile className="mr-2" size={18} />
                Mood Distribution
              </h3>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(mood => {
                  const count =
                    monthStats.moodCounts[mood as keyof typeof monthStats.moodCounts] || 0;
                  const percentage =
                    monthStats.entriesCount > 0 ? (count / monthStats.entriesCount) * 100 : 0;

                  return (
                    <div key={mood} className="flex items-center gap-2">
                      <div className="w-8 text-center">{getMoodEmoji(mood)}</div>
                      <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full', getMoodColor(mood))}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-8 text-sm text-right">{count}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6">
              <h3 className="text-base font-medium mb-4 flex items-center">
                <Star className="mr-2" size={18} />
                Top Emotions
              </h3>

              {monthStats.topEmotions.length > 0 ? (
                <div className="space-y-4">
                  {monthStats.topEmotions.map((emotion, index) => (
                    <div key={emotion} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{emotion}</p>
                        <p className="text-xs text-muted-foreground">Felt on multiple days</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No emotions tracked</p>
              )}
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6">
              <h3 className="text-base font-medium mb-4 flex items-center">
                <Brain className="mr-2" size={18} />
                Top Activities
              </h3>

              {monthStats.topActivities.length > 0 ? (
                <div className="space-y-4">
                  {monthStats.topActivities.map((activity, index) => (
                    <div key={activity} className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{activity}</p>
                        <p className="text-xs text-muted-foreground">Common activity</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No activities tracked</p>
              )}
            </div>

            <div className="bg-card rounded-xl border shadow-sm p-6 lg:col-span-3">
              <h3 className="text-base font-medium mb-4 flex items-center">
                <AlertTriangle className="mr-2" size={18} />
                Insights
              </h3>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {monthStats.averageMood >= 4
                    ? "This has been a great month for your mental wellbeing! Keep doing what you're doing."
                    : monthStats.averageMood >= 3
                      ? 'This month has been moderately positive. Look at your activities on your better days and try to incorporate more of those.'
                      : 'This month has been more challenging. Consider reaching out for support and focusing on self-care activities.'}
                </p>

                {monthStats.topActivities.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Your most common activity was{' '}
                    <span className="font-medium">{monthStats.topActivities[0]}</span>.
                    {monthStats.averageMood >= 4
                      ? ' This seems to be positively affecting your mood!'
                      : monthStats.averageMood >= 3
                        ? ' This seems to be having a moderate impact on your mood.'
                        : ' Consider balancing this with other activities that boost your mood.'}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card rounded-xl border shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">
                Mood Entries: {format(selectedMonth, 'MMMM yyyy')}
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft size={16} />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>

            {currentMonthData.length > 0 ? (
              <div className="space-y-4">
                {currentMonthData.map(([dateStr, data], index) => {
                  const entryDate = new Date(dateStr);
                  return (
                    <motion.div
                      key={dateStr}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'p-4 border rounded-lg flex gap-4 hover:bg-accent/50 transition-colors cursor-pointer',
                        date && dateStr === date.toISOString().split('T')[0] && 'border-primary'
                      )}
                      onClick={() => handleSelect(entryDate)}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={cn(
                          'w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-xl',
                          getMoodColor(data.mood)
                        )}
                      >
                        {getMoodEmoji(data.mood)}
                      </motion.div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{getMoodLabel(data.mood)}</h4>
                          <span className="text-xs text-muted-foreground">
                            {format(entryDate, 'MMM d, yyyy')}
                          </span>
                        </div>

                        <p className="text-sm mb-2 line-clamp-2">{data.note}</p>

                        <div className="flex flex-wrap gap-1">
                          {data.emotions.map((emotion: string) => (
                            <motion.span
                              key={emotion}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-xs px-2 py-0.5 bg-secondary rounded-full"
                            >
                              {emotion}
                            </motion.span>
                          ))}

                          {data.activities &&
                            data.activities.map((activity: string) => (
                              <motion.span
                                key={activity}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
                              >
                                {activity}
                              </motion.span>
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                <p>No mood entries for this month</p>
                <p className="text-sm">
                  Try selecting a different month or start tracking your mood
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingEntry(true)}
                  className="mt-4 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Entry
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;
