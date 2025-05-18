import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  TrendingUp,
  Activity,
  BarChart,
  PieChart,
  BrainCog,
  Heart,
  CalendarClock,
  Clock,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

const ProgressAnalytics = () => {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <PageContainer title="Progress Analytics" subtitle="Track your mental health journey over time">
      <div className="flex justify-end gap-4 mb-8">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="quarter">Last 90 Days</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="flex gap-2 items-center">
          <Calendar className="h-4 w-4" />
          <span>Custom Range</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Mood Score</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">
                7.5<span className="text-lg">/10</span>
              </CardTitle>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>12%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Compared to last week</p>
            <div className="h-2 w-full bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Anxiety Levels</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">
                3.2<span className="text-lg">/10</span>
              </CardTitle>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>8%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Compared to last week</p>
            <div className="h-2 w-full bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Mindfulness Minutes</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">147</CardTitle>
              <div className="flex items-center text-green-500 text-sm">
                <ArrowUp className="h-4 w-4 mr-1" />
                <span>23%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Compared to last week</p>
            <div className="h-2 w-full bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sleep Quality</CardDescription>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">
                6.8<span className="text-lg">/10</span>
              </CardTitle>
              <div className="flex items-center text-red-500 text-sm">
                <ArrowDown className="h-4 w-4 mr-1" />
                <span>5%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">Compared to last week</p>
            <div className="h-2 w-full bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="mood" className="space-y-8">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span>Mood</span>
          </TabsTrigger>
          <TabsTrigger value="anxiety" className="flex items-center gap-2">
            <BrainCog className="h-4 w-4" />
            <span>Anxiety</span>
          </TabsTrigger>
          <TabsTrigger value="sleep" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Sleep</span>
          </TabsTrigger>
          <TabsTrigger value="activities" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Activities</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mood Trends</CardTitle>
              <CardDescription>Track how your mood has changed over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="w-full h-[300px] bg-muted rounded-lg"></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood Distribution</CardTitle>
                <CardDescription>Breakdown of your mood states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="w-full h-[200px] bg-muted rounded-lg"></div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 px-6">
                <div className="grid grid-cols-3 w-full text-center">
                  {moodDistribution.map(item => (
                    <div key={item.name} className="space-y-1">
                      <div className="font-medium">{item.percentage}%</div>
                      <div className="text-xs text-muted-foreground">{item.name}</div>
                      <div className={`h-1 w-8 mx-auto rounded-full ${item.color}`}></div>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Influencers</CardTitle>
                <CardDescription>Factors affecting your mood</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodInfluencers.map(item => (
                    <div key={item.factor} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.factor}</span>
                        <span
                          className={`text-xs ${
                            item.impact > 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {item.impact > 0 ? '+' : ''}
                          {item.impact}%
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.impact > 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.abs(item.impact) * 2}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Mood Log</CardTitle>
              <CardDescription>Your recent mood entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moodEntries.map(entry => (
                  <div
                    key={entry.date}
                    className="flex items-center border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="w-16 text-sm text-muted-foreground">{entry.date}</div>
                    <div className="flex-1 flex items-center">
                      <div className="h-4 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 flex-1 mx-4">
                        <div
                          className="h-6 w-6 rounded-full bg-background border-2 border-primary relative top-[-4px]"
                          style={{ marginLeft: `${(entry.score - 1) * 10}%` }}
                        ></div>
                      </div>
                      <div className="w-10 text-right">{entry.score}/10</div>
                    </div>
                    <div className="ml-6 w-36 text-sm truncate">{entry.note}</div>
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
        </TabsContent>

        <TabsContent value="anxiety" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Anxiety Tracking</CardTitle>
              <CardDescription>Monitor your anxiety levels over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="w-full h-[300px] bg-muted rounded-lg"></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Anxiety Triggers</CardTitle>
                <CardDescription>Common causes of anxiety</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[200px] bg-muted rounded-lg mb-4"></div>
                <div className="space-y-2">
                  {anxietyTriggers.map(trigger => (
                    <div key={trigger.name} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${trigger.color} mr-2`}></div>
                      <span className="text-sm">{trigger.name}</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {trigger.frequency}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Effective Techniques</CardTitle>
                <CardDescription>What's been helping with anxiety</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {anxietyTechniques.map(technique => (
                    <div key={technique.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{technique.name}</span>
                        <span className="text-sm text-green-500">
                          {technique.effectiveness}% effective
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${technique.effectiveness}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Used {technique.usageCount} times
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Explore More Techniques
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sleep" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Patterns</CardTitle>
              <CardDescription>Track your sleep quality and duration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="w-full h-[300px] bg-muted rounded-lg"></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold">7h 12m</div>
                    <div className="text-xs text-muted-foreground mt-1">Last 7 days average</div>
                    <div className="flex items-center justify-center text-green-500 text-sm mt-2">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      <span>22 min</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sleep Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold">6.8/10</div>
                    <div className="text-xs text-muted-foreground mt-1">Last 7 days average</div>
                    <div className="flex items-center justify-center text-red-500 text-sm mt-2">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      <span>0.5 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sleep-Wake Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-around">
                  <div className="text-center">
                    <div className="text-xl font-medium">Bed Time</div>
                    <div className="text-2xl font-bold">11:24 PM</div>
                    <div className="text-xs text-muted-foreground mt-1">Avg. this week</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-medium">Wake Up</div>
                    <div className="text-2xl font-bold">6:36 AM</div>
                    <div className="text-xs text-muted-foreground mt-1">Avg. this week</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Journal</CardTitle>
              <CardDescription>Your recent sleep records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sleepEntries.map(entry => (
                  <div
                    key={entry.date}
                    className="flex items-center border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="w-20 text-sm">{entry.date}</div>
                    <div className="flex-1 flex items-center px-4">
                      <div className="h-4 bg-muted relative rounded-full w-full">
                        <div
                          className="absolute top-0 h-full bg-purple-200 rounded-l-full"
                          style={{
                            left: `${entry.timelineStart}%`,
                            width: `${entry.timelineDuration}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">{entry.duration}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{entry.quality}/10</div>
                        <div className="text-xs text-muted-foreground">Quality</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Sleep History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Activities</CardTitle>
              <CardDescription>
                Track the impact of different activities on your wellbeing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <div className="w-full h-[300px] bg-muted rounded-lg"></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Frequency</CardTitle>
                <CardDescription>Your most practiced wellness activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[200px] bg-muted rounded-lg mb-4"></div>
                <div className="space-y-3">
                  {activities.map(activity => (
                    <div key={activity.name} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${activity.color} mr-2`}></div>
                      <span className="text-sm">{activity.name}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <span className="text-sm">{activity.frequency} times</span>
                        <span
                          className={`text-xs ${
                            activity.change >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {activity.change > 0 ? '+' : ''}
                          {activity.change}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mood Impact</CardTitle>
                <CardDescription>Activities with the most positive effect</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map(activity => (
                    <div key={activity.name} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{activity.name}</span>
                        <span className="text-sm text-green-500">+{activity.impact} pts</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${activity.color}`}
                          style={{ width: `${activity.impact * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Track New Activity
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity Streaks</CardTitle>
              <CardDescription>Your current consistency streaks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {streaks.map(streak => (
                  <Card key={streak.activity} className="bg-muted/40">
                    <CardContent className="p-4 text-center">
                      <div
                        className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${streak.bgColor} mb-3`}
                      >
                        {streak.icon}
                      </div>
                      <div className="font-medium">{streak.activity}</div>
                      <div className="text-2xl font-bold my-1">{streak.days} days</div>
                      <div className="text-xs text-muted-foreground">Current streak</div>
                      <div className="text-xs mt-2">Best: {streak.best} days</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

// Sample data for visualization
const moodDistribution = [
  { name: 'Happy', percentage: 45, color: 'bg-green-500' },
  { name: 'Neutral', percentage: 30, color: 'bg-blue-500' },
  { name: 'Sad', percentage: 25, color: 'bg-orange-500' },
];

const moodInfluencers = [
  { factor: 'Quality Sleep', impact: 42 },
  { factor: 'Exercise', impact: 38 },
  { factor: 'Social Interaction', impact: 31 },
  { factor: 'Work Stress', impact: -27 },
  { factor: 'Screen Time', impact: -18 },
];

const moodEntries = [
  { date: 'Today', score: 8, note: 'Feeling productive and energetic' },
  { date: 'Yesterday', score: 7, note: 'Pretty good day overall' },
  { date: '2 days ago', score: 6, note: 'Slight stress from work deadline' },
  { date: '3 days ago', score: 9, note: 'Great day outdoors with friends' },
  { date: '4 days ago', score: 5, note: 'Feeling a bit tired and unmotivated' },
];

const anxietyTriggers = [
  { name: 'Work Deadlines', frequency: 35, color: 'bg-red-400' },
  { name: 'Social Situations', frequency: 28, color: 'bg-orange-400' },
  { name: 'Financial Concerns', frequency: 18, color: 'bg-yellow-400' },
  { name: 'Health Worries', frequency: 12, color: 'bg-green-400' },
  { name: 'Family Issues', frequency: 7, color: 'bg-blue-400' },
];

const anxietyTechniques = [
  { name: 'Deep Breathing', effectiveness: 85, usageCount: 23 },
  { name: 'Progressive Muscle Relaxation', effectiveness: 78, usageCount: 12 },
  { name: 'Mindfulness Meditation', effectiveness: 72, usageCount: 18 },
  { name: 'Physical Exercise', effectiveness: 68, usageCount: 15 },
];

const sleepEntries = [
  {
    date: 'Jun 14',
    timelineStart: 10,
    timelineDuration: 30,
    duration: '7h 18m',
    quality: 7,
  },
  {
    date: 'Jun 13',
    timelineStart: 12,
    timelineDuration: 28,
    duration: '6h 52m',
    quality: 6,
  },
  {
    date: 'Jun 12',
    timelineStart: 15,
    timelineDuration: 32,
    duration: '7h 45m',
    quality: 8,
  },
  {
    date: 'Jun 11',
    timelineStart: 11,
    timelineDuration: 29,
    duration: '7h 05m',
    quality: 7,
  },
  {
    date: 'Jun 10',
    timelineStart: 8,
    timelineDuration: 26,
    duration: '6h 32m',
    quality: 5,
  },
];

const activities = [
  {
    name: 'Meditation',
    frequency: 18,
    change: 22,
    impact: 4.2,
    color: 'bg-blue-500',
  },
  {
    name: 'Exercise',
    frequency: 12,
    change: 8,
    impact: 3.8,
    color: 'bg-green-500',
  },
  {
    name: 'Journaling',
    frequency: 15,
    change: -5,
    impact: 3.5,
    color: 'bg-purple-500',
  },
  {
    name: 'Nature Time',
    frequency: 6,
    change: 15,
    impact: 4.5,
    color: 'bg-emerald-500',
  },
  {
    name: 'Reading',
    frequency: 10,
    change: 0,
    impact: 3.0,
    color: 'bg-amber-500',
  },
];

const streaks = [
  {
    activity: 'Meditation',
    days: 12,
    best: 15,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: <BrainCog className="h-6 w-6 text-blue-500" />,
  },
  {
    activity: 'Journaling',
    days: 7,
    best: 21,
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    icon: <CalendarClock className="h-6 w-6 text-purple-500" />,
  },
  {
    activity: 'Exercise',
    days: 3,
    best: 14,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: <Activity className="h-6 w-6 text-green-500" />,
  },
  {
    activity: 'Gratitude',
    days: 18,
    best: 30,
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: <Heart className="h-6 w-6 text-yellow-500" />,
  },
];

export default ProgressAnalytics;
