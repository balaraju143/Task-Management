import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const notes = [
  {
    title: "Stay focused",
    description: "Small steps every day lead to big results.",
  },
  {
    title: "Plan your day",
    description: "Organize your tasks and complete them one by one.",
  },
  {
    title: "Take a break",
    description: "Short breaks help you stay productive.",
  },
];

function FocusNotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function previousNote() {
    setCurrentIndex((currentIndex - 1 + notes.length) % notes.length);
  }

  function nextNote() {
    setCurrentIndex((currentIndex + 1) % notes.length);
  }

  return (
    <section className="focus-notes">
      <div className="focus-notes-heading">
        <h2>Focus Notes</h2>

        <div>
          <button onClick={previousNote} aria-label="Previous note">
            <ChevronLeft size={20} />
          </button>

          <button onClick={nextNote} aria-label="Next note">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="note-content">
        <h3>{notes[currentIndex].title}</h3>
        <p>{notes[currentIndex].description}</p>
      </div>

      <div className="note-indicators">
        {notes.map((note, index) => (
          <button
            key={note.title}
            className={currentIndex === index ? "selected" : ""}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Show note ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default FocusNotes;