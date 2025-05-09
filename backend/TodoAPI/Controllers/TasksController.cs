using Microsoft.AspNetCore.Mvc;
using TodoAPI.Data;
using TodoAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Services;

namespace TodoAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TodoDbContext _context;
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService, TodoDbContext context)
        {
            _taskService = taskService;
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskModel>>> GetTasks([FromQuery] string? filter)
        {
            return await _taskService.GetTasks(filter);
           
        }

        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<TaskModel>> PostTask(TaskModel task)
        {
            var addTask = await _taskService.AddTask(task);
            return CreatedAtAction(nameof(GetTask), new { id = addTask.Id }, addTask);
        }

        // PUT: api/Tasks/{id}/toggle
        [HttpPut("{id}/toggle")]
        public async Task<ActionResult<TaskModel>> ToggleTask(int id, [FromQuery] string? toggle)
        {
            var task = await _taskService.ToggleTask(id, toggle);
            if (task == null)
            {
                return NotFound();
            }
            return task;
        }


            [HttpPut("{id}")]
        public async Task<ActionResult<TaskModel>> UpdateTask(int id, TaskModel updateTask)
        {
            var task = await _taskService.UpdateTask(id, updateTask);
            if (task == null)
            {
                return NotFound();
            }
            return task;
        }

        // DELETE: api/Tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _taskService.DeleteTask(id);
            if (!task)
            {
                return NotFound();
            }

            return NoContent();
        }

        // GET: api/Tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskModel>> GetTask(int id)
        {
            var task = await _taskService.GetTask(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }
    }
}