import { useTheme } from '@/context/ThemeContext';
import {
  AreaChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data - in a real app, this would come from your API or state
const weeklyMoodData = [
  { day: 'Mon', mood: 8, hours: 7 },
  { day: 'Tue', mood: 6, hours: 6 },
  { day: 'Wed', mood: 7, hours: 8 },
  { day: 'Thu', mood: 9, hours: 7 },
  { day: 'Fri', mood: 7, hours: 6 },
  { day: 'Sat', mood: 8, hours: 9 },
  { day: 'Sun', mood: 9, hours: 8 },
];

const StatsOverview = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#f1f5f9' : '#1e293b';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <div className="p-6 rounded-xl border bg-card shadow-sm">
        <h3 className="text-lg font-medium mb-4">Weekly Mood</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyMoodData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" tick={{ fill: textColor }} stroke={gridColor} />
              <YAxis
                tick={{ fill: textColor }}
                stroke={gridColor}
                domain={[0, 10]}
                label={{
                  value: 'Mood (1-10)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: textColor },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                  borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                  color: textColor,
                }}
              />
              <Area
                type="monotone"
                dataKey="mood"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#moodGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-xl border bg-card shadow-sm">
        <h3 className="text-lg font-medium mb-4">Sleep Duration</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyMoodData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="day" tick={{ fill: textColor }} stroke={gridColor} />
              <YAxis
                tick={{ fill: textColor }}
                stroke={gridColor}
                label={{
                  value: 'Hours',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: textColor },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#fff',
                  borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
                  color: textColor,
                }}
              />
              <Bar dataKey="hours" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
