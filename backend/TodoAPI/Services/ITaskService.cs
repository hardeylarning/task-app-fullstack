using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using TodoAPI.Models;

namespace TodoAPI.Services
{
    public interface ITaskService
    {
        Task<List<TaskModel>> GetTasks(string? filter);
        Task<TaskModel> GetTask(int id);

        Task<TaskModel> ToggleTask(int id, string? toggle);
        Task<TaskModel> AddTask(TaskModel task);
        Task<TaskModel> UpdateTask(int taskId, TaskModel task);

        Task<bool> DeleteTask(int id);
    }
}