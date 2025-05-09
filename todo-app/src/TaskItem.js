import React from 'react';

const TaskItem = ({ task, onUpdateTask, onUpdateStatus, onDeleteTask }) => {
  const handleComplete = () => {
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    onUpdateTask(updatedTask);
  };

  const handleStatus = () => {
    const updatedStatus = { ...task, isActive: !task.isActive };
    onUpdateStatus(updatedStatus);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <li className="py-4 flex flex-col">
      <div className='flex items-center justify-between'>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.isActive}
          onChange={handleStatus}
          className="mr-2"
        />
        <span className={`text-lg font-bold ${task.isCompleted ? 'line-through text-gray-500' : 'text-black'}`}>
          {task.title}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={handleComplete} className="text-white bg-green-500 py-2 px-4 rounded-md hover:text-grey-600">
          {task.isCompleted ? 'Incomplete' : 'Complete'}
        </button>
        <button onClick={handleDelete} className="text-red-500 py-2 px-4 hover:text-red-600">Delete</button>
      </div>
      </div>

      <div className='w-full my-3 block p-3'>
        <p> {task.description}</p>
      </div>

    </li>
  );
};

export default TaskItem;