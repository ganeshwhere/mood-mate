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
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/layout/PageContainer';
import {
  Target,
  Plus,
  Trophy,
  Calendar,
  Check,
  Clock,
  ArrowUpRight,
  Trash2,
  Edit,
  Star,
  MoreHorizontal,
  Brain,
  Heart,
  Smile,
  Dumbbell,
  Users,
  BookOpen,
} from 'lucide-react';

const Goals = () => {
  const [newGoalName, setNewGoalName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [goalDescription, setGoalDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [milestones, setMilestones] = useState<string[]>(['']);

  const handleAddMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleMilestoneChange = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      title: newGoalName,
      category: selectedCategory,
      description: goalDescription,
      startDate,
      targetDate,
      milestones: milestones.filter(m => m.trim() !== ''),
    });

    // Reset form
    setNewGoalName('');
    setSelectedCategory(null);
    setGoalDescription('');
    setStartDate('');
    setTargetDate('');
    setMilestones(['']);
    setShowNewGoalForm(false);
  };

  return (
    <PageContainer title="Goal Setting" subtitle="Set, track, and achieve your mental health goals">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={() => setShowNewGoalForm(!showNewGoalForm)}
            >
              <Plus className="h-4 w-4" />
              <span>{showNewGoalForm ? 'Cancel' : 'New Goal'}</span>
            </Button>
          </div>

          {showNewGoalForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Goal</CardTitle>
                <CardDescription>
                  Define your goals with clear milestones and deadlines
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Goal Title</label>
                    <Input
                      placeholder="What would you like to achieve?"
                      value={newGoalName}
                      onChange={e => setNewGoalName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {goalCategories.map(category => (
                        <button
                          key={category.id}
                          type="button"
                          className={`p-2 border rounded-md flex items-center gap-2 ${
                            selectedCategory === category.id
                              ? 'border-primary bg-primary/5'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          <div
                            className={`h-6 w-6 rounded-full flex items-center justify-center ${category.bgColor}`}
                          >
                            {category.icon}
                          </div>
                          <span className="text-sm">{category.name}</span>
                        </button>
                      ))}
                    </div>
                    {!selectedCategory && (
                      <p className="text-sm text-red-500">Please select a category</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      className="w-full p-2 border rounded-md min-h-[100px]"
                      placeholder="Describe your goal in detail. What does success look like?"
                      value={goalDescription}
                      onChange={e => setGoalDescription(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Date</label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Date</label>
                      <Input
                        type="date"
                        value={targetDate}
                        onChange={e => setTargetDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Milestones</label>
                      <button
                        type="button"
                        className="text-xs text-primary"
                        onClick={handleAddMilestone}
                      >
                        + Add Milestone
                      </button>
                    </div>
                    <div className="space-y-2 pl-2 border-l-2 border-primary/30">
                      {milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder={`Milestone ${index + 1}`}
                            className="text-sm"
                            value={milestone}
                            onChange={e => handleMilestoneChange(index, e.target.value)}
                          />
                          <button
                            type="button"
                            className="text-muted-foreground"
                            onClick={() => handleRemoveMilestone(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowNewGoalForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1" disabled={!selectedCategory}>
                      Save Goal
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </Card>
          )}

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList>
              <TabsTrigger value="active">Active Goals</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeGoals.map(goal => (
                  <Card key={goal.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {goal.category}
                        </Badge>
                        <button className="text-muted-foreground">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{goal.daysLeft} days left</span>
                          </div>
                          {goal.streak > 0 && (
                            <div className="flex items-center gap-1 text-orange-500">
                              <Star className="h-4 w-4 fill-orange-500" />
                              <span>{goal.streak} days streak</span>
                            </div>
                          )}
                        </div>

                        {goal.milestones.length > 0 && (
                          <div className="space-y-2">
                            <div className="text-sm font-medium">Next milestone:</div>
                            <div className="flex gap-2 items-center">
                              <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                                <Check className="h-3 w-3" />
                              </div>
                              <span className="text-sm">{goal.milestones[0]}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedGoals.map(goal => (
                  <Card
                    key={goal.id}
                    className="border-green-200 bg-green-50/50 dark:bg-green-950/10"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {goal.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-green-600">
                          <Check className="h-4 w-4" />
                          <span className="text-xs">Completed</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">100%</span>
                          </div>
                          <Progress value={100} className="h-2 bg-green-100 dark:bg-green-900/30" />
                        </div>

                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Completed {goal.completedDate}</span>
                          </div>
                          <div className="flex items-center gap-1 text-green-600">
                            <Trophy className="h-4 w-4" />
                            <span>{goal.daysToComplete} days</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Restart
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="archived" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {archivedGoals.map(goal => (
                  <Card key={goal.id} className="opacity-70">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">
                          {goal.category}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          Archived {goal.archivedDate}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{goal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          Restore
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-red-500">
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-md text-center">
                  <div className="text-3xl font-bold">{activeGoals.length}</div>
                  <div className="text-sm text-muted-foreground">Active Goals</div>
                </div>
                <div className="p-4 bg-muted rounded-md text-center">
                  <div className="text-3xl font-bold">{completedGoals.length}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <div className="text-sm font-medium mb-2">Currently Focused On</div>
                {activeGoals.slice(0, 2).map(goal => (
                  <div key={goal.id} className="flex items-center gap-2 mb-2">
                    <div className={`h-2 w-2 rounded-full ${getCategoryColor(goal.category)}`} />
                    <span className="text-sm truncate">{goal.title}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">Average Completion Rate</div>
                  <div className="text-sm font-medium">68%</div>
                </div>
                <Progress value={68} className="h-2" />
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span>12% better than last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Habits & Streaks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {habits.map(habit => (
                <div key={habit.id} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${habit.color}`} />
                      <span className="text-sm font-medium">{habit.name}</span>
                    </div>
                    <span className="text-sm">{habit.currentStreak} days</span>
                  </div>
                  <Progress value={habit.progress} className="h-1" />
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Habits
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedGoals.map(goal => (
                <div
                  key={goal.id}
                  className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${goal.bgColor}`}
                  >
                    {goal.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{goal.title}</div>
                    <div className="text-xs text-muted-foreground">{goal.category}</div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

// Sample data
const activeGoals = [
  {
    id: 1,
    title: 'Practice meditation daily',
    description:
      'Establish a regular meditation routine to improve mindfulness and reduce anxiety.',
    category: 'Mindfulness',
    progress: 45,
    daysLeft: 16,
    streak: 5,
    milestones: [
      'Meditate for 5 minutes daily for one week',
      'Increase to 10 minutes daily',
      'Maintain practice for 30 consecutive days',
    ],
  },
  {
    id: 2,
    title: 'Improve sleep quality',
    description:
      'Develop better sleep habits to enhance overall mental health and daytime energy levels.',
    category: 'Sleep',
    progress: 70,
    daysLeft: 9,
    streak: 12,
    milestones: [
      'Establish consistent bedtime routine',
      'No screen time 1 hour before bed',
      'Sleep 7+ hours for 14 consecutive nights',
    ],
  },
  {
    id: 3,
    title: 'Journal daily feelings',
    description:
      'Record daily emotions and thoughts to identify patterns and improve emotional awareness.',
    category: 'Self-Awareness',
    progress: 25,
    daysLeft: 23,
    streak: 2,
    milestones: [
      'Journal for 5 minutes each evening',
      'Identify 3 emotion triggers weekly',
      'Practice gratitude journaling',
    ],
  },
  {
    id: 4,
    title: 'Reduce anxiety triggers',
    description: 'Identify and develop strategies to manage situations that trigger anxiety.',
    category: 'Anxiety',
    progress: 60,
    daysLeft: 14,
    streak: 0,
    milestones: [
      'Log anxiety events for two weeks',
      'Develop 3 coping strategies',
      'Practice coping techniques when triggered',
    ],
  },
];

const completedGoals = [
  {
    id: 101,
    title: 'Learn basic CBT techniques',
    description:
      'Research and practice cognitive behavioral therapy techniques for managing negative thoughts.',
    category: 'Therapy',
    completedDate: '2 weeks ago',
    daysToComplete: 28,
  },
  {
    id: 102,
    title: 'Establish morning mindfulness',
    description: 'Create a consistent morning routine that incorporates mindfulness practices.',
    category: 'Mindfulness',
    completedDate: '1 month ago',
    daysToComplete: 21,
  },
];

const archivedGoals = [
  {
    id: 201,
    title: 'Read mindfulness book',
    description: "Complete reading 'The Power of Now' by Eckhart Tolle.",
    category: 'Education',
    progress: 35,
    archivedDate: '3 weeks ago',
  },
  {
    id: 202,
    title: 'Reduce social media usage',
    description: 'Limit social media to 30 minutes per day to improve mental focus.',
    category: 'Digital Wellbeing',
    progress: 60,
    archivedDate: '2 months ago',
  },
];

const goalCategories = [
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: <Brain className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 'emotion',
    name: 'Emotional Health',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    icon: <Heart className="h-4 w-4 text-red-500" />,
  },
  {
    id: 'happiness',
    name: 'Happiness',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: <Smile className="h-4 w-4 text-yellow-500" />,
  },
  {
    id: 'physical',
    name: 'Physical Health',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: <Dumbbell className="h-4 w-4 text-green-500" />,
  },
  {
    id: 'social',
    name: 'Social Wellbeing',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    icon: <Users className="h-4 w-4 text-purple-500" />,
  },
  {
    id: 'education',
    name: 'Learning',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    icon: <BookOpen className="h-4 w-4 text-orange-500" />,
  },
];

const habits = [
  {
    id: 1,
    name: 'Morning Meditation',
    currentStreak: 7,
    bestStreak: 14,
    progress: 70,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Journal Writing',
    currentStreak: 4,
    bestStreak: 21,
    progress: 40,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    name: 'Gratitude Practice',
    currentStreak: 12,
    bestStreak: 30,
    progress: 90,
    color: 'bg-yellow-500',
  },
  {
    id: 4,
    name: 'Healthy Sleep Routine',
    currentStreak: 5,
    bestStreak: 10,
    progress: 50,
    color: 'bg-indigo-500',
  },
];

const recommendedGoals = [
  {
    id: 1,
    title: 'Daily Mindful Breathing',
    category: 'Anxiety Management',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    icon: <Brain className="h-4 w-4 text-blue-500" />,
  },
  {
    id: 2,
    title: 'Weekly Nature Walks',
    category: 'Stress Reduction',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    icon: <Dumbbell className="h-4 w-4 text-green-500" />,
  },
  {
    id: 3,
    title: 'Practice Self-Compassion',
    category: 'Emotional Health',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    icon: <Heart className="h-4 w-4 text-red-500" />,
  },
];

// Helper function to get color for goal category
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Mindfulness':
      return 'bg-blue-500';
    case 'Sleep':
      return 'bg-indigo-500';
    case 'Self-Awareness':
      return 'bg-purple-500';
    case 'Anxiety':
      return 'bg-red-500';
    case 'Therapy':
      return 'bg-green-500';
    case 'Education':
      return 'bg-orange-500';
    case 'Digital Wellbeing':
      return 'bg-slate-500';
    default:
      return 'bg-primary';
  }
};

export default Goals;
