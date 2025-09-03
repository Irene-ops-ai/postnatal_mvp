import React, { useState, useEffect } from "react";
import "../styles/journal.css";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Survey states
  const [survey, setSurvey] = useState({
    like: "",
    dislike: "",
    suggestions: "",
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  // Load entries from localStorage
  useEffect(() => {
    const storedEntries =
      JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(storedEntries);
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!newEntry.trim()) return;

    const timestamp = new Date().toLocaleString();

    if (editingIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editingIndex].text = newEntry;
      updatedEntries[editingIndex].timestamp = timestamp;
      setEntries(updatedEntries);
      setEditingIndex(null);
    } else {
      setEntries([{ text: newEntry, timestamp }, ...entries]);
    }

    setNewEntry("");
  };

  const handleDelete = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setNewEntry(entries[index].text);
    setEditingIndex(index);
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.text && entry.text.toLowerCase().includes(search.toLowerCase())
  );

  // Handle survey form submit
  const handleSurveySubmit = (e) => {
    e.preventDefault();
    console.log("Survey responses:", survey);
    setSurveySubmitted(true);
  };

  return (
    <div className="journal-container">
      <h1>My Journal</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search entries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="journal-search"
      />

      {/* Entry Textarea */}
      <textarea
        className="journal-textarea"
        placeholder="Write your thoughts..."
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
      />
      <button className="journal-save-btn" onClick={handleSave}>
        {editingIndex !== null ? "Update Entry" : "Save Entry"}
      </button>

      {/* Entries */}
      <div className="journal-entries">
        <h2>Previous Entries</h2>
        <ul>
          {filteredEntries.length === 0 ? (
            <li className="no-entries">No entries yet...</li>
          ) : (
            filteredEntries.map((entry, index) => (
              <li key={index}>
                <div className="entry-row">
                  <div>
                    <div className="entry-text">{entry.text}</div>
                    <div className="entry-date">{entry.timestamp}</div>
                  </div>
                  <div className="button-group">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Survey Section */}
      <div className="survey-container">
        <h2>User Feedback Survey</h2>
        {surveySubmitted ? (
          <p>🎉 Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSurveySubmit}>
            <label>
              1. What do you like about the app?
              <textarea
                value={survey.like}
                onChange={(e) => setSurvey({ ...survey, like: e.target.value })}
                required
              />
            </label>
            <br />

            <label>
              2. What don’t you like about the app?
              <textarea
                value={survey.dislike}
                onChange={(e) =>
                  setSurvey({ ...survey, dislike: e.target.value })
                }
                required
              />
            </label>
            <br />

            <label>
              3. What would make the app better for you?
              <textarea
                value={survey.suggestions}
                onChange={(e) =>
                  setSurvey({ ...survey, suggestions: e.target.value })
                }
                required
              />
            </label>
            <br />

            <button type="submit" className="journal-save-btn">
              Submit Survey
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Journal;
