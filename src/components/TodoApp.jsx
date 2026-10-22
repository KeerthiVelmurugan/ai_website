
import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "advanced-todo-tasks";

const emptyForm = {
  text: "",
  priority: "Medium",
  category: "Personal",
  dueDate: "",
};

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = "To-Do Manager";
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const today = new Date().toLocaleDateString("en-CA");

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;
  const progress = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0;

  const overdueCount = todos.filter(
    (todo) => !todo.completed && todo.dueDate && todo.dueDate < today
  ).length;

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveTask = (e) => {
    e.preventDefault();

    const text = form.text.trim();
    if (!text) return;

    if (editingId !== null) {
      setTodos((previous) =>
        previous.map((todo) =>
          todo.id === editingId ? { ...todo, ...form, text } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo = {
        id: `${Date.now()}-${Math.random()}`,
        ...form,
        text,
        completed: false,
        createdAt: Date.now(),
      };

      setTodos((previous) => [newTodo, ...previous]);
    }

    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (todo) => {
    setForm({
      text: todo.text,
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate || "",
    });
    setEditingId(todo.id);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  };

  const toggleTask = (id) => {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));

    if (editingId === id) cancelEdit();
  };

  const clearCompleted = () => {
    setTodos((previous) => previous.filter((todo) => !todo.completed));
  };

  const clearAll = () => {
    if (todos.length === 0) return;

    if (window.confirm("Delete all tasks permanently?")) {
      setTodos([]);
      cancelEdit();
    }
  };

  const filteredTodos = useMemo(() => {
    let result = todos.filter((todo) => {
      const matchesSearch = todo.text
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || todo.category === categoryFilter;

      let matchesFilter = true;

      if (filter === "Active") matchesFilter = !todo.completed;
      if (filter === "Completed") matchesFilter = todo.completed;
      if (filter === "Overdue") {
        matchesFilter =
          !todo.completed && todo.dueDate && todo.dueDate < today;
      }

      return matchesSearch && matchesCategory && matchesFilter;
    });

    const priorityRank = { High: 0, Medium: 1, Low: 2 };

    result.sort((a, b) => {
      if (sortBy === "priority") {
        return priorityRank[a.priority] - priorityRank[b.priority];
      }

      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      }

      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    return result;
  }, [todos, search, filter, categoryFilter, sortBy, today]);

  const priorityStyle = {
    High: "bg-red-500/10 text-red-400 border-red-500/30",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#15152b] to-[#1a1a2e] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
              Your productivity space
            </p>
            <h1 className="text-3xl font-bold sm:text-4xl">
              My Tasks <span className="text-purple-400">✦</span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Organize your day. Focus on what matters.
            </p>
          </div>

          <button
            onClick={() => {
              if (showForm) {
                cancelEdit();
              } else {
                setForm(emptyForm);
                setEditingId(null);
                setShowForm(true);
              }
            }}
            className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 font-semibold shadow-lg shadow-purple-900/30 transition hover:opacity-90"
          >
            {showForm ? "✕ Close Form" : "+ New Task"}
          </button>
        </header>

        {/* Dashboard */}
        <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Total Tasks",
              value: todos.length,
              icon: "📋",
              color: "text-indigo-400",
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: "⏳",
              color: "text-amber-400",
            },
            {
              label: "Completed",
              value: completedCount,
              icon: "✓",
              color: "text-emerald-400",
            },
            {
              label: "Overdue",
              value: overdueCount,
              icon: "⚠",
              color: "text-red-400",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-purple-900/30 bg-[#17172b] p-5 shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">{stat.label}</span>
                <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Progress */}
        <section className="mb-6 rounded-2xl border border-purple-900/30 bg-[#17172b] p-5">
          <div className="mb-3 flex justify-between gap-4">
            <div>
              <h2 className="font-semibold">Your progress</h2>
              <p className="mt-1 text-sm text-gray-400">
                Keep going, one task at a time.
              </p>
            </div>
            <span className="text-xl font-bold text-purple-400">
              {progress}%
            </span>
          </div>

          <div
            className="h-3 overflow-hidden rounded-full bg-gray-800"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Task completion progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Add / Edit form */}
        {showForm && (
          <form
            onSubmit={saveTask}
            className="mb-6 rounded-2xl border border-purple-500/30 bg-[#17172b] p-5 sm:p-6"
          >
            <h2 className="mb-5 text-xl font-bold">
              {editingId !== null ? "Edit Task" : "Create a New Task"}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="task-text"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Task description *
                </label>
                <input
                  id="task-text"
                  name="text"
                  value={form.text}
                  onChange={updateForm}
                  placeholder="What do you need to accomplish?"
                  maxLength={300}
                  required
                  autoFocus
                  className="w-full rounded-xl border border-gray-700 bg-[#101020] p-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={form.priority}
                  onChange={updateForm}
                  className="w-full rounded-xl border border-gray-700 bg-[#101020] p-3 outline-none focus:border-purple-500"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={updateForm}
                  className="w-full rounded-xl border border-gray-700 bg-[#101020] p-3 outline-none focus:border-purple-500"
                >
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Study</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="dueDate"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Due date
                </label>
                <input
                  id="dueDate"
                  type="date"
                  name="dueDate"
                  value={form.dueDate}
                  min={today}
                  onChange={updateForm}
                  className="w-full rounded-xl border border-gray-700 bg-[#101020] p-3 outline-none focus:border-purple-500 sm:max-w-sm"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 font-semibold transition hover:opacity-90"
              >
                {editingId !== null ? "Save Changes" : "Add Task"}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-xl border border-gray-700 px-5 py-3 text-gray-300 transition hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Search and filters */}
        <section className="mb-6 rounded-2xl border border-purple-900/30 bg-[#17172b] p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="⌕ Search your tasks..."
              aria-label="Search tasks"
              className="w-full rounded-xl border border-gray-700 bg-[#101020] p-3 outline-none focus:border-purple-500"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort tasks"
              className="w-full rounded-xl border border-gray-700 bg-[#101020] p-3 outline-none focus:border-purple-500"
            >
              <option value="newest">Sort: Newest first</option>
              <option value="priority">Sort: Highest priority</option>
              <option value="dueDate">Sort: Due date</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["All", "Active", "Completed", "Overdue"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? "bg-purple-600 text-white"
                    : "bg-[#101020] text-gray-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label
              htmlFor="category-filter"
              className="mb-2 block text-sm text-gray-400"
            >
              Filter by category
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-[#101020] p-3 outline-none focus:border-purple-500 sm:max-w-xs"
            >
              <option>All</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
              <option>Other</option>
            </select>
          </div>
        </section>

        {/* Task list */}
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Task List</h2>
              <p className="mt-1 text-sm text-gray-400">
                Showing {filteredTodos.length} of {todos.length} tasks
              </p>
            </div>

            {todos.length > 0 && (
              <div className="flex flex-wrap gap-3 text-sm">
                {completedCount > 0 && (
                  <button
                    onClick={clearCompleted}
                    className="text-amber-400 transition hover:text-amber-300"
                  >
                    Clear completed
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="text-red-400 transition hover:text-red-300"
                >
                  Delete all
                </button>
              </div>
            )}
          </div>

          {filteredTodos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-700 bg-[#17172b]/70 px-4 py-14 text-center">
              <div className="mb-4 text-5xl">
                {todos.length === 0 ? "📝" : "🔍"}
              </div>
              <h3 className="text-lg font-semibold">
                {todos.length === 0 ? "Your list is empty" : "No tasks found"}
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                {todos.length === 0
                  ? "Create your first task and get started."
                  : "Try changing your search or filters."}
              </p>
              {todos.length === 0 && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-5 rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500"
                >
                  + Create your first task
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTodos.map((todo) => {
                const isOverdue =
                  !todo.completed && todo.dueDate && todo.dueDate < today;

                return (
                  <article
                    key={todo.id}
                    className={`rounded-2xl border bg-[#17172b] p-4 transition hover:border-purple-700/60 sm:p-5 ${
                      todo.completed
                        ? "border-gray-800 opacity-75"
                        : "border-purple-900/30"
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <button
                        onClick={() => toggleTask(todo.id)}
                        aria-label={
                          todo.completed
                            ? `Mark ${todo.text} as active`
                            : `Complete ${todo.text}`
                        }
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          todo.completed
                            ? "border-purple-500 bg-purple-600 text-white"
                            : "border-gray-600 hover:border-purple-400"
                        }`}
                      >
                        {todo.completed && "✓"}
                      </button>

                      <div className="min-w-0 flex-1">
                        <h3
                          className={`break-words font-semibold ${
                            todo.completed
                              ? "text-gray-500 line-through"
                              : "text-gray-100"
                          }`}
                        >
                          {todo.text}
                        </h3>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span
                            className={`rounded-lg border px-2.5 py-1 text-xs ${
                              priorityStyle[todo.priority] ||
                              priorityStyle.Medium
                            }`}
                          >
                            {todo.priority} priority
                          </span>

                          <span className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300">
                            {todo.category}
                          </span>

                          {todo.dueDate && (
                            <span
                              className={`rounded-lg border px-2.5 py-1 text-xs ${
                                isOverdue
                                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                                  : "border-gray-700 bg-gray-800/70 text-gray-300"
                              }`}
                            >
                              {isOverdue ? "Overdue · " : "Due · "}
                              {todo.dueDate}
                            </span>
                          )}

                          {todo.completed && (
                            <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          onClick={() => startEdit(todo)}
                          aria-label={`Edit ${todo.text}`}
                          title="Edit task"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-purple-500/10 hover:text-purple-400"
                        >
                          ✎
                        </button>

                        <button
                          onClick={() => deleteTask(todo.id)}
                          aria-label={`Delete ${todo.text}`}
                          title="Delete task"
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-purple-900/30 py-5 text-center text-sm text-gray-500">
          Made for better days ✦ Your tasks are saved in this browser.
        </footer>
      </div>
    </div>
  );
}

export default TodoApp;
