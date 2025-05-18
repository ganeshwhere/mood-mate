import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const Index = () => {
  const isMobile = useIsMobile();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  useEffect(() => {
    // Auto-expand sidebar on desktop
    if (!isMobile) {
      setSidebarExpanded(true);
    }
  }, [isMobile]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar onExpandChange={setSidebarExpanded} />
        <main
          className={cn(
            'flex-1 min-h-screen transition-all duration-300 ease-in-out',
            isMobile ? 'px-4' : sidebarExpanded ? 'pl-64' : 'pl-20'
          )}
        >
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
