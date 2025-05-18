import { useState } from 'react';
import { PlusCircle, Heart, ThumbsUp, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = 'relationships' | 'basics' | 'health' | 'nature' | 'growth' | 'other';

interface GratitudeEntry {
  id: string;
  content: string;
  date: string;
  category: Category;
}

// Mock data - in a real app would come from backend
const initialEntries: GratitudeEntry[] = [
  {
    id: '1',
    content: "I'm grateful for my supportive friends who always listen when I need to talk.",
    date: '2023-10-28',
    category: 'relationships',
  },
  {
    id: '2',
    content: 'Thankful for having access to clean water and nutritious food every day.',
    date: '2023-10-25',
    category: 'basics',
  },
  {
    id: '3',
    content: 'Grateful for the beautiful sunset I witnessed today on my evening walk.',
    date: '2023-10-22',
    category: 'nature',
  },
];

const categories: {
  value: Category;
  label: string;
  icon: React.ElementType;
}[] = [
  { value: 'relationships', label: 'Relationships', icon: Heart },
  { value: 'basics', label: 'Basic Needs', icon: ThumbsUp },
  { value: 'health', label: 'Health & Wellbeing', icon: Heart },
  { value: 'nature', label: 'Nature & Beauty', icon: Heart },
  { value: 'growth', label: 'Personal Growth', icon: ThumbsUp },
  { value: 'other', label: 'Other', icon: Heart },
];

const GratitudeJournal = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>(initialEntries);
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState('');
  const [category, setCategory] = useState<Category>('other');

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      const entry: GratitudeEntry = {
        id: Date.now().toString(),
        content: newEntry,
        date: new Date().toISOString().split('T')[0],
        category,
      };
      setEntries([entry, ...entries]);
      setNewEntry('');
      setCategory('other');
      setIsAdding(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const getCategoryDetails = (categoryValue: Category) => {
    return categories.find(cat => cat.value === categoryValue) || categories[5]; // Default to "other"
  };

  return (
    <div className="p-6 bg-card rounded-xl border shadow-sm animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold">Gratitude Journal</h3>
          <p className="text-muted-foreground">Record what you're thankful for</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm"
          >
            <PlusCircle size={16} />
            <span>New Entry</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="mb-6 bg-secondary/30 p-4 rounded-lg animate-fade-in">
          <div className="mb-4">
            <label htmlFor="gratitude" className="block text-sm font-medium mb-1">
              What are you grateful for today?
            </label>
            <textarea
              id="gratitude"
              rows={3}
              value={newEntry}
              onChange={e => setNewEntry(e.target.value)}
              className="w-full rounded-md p-3 bg-background border resize-none"
              placeholder="I'm grateful for..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm flex items-center gap-1',
                      category === cat.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    )}
                  >
                    <Icon size={14} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 rounded-lg bg-secondary text-secondary-foreground text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEntry}
              disabled={!newEntry.trim()}
              className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-50"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {entries.length > 0 ? (
          entries.map(entry => {
            const catDetails = getCategoryDetails(entry.category);
            const Icon = catDetails.icon;

            return (
              <div key={entry.id} className="p-4 bg-secondary/20 rounded-lg relative group">
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded-full"
                >
                  <X size={16} />
                </button>
                <p className="mb-2">{entry.content}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon size={14} />
                    <span>{catDetails.label}</span>
                  </div>
                  <span>{new Date(entry.date).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No gratitude entries yet.</p>
            <p className="text-sm">Start by adding what you're grateful for today!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GratitudeJournal;
