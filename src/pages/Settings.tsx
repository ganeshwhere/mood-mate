import { useState } from 'react';
import { Moon, Sun, Bell, User, Lock, HelpCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <PageContainer title="Settings" subtitle="Customize your Mood Mate experience">
      <div className="max-w-2xl animate-fade-in">
        <div className="bg-card rounded-xl border shadow-sm divide-y">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Sun size={20} className="dark:hidden" />
                  <Moon size={20} className="hidden dark:block" />
                </div>
                <div>
                  <h3 className="font-medium">Appearance</h3>
                  <p className="text-sm text-muted-foreground">Customize how Mood Mate looks</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Theme</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={cn(
                      'flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all',
                      theme === 'light' ? 'border-primary' : 'border-border'
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-white border shadow-sm flex items-center justify-center">
                      <Sun size={20} className="text-amber-500" />
                    </div>
                    <span className="text-sm font-medium">Light</span>
                  </button>

                  <button
                    onClick={() => setTheme('dark')}
                    className={cn(
                      'flex flex-col items-center space-y-2 p-3 rounded-lg border transition-all',
                      theme === 'dark' ? 'border-primary' : 'border-border'
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 shadow-sm flex items-center justify-center">
                      <Moon size={20} className="text-slate-300" />
                    </div>
                    <span className="text-sm font-medium">Dark</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <Bell size={20} />
                </div>
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your notification preferences
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Enable notifications</p>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={cn(
                    'relative inline-flex items-center h-6 rounded-full w-11 transition-colors',
                    notifications ? 'bg-primary' : 'bg-secondary'
                  )}
                >
                  <span
                    className={cn(
                      'inline-block w-4 h-4 transform bg-white rounded-full transition-transform',
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Daily mood check-in reminder</p>
                <button
                  className={cn(
                    'relative inline-flex items-center h-6 rounded-full w-11 transition-colors',
                    notifications ? 'bg-primary' : 'bg-secondary'
                  )}
                  disabled={!notifications}
                >
                  <span
                    className={cn(
                      'inline-block w-4 h-4 transform bg-white rounded-full transition-transform',
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <HelpCircle size={20} />
                </div>
                <div>
                  <h3 className="font-medium">About</h3>
                  <p className="text-sm text-muted-foreground">About Mood Mate</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm mb-1">Version</p>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>

              <div>
                <p className="text-sm mb-1">Legal</p>
                <div className="space-y-1">
                  <button className="text-sm text-primary">Privacy Policy</button>
                  <br />
                  <button className="text-sm text-primary">Terms of Service</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Settings;
