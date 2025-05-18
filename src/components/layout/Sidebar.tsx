import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageCircle,
  Settings,
  ChevronLeft,
  Menu,
  LineChart,
  Brain,
  Heart,
  Sparkles,
  Flame,
  Moon,
  Book,
  Bed,
  CloudSun,
  X,
  User,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

/* Custom scrollbar styles */
import '@/styles/scrollbar.css';

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

const Sidebar = ({ onExpandChange }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Auto-collapse sidebar on desktop
    if (!isMobile) {
      setExpanded(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    if (!isMobile) {
      const newExpanded = !expanded;
      setExpanded(newExpanded);
      onExpandChange?.(newExpanded);
    }
  };

  const mainNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/app', end: true },
    { name: 'Mood Tracker', icon: LineChart, path: '/app/tracker' },
    { name: 'Calendar', icon: Calendar, path: '/app/calendar' },
    { name: 'Notes', icon: FileText, path: '/app/notes' },
    { name: 'Mood Mate AI', icon: MessageCircle, path: '/app/chat' },
  ];

  const toolsNavItems = [
    { name: 'Breathing', icon: Brain, path: '/app/breathing' },
    { name: 'Meditation', icon: CloudSun, path: '/app/meditation' },
    { name: 'Gratitude', icon: Heart, path: '/app/gratitude' },
    { name: 'Affirmations', icon: Sparkles, path: '/app/affirmations' },
    { name: 'Habits', icon: Flame, path: '/app/habits' },
    { name: 'Journal Prompts', icon: Book, path: '/app/journal-prompts' },
    { name: 'Sleep Tracker', icon: Moon, path: '/app/sleep-tracker' },
    { name: 'Mood Journal', icon: Bed, path: '/app/mood-journal' },
    { name: 'Community', icon: User, path: '/app/community' },
    { name: 'Analytics', icon: LineChart, path: '/app/progress-analytics' },
    { name: 'Therapy Resources', icon: Book, path: '/app/therapy-resources' },
    { name: 'Goals', icon: Target, path: '/app/goals' },
    { name: 'Assessment', icon: X, path: '/app/assessment' },
  ];

  // Desktop sidebar content
  const sidebarContent = (
    <>
      <div className="p-4 flex items-center justify-between h-16 border-b border-border">
        {isMobile ? (
          <h1 className="text-xl font-bold">Mood Mate</h1>
        ) : (
          <>
            {expanded && <h1 className="text-xl font-bold animate-fade-in">Mood Mate</h1>}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {expanded ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>
          </>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-thick">
        <div className="mb-6">
          {!expanded && !isMobile && (
            <div className="flex justify-center mb-2">
              <span className="text-xs text-muted-foreground">Menu</span>
            </div>
          )}
          <ul className="space-y-1">
            {mainNavItems.map(item => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  onClick={() => isMobile && setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 rounded-lg transition-all duration-200',
                      'hover:bg-secondary group',
                      isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                    )
                  }
                >
                  <item.icon
                    size={20}
                    className={cn(
                      'flex-shrink-0 transition-all',
                      isMobile ? 'mr-3' : expanded ? 'mr-3' : 'mx-auto'
                    )}
                  />
                  {(isMobile || expanded) && (
                    <span className="animate-fade-in text-sm font-medium truncate">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {(isMobile || expanded) && (
          <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">Tools</div>
        )}
        {!expanded && !isMobile && (
          <div className="flex justify-center mb-2 mt-6">
            <span className="text-xs text-muted-foreground">Tools</span>
          </div>
        )}
        <ul className="space-y-1 mb-6">
          {toolsNavItems.map(item => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center px-3 py-2 rounded-lg transition-all duration-200',
                    'hover:bg-secondary group',
                    isActive ? 'bg-primary/10 text-primary' : 'text-foreground'
                  )
                }
              >
                <item.icon
                  size={20}
                  className={cn(
                    'flex-shrink-0 transition-all',
                    isMobile ? 'mr-3' : expanded ? 'mr-3' : 'mx-auto'
                  )}
                />
                {(isMobile || expanded) && (
                  <span className="animate-fade-in text-sm font-medium truncate">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {(isMobile || expanded) && (
          <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">Other</div>
        )}
        {!expanded && !isMobile && (
          <div className="flex justify-center mb-2 mt-6">
            <span className="text-xs text-muted-foreground">Other</span>
          </div>
        )}

        <div className="mt-auto">
          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                isActive && 'bg-accent text-foreground'
              )
            }
          >
            <Settings className="h-4 w-4" />
            <span className={cn('text-sm font-medium', !expanded && 'hidden')}>Settings</span>
          </NavLink>
          <NavLink
            to="/app/profile"
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground',
                isActive && 'bg-accent text-foreground'
              )
            }
          >
            <User className="h-4 w-4" />
            <span className={cn('text-sm font-medium', !expanded && 'hidden')}>Profile</span>
          </NavLink>
        </div>
      </nav>

      <div className="p-4 flex items-center border-t border-border">
        <ThemeToggle />
        {(isMobile || expanded) && (
          <div className="ml-3 animate-fade-in">
            <p className="text-sm font-medium">Theme</p>
          </div>
        )}
      </div>
    </>
  );

  // Mobile sidebar implementation using Sheet component
  if (isMobile) {
    return (
      <>
        <div className="fixed top-4 right-4 z-50">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 w-[275px] bg-background border-r border-border"
            >
              <div className="h-full flex flex-col">{sidebarContent}</div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="h-16"></div> {/* Spacer for mobile */}
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-background',
        'transition-all duration-300 ease-in-out',
        expanded ? 'w-64' : 'w-20'
      )}
    >
      {sidebarContent}
    </div>
  );
};

export default Sidebar;
