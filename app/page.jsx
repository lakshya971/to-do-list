'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import AnalogClock from '../components/AnalogClock';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Page() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project presentation",
      description: "Prepare slides for quarterly review",
      priority: "high",
      category: "work",
      dueDate: "2025-06-12T10:00",
      completed: false,
      createdAt: "2025-06-11T09:00:00.000Z"
    },
    {
      id: 2,
      title: "Buy groceries",
      description: "Milk, bread, eggs, vegetables",
      priority: "medium",
      category: "personal",
      dueDate: "2025-06-11T18:00",
      completed: false,
      createdAt: "2025-06-11T08:00:00.000Z"
    },
    {
      id: 3,
      title: "Exercise routine",
      description: "30 minutes cardio + strength training",
      priority: "medium",
      category: "health",
      dueDate: "",
      completed: true,
      createdAt: "2025-06-11T07:00:00.000Z"
    }
  ]);

  const addTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (taskId, updatedData) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, ...updatedData }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Task Management */}
          <div className="lg:col-span-2 space-y-8">
            <TaskForm onAddTask={addTask} />
            <TaskList 
              tasks={tasks}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onToggleTask={toggleTask}
            />
          </div>

          {/* Right Column - Calendar and Clock */}
          <div className="space-y-8">
            <Calendar tasks={tasks} />
            <AnalogClock />
          </div>
        </div>
      </main>
    </div>
  );
}