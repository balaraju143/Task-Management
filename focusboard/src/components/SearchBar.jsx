import { Search } from "lucide-react";

function SearchBar({ search, onSearchChange }) {
  return (
    <div className="search-bar">
      <Search size={20} />

      <input
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        aria-label="Search tasks by title"
      />
    </div>
  );
}

export default SearchBar;