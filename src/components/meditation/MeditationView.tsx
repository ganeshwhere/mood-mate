import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, Headphones, Clock, Volume2, Timer } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import PageContainer from '../layout/PageContainer';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Sample meditation sessions
const meditationSessions = [
  {
    id: '1',
    title: 'Morning Mindfulness',
    description: 'Start your day with clarity and calmness',
    duration: '10 min',
    category: 'Mindfulness',
    imageSrc:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '2',
    title: 'Deep Relaxation',
    description: 'Release tension and find deep relaxation',
    duration: '15 min',
    category: 'Relaxation',
    imageSrc:
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '3',
    title: 'Breath Awareness',
    description: 'Focus on the breath to center yourself',
    duration: '5 min',
    category: 'Breathing',
    imageSrc:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '4',
    title: 'Sleep Meditation',
    description: 'Prepare your mind for restful sleep',
    duration: '20 min',
    category: 'Sleep',
    imageSrc:
      'https://images.unsplash.com/photo-1455642305367-68834a9d4337?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '5',
    title: 'Loving Kindness',
    description: 'Cultivate compassion and positive emotions',
    duration: '12 min',
    category: 'Compassion',
    imageSrc:
      'https://images.unsplash.com/photo-1531171074112-291d5807273d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: '6',
    title: 'Body Scan',
    description: 'Bring awareness to each part of your body',
    duration: '15 min',
    category: 'Body Awareness',
    imageSrc:
      'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  },
];

// Categories
const categories = [
  'All',
  'Mindfulness',
  'Relaxation',
  'Breathing',
  'Sleep',
  'Compassion',
  'Body Awareness',
];

const MeditationView = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes in seconds
  const [volume, setVolume] = useState([50]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const isMobile = useIsMobile();

  const [selectedMeditation, setSelectedMeditation] = useState(meditationSessions[0]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control audio playback
  };

  const resetMeditation = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // In a real app, this would reset audio playback
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const filteredSessions =
    selectedCategory === 'All'
      ? meditationSessions
      : meditationSessions.filter(session => session.category === selectedCategory);

  return (
    <PageContainer title="Meditation" subtitle="Practice mindfulness and relaxation">
      <div className="space-y-6">
        <Tabs defaultValue="library" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="library">Library</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div
              className={cn(
                'grid gap-4',
                isMobile
                  ? 'grid-cols-1'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'
              )}
            >
              {filteredSessions.map(session => (
                <Card
                  key={session.id}
                  className={cn(
                    'overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md',
                    selectedMeditation.id === session.id && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedMeditation(session)}
                >
                  <div
                    className={cn(
                      'relative aspect-[16/9] w-full overflow-hidden',
                      isMobile ? 'aspect-[3/2]' : ''
                    )}
                  >
                    <img
                      src={session.imageSrc}
                      alt={session.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg">{session.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {session.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {session.duration}
                    </div>
                    <Badge variant="secondary">{session.category}</Badge>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="flex items-center justify-center h-40 bg-accent/20 rounded-lg border border-dashed border-border">
              <div className="text-center">
                <Headphones className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-medium">No favorites yet</h3>
                <p className="text-muted-foreground">Save your favorite meditations here</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {meditationSessions.slice(0, 2).map(session => (
                <Card
                  key={session.id}
                  className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => setSelectedMeditation(session)}
                >
                  <div className="flex">
                    <div className="w-1/3">
                      <img
                        src={session.imageSrc}
                        alt={session.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="w-2/3 p-4">
                      <h3 className="font-medium">{session.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {session.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{session.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {session.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Player controls */}
        <Card className="sticky bottom-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className={cn('flex items-center gap-4', isMobile ? 'flex-col' : '')}>
              <div
                className={cn(
                  'flex items-center',
                  isMobile ? 'w-full justify-between mb-2' : 'gap-4'
                )}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                  <img
                    src={selectedMeditation.imageSrc}
                    alt={selectedMeditation.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                <div className={cn('flex-1', isMobile ? 'ml-3' : 'ml-2 mr-3')}>
                  <h3 className="font-medium line-clamp-1">{selectedMeditation.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMeditation.category}</p>
                </div>

                <div className={cn('flex items-center', isMobile ? 'space-x-2' : 'space-x-4')}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={resetMeditation}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button size="icon" className="h-10 w-10 rounded-full" onClick={togglePlayPause}>
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5 ml-0.5" />
                    )}
                  </Button>
                </div>
              </div>

              <div className={cn('flex-1 flex items-center gap-2', isMobile ? 'w-full' : '')}>
                <div className="flex-shrink-0 text-sm w-10 text-right">
                  {formatTime(currentTime)}
                </div>

                <div className="flex-1 px-2">
                  <Slider
                    value={[currentTime]}
                    max={duration}
                    step={1}
                    onValueChange={value => setCurrentTime(value[0])}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex-shrink-0 text-sm w-10">{formatTime(duration)}</div>

                <div
                  className={cn(
                    'flex items-center gap-2 ml-4',
                    isMobile ? 'hidden' : 'flex-shrink-0 w-36'
                  )}
                >
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Slider
                    value={volume}
                    max={100}
                    step={1}
                    onValueChange={setVolume}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MeditationView;
