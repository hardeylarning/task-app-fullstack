import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (filter) => {
    try {
      const response = await fetch(`http://localhost:5031/api/v1/Tasks?filter=${filter}`, {

      });
      const data = await response.json();
      setTasks(data);
      setFilteredTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (newTask) => {
    try {
      const response = await fetch('http://localhost:5031/api/v1/Tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setFilteredTasks([...filteredTasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5031/api/v1/Tasks/${updatedTask.id}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });
      const data = await response.json();
      setTasks(tasks.map(task => (task.id === updatedTask.id ? data : task)));
      setFilteredTasks(filteredTasks.map(task => (task.id === updatedTask.id ? data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };


  const updateStatus = async (updatedTask) => {
    try {
      const response = await fetch(`http://localhost:5031/api/v1/Tasks/${updatedTask.id}/toggle?toggle=active`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });
      const data = await response.json();
      setTasks(tasks.map(task => (task.id === updatedTask.id ? data : task)));
      setFilteredTasks(filteredTasks.map(task => (task.id === updatedTask.id ? data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5031/api/v1/Tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }

      });
      setTasks(tasks.filter(task => task.id !== taskId));
      setFilteredTasks(filteredTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Task App</h1>
        <TaskForm onAddTask={addTask} />
        <hr />
        <h2 className="text-2xl font-bold mb-4 mt-4">Tasks Section</h2>
        <FilterBar onFilter={fetchTasks} />
        <TaskList tasks={filteredTasks} onUpdateTask={updateTask} onUpdateStatus={updateStatus} onDeleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default App;
