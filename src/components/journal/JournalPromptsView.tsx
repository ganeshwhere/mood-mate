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
import { RefreshCw, Save, Clock, ArrowRight, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import PageContainer from '../layout/PageContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Sample journal prompts
const journalPrompts = [
  {
    id: 1,
    text: "What are three things you're grateful for today?",
    category: 'Gratitude',
  },
  {
    id: 2,
    text: 'What was the most challenging part of your day and how did you handle it?',
    category: 'Reflection',
  },
  {
    id: 3,
    text: "What is something you're looking forward to in the coming week?",
    category: 'Future',
  },
  {
    id: 4,
    text: 'Describe a moment that made you smile today.',
    category: 'Positivity',
  },
  {
    id: 5,
    text: "What is a skill you'd like to improve and why?",
    category: 'Growth',
  },
  {
    id: 6,
    text: 'Write about a person who has positively influenced your life.',
    category: 'Relationships',
  },
  {
    id: 7,
    text: 'What are your top three priorities for tomorrow?',
    category: 'Planning',
  },
  {
    id: 8,
    text: 'Describe a time when you felt proud of yourself recently.',
    category: 'Achievement',
  },
];

// Recent responses
const recentResponses = [
  {
    id: 1,
    prompt: "What are three things you're grateful for today?",
    response: "I'm grateful for my health, my supportive friends, and the beautiful weather today.",
    date: '2025-03-15',
  },
  {
    id: 2,
    prompt: "What is something you're looking forward to in the coming week?",
    response: "I'm excited about the upcoming weekend hike and trying out that new restaurant.",
    date: '2025-03-13',
  },
  {
    id: 3,
    prompt: 'What was the most challenging part of your day and how did you handle it?',
    response:
      'The presentation at work was stressful, but I prepared well and it ended up going smoothly.',
    date: '2025-03-10',
  },
];

// Sample categories for filtering
const categories = [
  'All',
  'Gratitude',
  'Reflection',
  'Future',
  'Positivity',
  'Growth',
  'Relationships',
  'Planning',
  'Achievement',
];

const JournalPromptsView = () => {
  const [currentPrompt, setCurrentPrompt] = useState(journalPrompts[0]);
  const [response, setResponse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSaved, setShowSaved] = useState(false);
  const isMobile = useIsMobile();

  const getNewPrompt = () => {
    const filteredPrompts =
      selectedCategory === 'All'
        ? journalPrompts
        : journalPrompts.filter(prompt => prompt.category === selectedCategory);

    // Get a random prompt that's different from the current one
    let newPrompt;
    do {
      const randomIndex = Math.floor(Math.random() * filteredPrompts.length);
      newPrompt = filteredPrompts[randomIndex];
    } while (newPrompt.id === currentPrompt.id && filteredPrompts.length > 1);

    setCurrentPrompt(newPrompt);
    setResponse('');
    setShowSaved(false);
  };

  const saveResponse = () => {
    // In a real app, this would save to state or backend
    console.log({
      prompt: currentPrompt.text,
      response,
      date: new Date().toISOString().split('T')[0],
    });

    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <PageContainer title="Journal Prompts" subtitle="Thoughtful prompts to inspire your journaling">
      <div className={cn('grid gap-6', isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3')}>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Prompt</CardTitle>
                <Button variant="outline" size="sm" className="h-8" onClick={getNewPrompt}>
                  <RefreshCw className="h-3.5 w-3.5 mr-2" />
                  New Prompt
                </Button>
              </div>
              <CardDescription>
                Category: <Badge variant="outline">{currentPrompt.category}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-accent/50 p-4 rounded-lg mb-4">
                <p className="text-lg font-medium">{currentPrompt.text}</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="response" className="text-sm font-medium">
                  Your response
                </label>
                <Textarea
                  id="response"
                  placeholder="Start writing your thoughts here..."
                  className="min-h-[150px]"
                  value={response}
                  onChange={e => setResponse(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={getNewPrompt}>
                Skip
              </Button>
              <Button
                onClick={saveResponse}
                disabled={!response.trim()}
                className={cn('relative', showSaved && 'bg-green-600 hover:bg-green-700')}
              >
                {showSaved ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Response
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prompt Categories</CardTitle>
              <CardDescription>Select a category to filter prompts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(category);
                      if (category !== selectedCategory) {
                        getNewPrompt();
                      }
                    }}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Responses</CardTitle>
              <CardDescription>Your previous journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResponses.map((entry, index) => (
                  <div key={entry.id}>
                    <div className="mb-2">
                      <p className="font-medium line-clamp-1">{entry.prompt}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {entry.response}
                    </p>
                    <Button variant="ghost" size="sm" className="h-7 px-2.5 text-xs">
                      Read more
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                    {index < recentResponses.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="sm">
                View All Entries
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default JournalPromptsView;
