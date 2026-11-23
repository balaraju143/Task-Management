import { Pencil, Trash2 } from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="task-card">
      <div className="task-card-content">
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        <div className="task-details">
          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <span>{task.category}</span>
          <span>Due: {task.dueDate || "No date"}</span>
        </div>
      </div>

      <div className="task-card-actions">
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          aria-label={`Change status for ${task.title}`}
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button onClick={() => onEdit(task)} aria-label="Edit task">
          <Pencil size={18} />
        </button>

        <button onClick={() => onDelete(task.id)} aria-label="Delete task">
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}

export default TaskCard;