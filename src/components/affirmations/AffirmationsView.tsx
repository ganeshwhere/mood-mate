import { useState } from 'react';
import { Plus, X, Save, Trash2, Edit2 } from 'lucide-react';
import PageContainer from '../layout/PageContainer';
import { cn } from '@/lib/utils';

interface Affirmation {
  id: string;
  text: string;
  color: string;
}

const colors = [
  'bg-blue-100 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700',
  'bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700',
  'bg-purple-100 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700',
  'bg-pink-100 dark:bg-pink-900/20 border-pink-300 dark:border-pink-700',
  'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700',
  'bg-teal-100 dark:bg-teal-900/20 border-teal-300 dark:border-teal-700',
];

const initialAffirmations: Affirmation[] = [
  { id: '1', text: 'I am capable of achieving my goals', color: colors[0] },
  { id: '2', text: 'I deserve love and happiness', color: colors[1] },
  { id: '3', text: 'I am grateful for the present moment', color: colors[2] },
  {
    id: '4',
    text: 'I am resilient and can overcome challenges',
    color: colors[3],
  },
];

const AffirmationsView = () => {
  const [affirmations, setAffirmations] = useState<Affirmation[]>(initialAffirmations);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newText, setNewText] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleAddAffirmation = () => {
    if (newText.trim()) {
      const newAffirmation: Affirmation = {
        id: Date.now().toString(),
        text: newText,
        color: selectedColor,
      };
      setAffirmations([...affirmations, newAffirmation]);
      setNewText('');
      setSelectedColor(colors[0]);
      setIsAdding(false);
    }
  };

  const handleUpdateAffirmation = (id: string) => {
    if (newText.trim()) {
      setAffirmations(
        affirmations.map(affirmation =>
          affirmation.id === id
            ? { ...affirmation, text: newText, color: selectedColor }
            : affirmation
        )
      );
      setNewText('');
      setSelectedColor(colors[0]);
      setIsEditing(null);
    }
  };

  const handleDeleteAffirmation = (id: string) => {
    setAffirmations(affirmations.filter(affirmation => affirmation.id !== id));
  };

  const startEditing = (affirmation: Affirmation) => {
    setIsEditing(affirmation.id);
    setNewText(affirmation.text);
    setSelectedColor(affirmation.color);
  };

  return (
    <PageContainer
      title="Positive Affirmations"
      subtitle="Build self-confidence and a positive mindset"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl border shadow-sm p-6 mb-6 dark:border-border">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">Your Affirmations</h3>
              <p className="text-muted-foreground">
                Daily positive statements to boost your mindset
              </p>
            </div>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
              >
                <Plus size={16} />
                <span>Add New</span>
              </button>
            )}
          </div>

          {isAdding && (
            <div className="mb-6 bg-accent/10 dark:bg-accent/20 p-4 rounded-lg animate-fade-in">
              <div className="mb-4">
                <label htmlFor="affirmation" className="block text-sm font-medium mb-1">
                  Enter your affirmation
                </label>
                <textarea
                  id="affirmation"
                  rows={3}
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  className="w-full rounded-md p-3 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                  placeholder="I am..."
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Choose a color</label>
                <div className="flex flex-wrap gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'w-6 h-6 rounded-full border',
                        color,
                        selectedColor === color
                          ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-background'
                          : ''
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm transition-colors"
                >
                  <X size={16} className="mr-1 inline" />
                  Cancel
                </button>
                <button
                  onClick={handleAddAffirmation}
                  disabled={!newText.trim()}
                  className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm disabled:opacity-50 transition-colors"
                >
                  <Save size={16} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {affirmations.map(affirmation => (
              <div
                key={affirmation.id}
                className={cn(
                  'p-4 rounded-lg border relative group hover:shadow-sm transition-shadow',
                  isEditing === affirmation.id
                    ? 'ring-2 ring-primary dark:ring-primary'
                    : affirmation.color
                )}
              >
                {isEditing === affirmation.id ? (
                  <div className="animate-fade-in">
                    <textarea
                      rows={3}
                      value={newText}
                      onChange={e => setNewText(e.target.value)}
                      className="w-full rounded-md p-3 bg-background border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                    />
                    <div className="flex flex-wrap gap-2 mb-3">
                      {colors.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={cn(
                            'w-5 h-5 rounded-full border',
                            color,
                            selectedColor === color
                              ? 'ring-2 ring-primary ring-offset-1 dark:ring-offset-background'
                              : ''
                          )}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setIsEditing(null)}
                        className="px-2 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateAffirmation(affirmation.id)}
                        className="px-2 py-1 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground text-xs transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-foreground">{affirmation.text}</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => startEditing(affirmation)}
                        className="p-1 rounded-full hover:bg-secondary/80 text-foreground"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteAffirmation(affirmation.id)}
                        className="p-1 rounded-full hover:bg-secondary/80 text-foreground"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {affirmations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No affirmations yet.</p>
              <p className="text-sm">Start by adding a positive statement!</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t dark:border-border">
            <h4 className="font-medium mb-2">Tips for Effective Affirmations:</h4>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm">
              <li>Use present tense, as if the affirmation is already true</li>
              <li>Make them personal by using "I" statements</li>
              <li>Keep them positive - focus on what you want, not what you don't want</li>
              <li>Repeat them daily, ideally in the morning or before bed</li>
              <li>Write them down, speak them aloud, or both for added impact</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AffirmationsView;
