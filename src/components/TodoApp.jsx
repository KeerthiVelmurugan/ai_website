import React, { useState } from "react";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] px-4">
      <div className="w-full max-w-md bg-[#121225] border border-purple-900/40 rounded-2xl p-6 shadow-xl">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          To-Do List
        </h1>
        <p className="text-gray-400 text-center text-sm mb-6">
          Manage your daily tasks efficiently
        </p>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-3 rounded-xl bg-[#1a1a2e] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={addTask}
            className="px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Add
          </button>
        </div>

        {/* Actions */}
        {todos.length > 0 && (
          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-400">
              {todos.length} Tasks
            </span>
            <button
              onClick={clearAll}
              className="text-red-400 hover:text-red-500 transition"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500 text-sm mt-6">
              No tasks yet 🚀
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between bg-[#1a1a2e] border border-purple-900/20 rounded-xl px-4 py-3 hover:bg-[#22223b] transition"
              >
                {/* Left */}
                <div
                  onClick={() => toggleTask(todo.id)}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      todo.completed
                        ? "bg-purple-600 border-purple-600"
                        : "border-gray-500"
                    }`}
                  >
                    {todo.completed && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>

                  <p
                    className={`text-sm ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-white"
                    }`}
                  >
                    {todo.text}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(todo.id)}
                  className="text-gray-500 hover:text-red-400 transition text-sm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;