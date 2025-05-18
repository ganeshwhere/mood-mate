/**
 * Notes Page Component
 *
 * This component serves as the main entry point for the Notes feature.
 * It provides a comprehensive note-taking interface with the following capabilities:
 * - Create, read, update, and delete notes
 * - Attach photos to notes
 * - Categorize notes
 * - Search and filter notes
 * - Tag-based organization
 *
 * The component uses the NotesView component which contains the main implementation
 * of all these features.
 */

import NotesView from '@/components/notes/NotesView';

const Notes = () => {
  return (
    <div className="min-h-screen bg-background">
      <NotesView />
    </div>
  );
};

export default Notes;
