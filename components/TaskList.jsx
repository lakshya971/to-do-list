'use client';

import { useState, useEffect } from 'react';

export default function TaskList({ tasks = [], onUpdateTask, onDeleteTask, onToggleTask }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    switch (filter) {
      case 'active':
        filtered = filtered.filter(task => !task.completed);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      default:
        break;
    }

    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        filtered = filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        break;
      case 'dueDate':
        filtered = filtered.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
        break;
      default:
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return filtered;
  };

  const TaskItem = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
      title: task.title,
      description: task.description || ''
    });

    const priorityColors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    const categoryIcons = {
      personal: '🏠',
      work: '💼',
      shopping: '🛒',
      health: '❤️',
      finance: '💰'
    };    const formatDueDate = (dueDate) => {
      if (!dueDate || !mounted) return null;
      const date = new Date(dueDate);
      const now = new Date();
      const isOverdue = date < now && !task.completed;
      const isToday = date.toDateString() === now.toDateString();
      
      return {
        formatted: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        isOverdue,
        isToday
      };
    };

    const dueInfo = formatDueDate(task.dueDate);

    const handleSaveEdit = () => {
      if (onUpdateTask) {
        onUpdateTask(task.id, editData);
      }
      setIsEditing(false);
    };

    return (
      <div className={`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
        task.completed ? 'opacity-60' : ''
      }`}>
        <div className="flex items-start space-x-3">
          <button
            onClick={() => onToggleTask && onToggleTask(task.id)}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              task.completed 
                ? 'bg-green-500 border-green-500 text-white' 
                : 'border-gray-300 hover:border-green-400'
            }`}
          >
            {task.completed && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  rows={2}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <span className="text-lg">{categoryIcons[task.category]}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
                
                {task.description && (
                  <p className={`text-sm mb-2 ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                    {task.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {dueInfo && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dueInfo.isOverdue 
                          ? 'bg-red-100 text-red-800' 
                          : dueInfo.isToday 
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-600'
                      }`}>
                        {dueInfo.isOverdue && '⚠️ '}
                        {dueInfo.isToday && '📅 '}
                        {dueInfo.formatted}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDeleteTask && onDeleteTask(task.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          My Tasks ({filteredTasks.length})
        </h3>
        
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="created">Recent</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-gray-500 font-medium mb-1">No tasks found</h4>
            <p className="text-gray-400 text-sm">
              {filter === 'all' 
                ? 'Add your first task to get started' 
                : `No ${filter} tasks at the moment`
              }
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>

      {tasks.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              {tasks.filter(t => t.completed).length} of {tasks.length} completed
            </span>            <span>
              {mounted ? tasks.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()).length : 0} overdue
            </span>
          </div>
          
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}