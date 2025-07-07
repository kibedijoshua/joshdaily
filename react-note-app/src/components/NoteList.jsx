import React, { useEffect, useState } from 'react';
import './NoteList.css';

function NoteList({ onSelectNote }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/notes')
            .then(res => res.json())
            .then(data => setNotes(data));
    }, []);

    return (
        <div className="note-list">
            <h2>All Notes</h2>
            <ul>
                {notes.map(note => (
                    <li key={note.slug} onClick={() => onSelectNote(note.slug)} className="note-list-item">
                        <h3>{note.title}</h3>
                        <span className="category">{note.category}</span>
                        <span className="date">{new Date(note.created).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NoteList; 