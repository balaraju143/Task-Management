
import { useState } from "react";

import {
  Plus,
  ListTodo,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import sampleTasks from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  // Load and save tasks using the custom hook
  const [tasks, setTasks] = useLocalStorage(
    "focusboard-tasks",
    sampleTasks
  );

  // Search and filter states
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Navigation state
  const [activePage, setActivePage] = useState("dashboard");

  // Add or update task
  function handleSaveTask(task) {
    if (editingTask) {
      setTasks((previousTasks) =>
        previousTasks.map((item) =>
          item.id === task.id ? task : item
        )
      );
    } else {
      setTasks((previousTasks) => [
        ...previousTasks,
        task,
      ]);
    }

    setShowForm(false);
    setEditingTask(null);
  }

  // Open edit form
  function handleEditTask(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  // Delete task
  function handleDeleteTask(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    }
  }

  // Update task status
  function handleStatusChange(id, newStatus) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  }

  // Search and filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      activeStatus === "All" ||
      task.status === activeStatus;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  // Calculate dashboard statistics
  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // Open new task form
  function openNewTaskForm() {
    setEditingTask(null);
    setShowForm(true);
  }

  // Close task form
  function closeTaskForm() {
    setShowForm(false);
    setEditingTask(null);
  }

  return (
    <div className="app-container">

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <main className="main-content">

        {/* Header */}
        <Header />

        {/* Welcome Section */}
        <section className="welcome-section">
          <div>
            <h2>
              {activePage === "tasks"
                ? "My Tasks"
                : activePage === "settings"
                ? "Settings"
                : "Welcome to FocusBoard"}
            </h2>

            <p>
              Stay organized and achieve your daily goals.
            </p>
          </div>

          <button
            className="add-task-button"
            onClick={openNewTaskForm}
          >
            <Plus size={20} />
            Add New Task
          </button>
        </section>

        {/* Dashboard and Tasks */}
        {activePage !== "settings" && (
          <>
            {/* Statistics */}
            <section className="stats-grid">
              <StatCard
                title="Total Tasks"
                value={totalTasks}
                icon={<ListTodo size={22} />}
                description="All your tasks"
              />

              <StatCard
                title="In Progress"
                value={inProgressTasks}
                icon={<Clock size={22} />}
                description="Tasks being worked on"
              />

              <StatCard
                title="Completed"
                value={completedTasks}
                icon={<CheckCircle size={22} />}
                description="Successfully completed"
              />

              <StatCard
                title="Completion Rate"
                value={`${completionPercentage}%`}
                icon={<TrendingUp size={22} />}
                description="Overall progress"
              />
            </section>

            {/* Focus Notes */}
            <FocusNotes />

            {/* Tasks Section */}
            <section className="tasks-section">
              <div className="section-heading">
                <div>
                  <h2>My Tasks</h2>
                  <p>
                    Manage and track your daily activities.
                  </p>
                </div>
              </div>

              {/* Search */}
              <SearchBar
                search={search}
                onSearchChange={setSearch}
              />

              {/* Filters */}
              <FilterTabs
                activeStatus={activeStatus}
                onStatusChange={setActiveStatus}
                priorityFilter={priorityFilter}
                onPriorityChange={setPriorityFilter}
              />

              {/* Task List */}
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onStatusChange={handleStatusChange}
              />
            </section>
          </>
        )}

        {/* Settings Page */}
        {activePage === "settings" && (
          <section className="settings-section">
            <h2>Settings</h2>

            <p>
              Your tasks are saved automatically in this browser.
            </p>

            <p>
              You can manage your tasks from the dashboard.
            </p>
          </section>
        )}

      </main>

      {/* Add and Edit Task Form */}
      {showForm && (
        <TaskForm
          initialTask={editingTask}
          onSave={handleSaveTask}
          onCancel={closeTaskForm}
        />
      )}

    </div>
  );
}

export default App;
