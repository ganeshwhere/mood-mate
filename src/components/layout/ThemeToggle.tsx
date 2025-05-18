import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'w-10 h-10 flex items-center justify-center rounded-full transition-all',
        'hover:bg-secondary active:scale-95',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="text-foreground transition-all" />
      ) : (
        <Sun size={20} className="text-foreground transition-all" />
      )}
    </button>
  );
};

export default ThemeToggle;
