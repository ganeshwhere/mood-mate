import { Heart, TrendingUp, Award, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MoodCardProps {
  title: string;
  value: string | number;
  description?: string;
  type: 'heart' | 'trending' | 'award' | 'streak';
  change?: number;
  className?: string;
}

const MoodCard = ({ title, value, description, type, change, className }: MoodCardProps) => {
  const icons = {
    heart: Heart,
    trending: TrendingUp,
    award: Award,
    streak: Clock,
  };

  const Icon = icons[type];

  const colors = {
    heart: 'text-red-500 bg-red-500/10',
    trending: 'text-blue-500 bg-blue-500/10',
    award: 'text-amber-500 bg-amber-500/10',
    streak: 'text-purple-500 bg-purple-500/10',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden p-6 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md',
        'animate-fade-in',
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          {typeof change !== 'undefined' && (
            <p
              className={cn(
                'text-xs font-medium mt-2',
                change >= 0 ? 'text-emerald-500' : 'text-red-500'
              )}
            >
              {change >= 0 ? '+' : ''}
              {change}% from previous week
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-full', colors[type])}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
};

export default MoodCard;
