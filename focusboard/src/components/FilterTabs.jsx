const tabs = ["All", "To do", "In progress", "Completed"];

function FilterTabs({
  activeStatus,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}) {
  return (
    <div className="filter-section">
      <div className="filter-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activeStatus === tab ? "active" : ""}
            onClick={() => onStatusChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <select
        value={priorityFilter}
        onChange={(event) => onPriorityChange(event.target.value)}
        aria-label="Filter tasks by priority"
      >
        <option value="All">All Priorities</option>
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
    </div>
  );
}

export default FilterTabs;