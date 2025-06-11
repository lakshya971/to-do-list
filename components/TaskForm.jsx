'use client';

import { useState } from 'react';

export default function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    category: 'personal'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      const newTask = {
        id: Date.now(),
        ...formData,
        completed: false,
        createdAt: new Date().toISOString()
      };
      
      if (onAddTask) {
        onAddTask(newTask);
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        category: 'personal'
      });
      setIsExpanded(false);
    }
  };

  const quickActions = [
    { icon: '💼', label: 'Work Task', category: 'work' },
    { icon: '🏠', label: 'Personal', category: 'personal' },
    { icon: '🛒', label: 'Shopping', category: 'shopping' },
    { icon: '❤️', label: 'Health', category: 'health' }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h3>
      
      {!isExpanded ? (
        <div className="space-y-4">
          {/* Quick Add Input */}
          <div className="relative">
            <input
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              onFocus={() => setIsExpanded(true)}
              name="title"
              placeholder="What needs to be done?"
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
              onClick={() => setIsExpanded(true)}
            >
              <span className="text-lg">+</span>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.category}
                onClick={() => {
                  setFormData(prev => ({ ...prev, category: action.category }));
                  setIsExpanded(true);
                }}
                className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{action.icon}</span>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Task title..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              required
              autoFocus
            />
          </div>

          {/* Description */}
          <div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Add description (optional)..."
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
            />
          </div>

          {/* Priority and Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              >
                <option value="personal">🏠 Personal</option>
                <option value="work">💼 Work</option>
                <option value="shopping">🛒 Shopping</option>
                <option value="health">❤️ Health</option>
                <option value="finance">💰 Finance</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date (optional)
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setFormData(prev => ({ ...prev, title: '', description: '' }));
              }}
              className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}