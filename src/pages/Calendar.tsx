import CalendarView from '@/components/calendar/CalendarView';
import type { ViewMode } from '@/components/calendar/CalendarView';
import PageContainer from '@/components/layout/PageContainer';

const Calendar = () => {
  // Get the current view and date from the URL if available
  const view =
    ((typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('view')
      : null) as ViewMode) || 'calendar';
  const dateParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('date') : null;

  return (
    <PageContainer title="Mood Calendar" subtitle="Track your mood patterns over time">
      <div className="h-[calc(100vh-12rem)] w-full">
        <CalendarView
          initialView={view}
          initialDate={dateParam ? new Date(dateParam) : undefined}
        />
      </div>
    </PageContainer>
  );
};

export default Calendar;
