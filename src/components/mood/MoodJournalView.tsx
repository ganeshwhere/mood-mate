import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  SmileIcon,
  FrownIcon,
  MehIcon,
  AngryIcon,
  HeartIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from 'lucide-react';
import PageContainer from '../layout/PageContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Sample mood entries
const moodEntries = [
  {
    id: 1,
    date: '2025-03-17',
    mood: 'Happy',
    content:
      'Today was a great day. I accomplished all my goals for the day and had a nice dinner with friends.',
  },
  {
    id: 2,
    date: '2025-03-16',
    mood: 'Sad',
    content: "Feeling down today. The weather was gloomy and I didn't get much done.",
  },
  {
    id: 3,
    date: '2025-03-15',
    mood: 'Anxious',
    content: 'Worried about the upcoming presentation. Need to prepare more and practice.',
  },
  {
    id: 4,
    date: '2025-03-14',
    mood: 'Calm',
    content:
      'Meditated this morning and felt peaceful throughout the day. Going to continue this habit.',
  },
];

const MoodIcon = ({ mood }: { mood: string }) => {
  switch (mood.toLowerCase()) {
    case 'happy':
      return <SmileIcon className="h-5 w-5 text-yellow-500" />;
    case 'sad':
      return <FrownIcon className="h-5 w-5 text-blue-500" />;
    case 'angry':
      return <AngryIcon className="h-5 w-5 text-red-500" />;
    case 'anxious':
      return <MehIcon className="h-5 w-5 text-orange-500" />;
    case 'calm':
      return <HeartIcon className="h-5 w-5 text-green-500" />;
    default:
      return <MehIcon className="h-5 w-5 text-gray-500" />;
  }
};

const MoodJournalView = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the entry to a database
    console.log({
      mood: selectedMood,
      content: journalEntry,
      date: new Date(),
    });
    // Reset form
    setJournalEntry('');
    setSelectedMood('');
  };

  return (
    <PageContainer title="Mood Journal" subtitle="Track your emotions and reflect on your day">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
              <CardDescription>How are you feeling today?</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="mood" className="text-sm font-medium">
                    Select your mood
                  </label>
                  <Select value={selectedMood} onValueChange={setSelectedMood}>
                    <SelectTrigger id="mood" className="w-full">
                      <SelectValue placeholder="How are you feeling?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Happy">
                        <div className="flex items-center">
                          <SmileIcon className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>Happy</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Sad">
                        <div className="flex items-center">
                          <FrownIcon className="h-4 w-4 mr-2 text-blue-500" />
                          <span>Sad</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Angry">
                        <div className="flex items-center">
                          <AngryIcon className="h-4 w-4 mr-2 text-red-500" />
                          <span>Angry</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Anxious">
                        <div className="flex items-center">
                          <MehIcon className="h-4 w-4 mr-2 text-orange-500" />
                          <span>Anxious</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="Calm">
                        <div className="flex items-center">
                          <HeartIcon className="h-4 w-4 mr-2 text-green-500" />
                          <span>Calm</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="journal" className="text-sm font-medium">
                    Journal entry
                  </label>
                  <Textarea
                    id="journal"
                    placeholder="Write about your day, feelings, and experiences..."
                    className="min-h-[150px]"
                    value={journalEntry}
                    onChange={e => setJournalEntry(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={!selectedMood || !journalEntry}>
                  Save Entry
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Previous Entries</CardTitle>
              <CardDescription>Your recent mood journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodEntries.map(entry => (
                  <div
                    key={entry.id}
                    className="p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <MoodIcon mood={entry.mood} />
                        <span className="font-medium">{entry.mood}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(entry.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <p
                      className={cn(
                        'text-muted-foreground line-clamp-2',
                        isMobile ? 'text-sm' : ''
                      )}
                    >
                      {entry.content}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Entries
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default MoodJournalView;
