using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Data;
using TodoAPI.Models;

namespace TodoAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly TodoDbContext _context;

        public TaskService(TodoDbContext context)
        {
            _context = context;
        }
        public async Task<TaskModel> AddTask(TaskModel task)
        {
            task.Date = string.IsNullOrEmpty(task.Date) ? DateTime.Now.ToString("yyyy-MM-dd") : task.Date;
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> DeleteTask(int id)
        {
             var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return false;
            }
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<TaskModel> GetTask(int id)
        {
            return await _context.Tasks.FindAsync(id);

        }

        public async Task<List<TaskModel>> GetTasks(string? filter)
        {
            if (string.IsNullOrEmpty(filter))
        {
             return await _context.Tasks.ToListAsync();
        }
        var tasks = _context.Tasks.AsQueryable();
        if(filter.Equals("active"))
            tasks = tasks.Where(task => task.IsActive);

        else
            tasks = tasks.Where(task => task.IsCompleted);

        return await tasks.ToListAsync();
        }

        public async Task<TaskModel> ToggleTask(int id, string? toggle)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task != null)
            {
                if (!string.IsNullOrEmpty(toggle) && toggle.Equals("active"))
                task.IsActive = !task.IsActive;
                else
                task.IsCompleted = !task.IsCompleted;
            
                await _context.SaveChangesAsync();
                return task;
            }
            return task;
        }

        public async Task<TaskModel> UpdateTask(int taskId, TaskModel updateTask)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task != null)
            {
                task.Description = updateTask.Description ?? task.Description; 
                task.Title = updateTask.Title ?? task.Title; 
                await _context.SaveChangesAsync();
                return task;
            }
            return task;
        }
    }
}