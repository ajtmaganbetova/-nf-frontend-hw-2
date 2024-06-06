'use client'
import Image from 'next/image';
import { useState } from "react";

export default function Home() {
  // Rewrite using states
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');

  // Implement add task logic
  const handleAddTask = () => {
    if (newTaskText.trim() === '') return; // Prevent adding empty tasks
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText(''); // Clear the input field after adding a task
  };

  const handleToggleTask = (newId) => {
    // Implement toggle completed/uncompleted task logic
    setTasks(tasks.map(task =>
      task.id === newId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (newId) => {
    // Implement delete task logic
    const newTasks = tasks.filter(task => task.id !== newId);
    setTasks(newTasks);
  };

  // Function to clear completed tasks using deleteTask
  const clearCompletedTasks = () => {
    const newTasks = tasks.filter(task => !task.completed);
    setTasks(newTasks);
  };

  // calculate the number of uncompleted items
  const uncompletedItems = tasks.filter(task => !task.completed).length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>

      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="What to do ?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <ul>
          {tasks
            .filter(task => filter === 'all' || (filter === 'completed' && task.completed) || (filter === 'active' && !task.completed))
            .map(task => (
              <li key={task.id} className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
                <div className="flex items-center">
                  <button
                    className="w-6 h-6 my-auto mr-6"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    <Image
                      src={task.completed ? "/images/circle-checked.svg" : "/images/circle.svg"}
                      alt="Task status"
                      width={30}
                      height={30}
                    />
                  </button>
                  <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {task.text}
                  </span>
                </div>
                <button onClick={() => handleDeleteTask(task.id)} className="text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
        </ul>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {uncompletedItems} uncompleted items left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => setFilter('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => setFilter('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={clearCompletedTasks}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
