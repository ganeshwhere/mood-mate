import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ThemeProvider } from '@/components/theme-provider';
import Index from './pages/Index';
import Landing from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Calendar from './pages/Calendar';
import Notes from './pages/Notes';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Breathing from './pages/Breathing';
import Gratitude from './pages/Gratitude';
import Affirmations from './pages/Affirmations';
import Habits from './pages/Habits';
import Meditation from './pages/Meditation';
import JournalPrompts from './pages/JournalPrompts';
import SleepTracker from './pages/SleepTracker';
import MoodJournal from './pages/MoodJournal';
import Community from './pages/Community';
import ProgressAnalytics from './pages/ProgressAnalytics';
import TherapyResources from './pages/TherapyResources';
import Goals from './pages/Goals';
import Assessment from './pages/Assessment';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="mood-mate-theme">
      <TooltipProvider>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="tracker" element={<Tracker />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="notes" element={<Notes />} />
                <Route path="chat" element={<Chat />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
                <Route path="breathing" element={<Breathing />} />
                <Route path="gratitude" element={<Gratitude />} />
                <Route path="affirmations" element={<Affirmations />} />
                <Route path="habits" element={<Habits />} />
                <Route path="meditation" element={<Meditation />} />
                <Route path="journal-prompts" element={<JournalPrompts />} />
                <Route path="sleep-tracker" element={<SleepTracker />} />
                <Route path="mood-journal" element={<MoodJournal />} />
                <Route path="community" element={<Community />} />
                <Route path="progress-analytics" element={<ProgressAnalytics />} />
                <Route path="therapy-resources" element={<TherapyResources />} />
                <Route path="goals" element={<Goals />} />
                <Route path="assessment" element={<Assessment />} />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
