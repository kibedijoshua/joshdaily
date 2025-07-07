import React, { useState } from 'react';
import NoteList from './components/NoteList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  const [selectedSlug, setSelectedSlug] = useState(null);
  const [refreshNotes, setRefreshNotes] = useState(false);

  const handleSelectNote = (slug) => {
    setSelectedSlug(slug);
  };

  const handleBack = () => {
    setSelectedSlug(null);
  };

  const handleNoteCreated = () => {
    setRefreshNotes(!refreshNotes);
    setSelectedSlug(null);
  };

  return (
    <div className="app-container">
      <h1>Notes App</h1>
      {!selectedSlug ? (
        <>
          <NoteForm onNoteCreated={handleNoteCreated} />
          <NoteList key={refreshNotes} onSelectNote={handleSelectNote} />
        </>
      ) : (
        <NoteDetail slug={selectedSlug} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
