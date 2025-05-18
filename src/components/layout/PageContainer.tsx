import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import '@/styles/scrollbar.css';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

const PageContainer = ({ children, className, title, subtitle }: PageContainerProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'w-full h-full overflow-auto animate-fade-in scrollbar-thick',
        isMobile ? 'p-4' : 'p-6 md:p-8',
        className
      )}
    >
      {(title || subtitle) && (
        <div className={cn('mb-6', isMobile && 'mb-4')}>
          {title && (
            <h1
              className={cn(
                'font-semibold tracking-tight',
                isMobile ? 'text-xl' : 'text-2xl md:text-3xl'
              )}
            >
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-muted-foreground mt-1 text-sm md:text-base">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
