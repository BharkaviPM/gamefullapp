import React, { useState } from 'react';

export default function Quest() {
  const [quests, setQuests] = useState([
    { id: 1, text: "Make a Pro/Con list", completed: true },
    { id: 2, text: "Try something new", completed: true },
    { id: 3, text: "Read for 15 minutes", completed: false },
  ]);

  const toggleQuest = (id) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  };

  return (
    <div className="page">
      <h2>Quests</h2>
      <ul>
        {quests.map((quest) => (
          <li key={quest.id} onClick={() => toggleQuest(quest.id)}>
            <input type="checkbox" checked={quest.completed} readOnly />
            {quest.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
