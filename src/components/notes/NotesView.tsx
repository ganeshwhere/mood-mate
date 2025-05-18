import { useState } from 'react';
import {
  PlusCircle,
  Search,
  Trash,
  Edit,
  Calendar,
  Tag,
  Image as ImageIcon,
  Folder,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '../layout/PageContainer';

// Mock data - in a real app would come from backend
const initialNotes = [
  {
    id: '1',
    title: 'Meditation Reflections',
    content:
      'Today I tried a new breathing technique during meditation. It helped me focus better and reduced my anxiety significantly.',
    date: '2023-10-28',
    tags: ['meditation', 'anxiety', 'techniques'],
    category: 'Personal Growth',
    images: [],
  },
  {
    id: '2',
    title: 'Work Stress',
    content:
      "The project deadline is approaching and I'm feeling overwhelmed. Need to break down tasks into smaller steps and prioritize.",
    date: '2023-10-25',
    tags: ['work', 'stress', 'planning'],
    category: 'Work',
    images: [],
  },
  {
    id: '3',
    title: 'Gratitude List',
    content:
      "1. My supportive friends\n2. My health\n3. The beautiful weather today\n4. The delicious dinner I had\n5. The good book I'm reading",
    date: '2023-10-22',
    tags: ['gratitude', 'positivity'],
    category: 'Health',
    images: [],
  },
  {
    id: '4',
    title: 'Therapy Session Notes',
    content:
      "We discussed cognitive distortions today. I need to work on recognizing when I'm catastrophizing and challenge those thoughts.",
    date: '2023-10-18',
    tags: ['therapy', 'cognitive', 'techniques'],
    category: 'Personal Growth',
    images: [],
  },
  {
    id: '5',
    title: 'Weekend Reflection',
    content:
      'Had a wonderful weekend hiking in the mountains. The fresh air and exercise really improved my mood and energy levels.',
    date: '2023-10-15',
    tags: ['exercise', 'nature', 'mood'],
    category: 'Health',
    images: [],
  },
];

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  category: string;
  images: string[];
}

const categories = ['Personal Growth', 'Work', 'Health', 'Family', 'Ideas', 'Other'];

const NotesView = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editCategory, setEditCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredNotes = notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setEditMode(false);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditTags(note.tags);
    setEditCategory(note.category);
  };

  const handleEditToggle = () => {
    if (selectedNote) {
      setEditMode(!editMode);
      setEditTitle(selectedNote.title);
      setEditContent(selectedNote.content);
      setEditTags(selectedNote.tags);
      setEditCategory(selectedNote.category);
    }
  };

  const handleSaveEdit = () => {
    if (selectedNote) {
      const updatedNotes = notes.map(note =>
        note.id === selectedNote.id
          ? {
              ...note,
              title: editTitle,
              content: editContent,
              tags: editTags,
              category: editCategory,
            }
          : note
      );
      setNotes(updatedNotes);
      setSelectedNote({
        ...selectedNote,
        title: editTitle,
        content: editContent,
        tags: editTags,
        category: editCategory,
      });
      setEditMode(false);
    }
  };

  const handleDeleteNote = () => {
    if (selectedNote) {
      setNotes(notes.filter(note => note.id !== selectedNote.id));
      setSelectedNote(null);
      setEditMode(false);
    }
  };

  const handleCreateNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      category: 'Other',
      images: [],
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setEditMode(true);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
    setEditTags(newNote.tags);
    setEditCategory(newNote.category);
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !editTags.includes(tag.trim())) {
      setEditTags([...editTags, tag.trim()]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditTags(editTags.filter(t => t !== tag));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (selectedNote) {
          const newImage = reader.result as string;
          const updatedNote = {
            ...selectedNote,
            images: [...selectedNote.images, newImage],
          };

          setNotes(notes.map(note => (note.id === selectedNote.id ? updatedNote : note)));
          setSelectedNote(updatedNote);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (imageIndex: number) => {
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        images: selectedNote.images.filter((_, index) => index !== imageIndex),
      };

      setNotes(notes.map(note => (note.id === selectedNote.id ? updatedNote : note)));
      setSelectedNote(updatedNote);
    }
  };

  const handleCategoryChange = (category: string) => {
    setEditCategory(category);
    if (selectedNote) {
      const updatedNote = {
        ...selectedNote,
        category,
      };

      setNotes(notes.map(note => (note.id === selectedNote.id ? updatedNote : note)));
      setSelectedNote(updatedNote);
    }
  };

  return (
    <PageContainer title="Notes" subtitle="Journal your thoughts and feelings">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
        {/* Sidebar with notes list */}
        <div className="md:col-span-4 bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
            />
            <button
              onClick={handleCreateNewNote}
              className="p-1 rounded-full hover:bg-secondary transition-colors"
              aria-label="Create new note"
            >
              <PlusCircle size={18} className="text-primary" />
            </button>
          </div>

          {/* Category filter */}
          <div className="p-2 border-b">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full p-1 text-sm rounded border bg-background"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Notes list */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotes.length > 0 ? (
              <ul className="divide-y">
                {filteredNotes.map(note => (
                  <li key={note.id}>
                    <button
                      onClick={() => handleNoteSelect(note)}
                      className={cn(
                        'w-full text-left p-4 hover:bg-secondary/50 transition-colors',
                        selectedNote?.id === note.id && 'bg-secondary'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Folder size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{note.category}</span>
                      </div>
                      <h3 className="font-medium truncate">{note.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        <span>{new Date(note.date).toLocaleDateString()}</span>
                        {note.images.length > 0 && (
                          <div className="flex items-center gap-1">
                            <ImageIcon size={12} />
                            <span>{note.images.length} image(s)</span>
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
                <p>No notes found</p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-primary text-sm underline"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Note editor */}
        <div className="md:col-span-8 bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col">
          {selectedNote ? (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="text-lg font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
                        placeholder="Note title"
                      />
                      <select
                        value={editCategory}
                        onChange={e => handleCategoryChange(e.target.value)}
                        className="text-sm p-1 rounded border bg-background"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <h2 className="text-lg font-medium">{selectedNote.title}</h2>
                      <span className="text-sm text-muted-foreground">{selectedNote.category}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editMode ? (
                    <button
                      onClick={handleSaveEdit}
                      className="p-2 rounded hover:bg-secondary transition-colors text-sm font-medium text-primary"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleEditToggle}
                      className="p-2 rounded hover:bg-secondary transition-colors"
                      aria-label="Edit note"
                    >
                      <Edit size={18} />
                    </button>
                  )}
                  <button
                    onClick={handleDeleteNote}
                    className="p-2 rounded hover:bg-secondary transition-colors text-destructive"
                    aria-label="Delete note"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {editMode ? (
                  <textarea
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    className="w-full h-full min-h-[200px] bg-transparent border-none outline-none resize-none focus:ring-2 focus:ring-primary rounded p-2"
                    placeholder="Write your thoughts..."
                  />
                ) : (
                  <div className="whitespace-pre-wrap">{selectedNote.content}</div>
                )}

                {/* Image gallery */}
                {selectedNote.images.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Attached Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedNote.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          {editMode && (
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image upload button */}
                {editMode && (
                  <div className="mt-4">
                    <label className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground cursor-pointer hover:bg-secondary/80 transition-colors">
                      <ImageIcon size={16} />
                      <span>Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex items-center mb-2">
                  <Tag size={16} className="text-muted-foreground mr-2" />
                  <span className="text-sm font-medium">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editMode ? editTags : selectedNote.tags).map(tag => (
                    <div
                      key={tag}
                      className={cn(
                        'px-2 py-1 rounded-full text-xs',
                        'bg-secondary text-secondary-foreground',
                        editMode && 'flex items-center gap-1'
                      )}
                    >
                      {tag}
                      {editMode && (
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-muted-foreground hover:text-destructive ml-1"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}

                  {editMode && (
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        const input = e.currentTarget.elements.namedItem('tag') as HTMLInputElement;
                        handleAddTag(input.value);
                        input.value = '';
                      }}
                      className="inline-flex"
                    >
                      <input
                        type="text"
                        name="tag"
                        placeholder="Add tag..."
                        className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground outline-none focus:ring-1 focus:ring-primary"
                      />
                    </form>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
              <p>Select a note to view or</p>
              <button
                onClick={handleCreateNewNote}
                className="mt-2 flex items-center gap-1 text-primary"
              >
                <PlusCircle size={16} />
                <span>Create a new note</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default NotesView;
