namespace TodoAPI.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? Date  { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsActive { get; set; }
    }
}