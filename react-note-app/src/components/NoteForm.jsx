import React, { useState } from 'react';
import './NoteForm.css';

function NoteForm({ onNoteCreated }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('PERSONAL');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://127.0.0.1:8000/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, body, category })
            });
            if (!response.ok) throw new Error('Failed to create note');
            setTitle('');
            setBody('');
            setCategory('PERSONAL');
            onNoteCreated();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <h2>New Note</h2>
            {error && <div className="error">{error}</div>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={e => setBody(e.target.value)}
                required
            />
            <select value={category} onChange={e => setCategory(e.target.value)}>
                <option value="BUSINESS">Business</option>
                <option value="PERSONAL">Personal</option>
                <option value="IMPORTANT">Important</option>
            </select>
            <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Note'}</button>
        </form>
    );
}

export default NoteForm; 