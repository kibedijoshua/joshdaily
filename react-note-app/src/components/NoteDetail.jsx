import React, { useEffect, useState } from 'react';
import './NoteDetail.css';

function NoteDetail({ slug, onBack }) {
    const [note, setNote] = useState(null);

    useEffect(() => {
        if (slug) {
            fetch(`http://127.0.0.1:8000/notes/${slug}/`)
                .then(res => res.json())
                .then(data => setNote(data));
        }
    }, [slug]);

    if (!note) return <div className="note-detail">Loading...</div>;

    return (
        <div className="note-detail">
            <button className="back-btn" onClick={onBack}>&larr; Back</button>
            <h2>{note.title}</h2>
            <div className="category">{note.category}</div>
            <div className="date">Created: {new Date(note.created).toLocaleString()}</div>
            <div className="date">Updated: {new Date(note.updated).toLocaleString()}</div>
            <p className="body">{note.body}</p>
        </div>
    );
}

export default NoteDetail; 