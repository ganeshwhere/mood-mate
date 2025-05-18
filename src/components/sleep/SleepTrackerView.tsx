import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import PageContainer from '../layout/PageContainer';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data - would normally be fetched or stored in state/context
const sleepData = [
  {
    date: '2025-03-10',
    hoursSlept: 7.5,
    quality: 8,
    notes: 'Went to bed early',
  },
  { date: '2025-03-11', hoursSlept: 6.2, quality: 6, notes: 'Restless night' },
  { date: '2025-03-12', hoursSlept: 8.0, quality: 9, notes: 'Great sleep' },
  { date: '2025-03-13', hoursSlept: 7.0, quality: 7, notes: 'Normal night' },
  {
    date: '2025-03-14',
    hoursSlept: 5.5,
    quality: 5,
    notes: 'Woke up several times',
  },
  { date: '2025-03-15', hoursSlept: 7.8, quality: 8, notes: 'Deep sleep' },
  { date: '2025-03-16', hoursSlept: 8.2, quality: 9, notes: 'Very refreshing' },
];

// Format data for the chart
const chartData = sleepData.map(entry => ({
  date: format(new Date(entry.date), 'MMM dd'),
  hours: entry.hoursSlept,
  quality: entry.quality,
}));

const SleepTrackerView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hoursSlept, setHoursSlept] = useState('7.5');
  const [quality, setQuality] = useState([7]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the data to state or backend
    console.log({
      date: date ? format(date, 'yyyy-MM-dd') : '',
      hoursSlept: parseFloat(hoursSlept),
      quality: quality[0],
      notes,
    });

    // Reset form or show success message
  };

  return (
    <PageContainer title="Sleep Tracker" subtitle="Monitor your sleep patterns for better rest">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sleep Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="hours"
                  stroke="#8884d8"
                  name="Hours Slept"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="quality"
                  stroke="#82ca9d"
                  name="Sleep Quality"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log Your Sleep</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date</label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md mx-auto"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="hoursSlept" className="block text-sm font-medium">
                  Hours Slept
                </label>
                <Input
                  id="hoursSlept"
                  type="number"
                  step="0.1"
                  min="0"
                  max="24"
                  value={hoursSlept}
                  onChange={e => setHoursSlept(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Quality (1-10): {quality}</label>
                <Slider value={quality} min={1} max={10} step={1} onValueChange={setQuality} />
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="block text-sm font-medium">
                  Notes
                </label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="How did you sleep?"
                />
              </div>

              <Button type="submit" className="w-full">
                Save Sleep Log
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Sleep History</TabsTrigger>
          <TabsTrigger value="stats">Stats & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="pt-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sleepData.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{format(new Date(entry.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{entry.hoursSlept}</TableCell>
                      <TableCell>{entry.quality}/10</TableCell>
                      <TableCell>{entry.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(
                    sleepData.reduce((sum, entry) => sum + entry.hoursSlept, 0) / sleepData.length
                  ).toFixed(1)}{' '}
                  hrs
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(
                    sleepData.reduce((sum, entry) => sum + entry.quality, 0) / sleepData.length
                  ).toFixed(1)}
                  /10
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Best Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(...sleepData.map(entry => entry.hoursSlept))} hrs
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Sleep Debt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">
                  {(
                    7 * sleepData.length -
                    sleepData.reduce((sum, entry) => sum + entry.hoursSlept, 0)
                  ).toFixed(1)}{' '}
                  hrs
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default SleepTrackerView;
