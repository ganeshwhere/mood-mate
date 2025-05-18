import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Brain,
  Heart,
  LineChart,
  FileText,
  MessageCircle,
  Flame,
  Book,
  Moon,
  CloudSun,
  Bed,
} from 'lucide-react';
import MoodCard from './MoodCard';
import StatsOverview from './StatsOverview';
import PageContainer from '../layout/PageContainer';
import { cn } from '@/lib/utils';
import BreathingExercise from '../exercises/BreathingExercise';
import GratitudeJournal from '../gratitude/GratitudeJournal';

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  color,
  link,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  link: string;
}) => (
  <Link
    to={link}
    className={cn(
      'bg-card border rounded-xl p-6 hover:shadow-md transition-all',
      'flex flex-col h-full'
    )}
  >
    <div className="mb-4">
      <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', color)}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm mb-4 flex-1">{description}</p>
    <div className="flex items-center text-primary font-medium text-sm mt-auto">
      <span>Explore</span>
      <ArrowRight size={16} className="ml-1" />
    </div>
  </Link>
);

const DashboardView = () => {
  return (
    <PageContainer title="Dashboard" subtitle="Your mental health overview">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <MoodCard
          title="Average Mood"
          value="7.8/10"
          description="Last 7 days"
          type="heart"
          change={5}
        />
        <MoodCard
          title="Mood Trend"
          value="Positive"
          description="Improving"
          type="trending"
          change={12}
        />
        <MoodCard title="Journal Entries" value={18} description="This month" type="award" />
        <MoodCard title="Tracking Streak" value="14 days" description="Keep it up!" type="streak" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <StatsOverview />
        </div>
        <div>
          <BreathingExercise />
        </div>
      </div>

      <div className="mb-8">
        <GratitudeJournal />
      </div>

      <h2 className="text-2xl font-semibold mb-6">Features & Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <FeatureCard
          title="Mood Tracker"
          description="Track your daily moods, emotions and activities to identify patterns in your mental wellbeing."
          icon={LineChart}
          color="bg-blue-500"
          link="/app/tracker"
        />
        <FeatureCard
          title="Mood Calendar"
          description="View your mood history in calendar format to spot trends and patterns over time."
          icon={Heart}
          color="bg-red-500"
          link="/app/calendar"
        />
        <FeatureCard
          title="Journal & Notes"
          description="Write down your thoughts and feelings to process emotions and gain insights."
          icon={FileText}
          color="bg-emerald-500"
          link="/app/notes"
        />
        <FeatureCard
          title="Meditation"
          description="Practice mindfulness meditation with guided sessions to reduce stress and anxiety."
          icon={CloudSun}
          color="bg-indigo-500"
          link="/app/meditation"
        />
        <FeatureCard
          title="Breathing Exercises"
          description="Use breathing techniques to calm your mind, reduce stress, and improve focus."
          icon={Brain}
          color="bg-amber-500"
          link="/app/breathing"
        />
        <FeatureCard
          title="Sleep Tracker"
          description="Monitor your sleep patterns and quality to improve your rest and overall wellbeing."
          icon={Moon}
          color="bg-purple-500"
          link="/app/sleep-tracker"
        />
        <FeatureCard
          title="Journal Prompts"
          description="Explore guided questions to promote self-reflection and emotional awareness."
          icon={Book}
          color="bg-pink-500"
          link="/app/journal-prompts"
        />
        <FeatureCard
          title="Gratitude Journal"
          description="Practice gratitude by recording what you're thankful for to improve your outlook."
          icon={Heart}
          color="bg-green-500"
          link="/app/gratitude"
        />
        <FeatureCard
          title="Mood Mate AI"
          description="Chat with our AI assistant for mental health support, exercises, and resources."
          icon={MessageCircle}
          color="bg-teal-500"
          link="/app/chat"
        />
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-lg font-medium mb-2">Quick Tip for Today</h3>
        <p className="text-muted-foreground">
          Taking just 5 minutes for a brief mindfulness practice can significantly reduce stress
          hormones and help you refocus. Try the breathing exercise above!
        </p>
      </div>
    </PageContainer>
  );
};

export default DashboardView;
