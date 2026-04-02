using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademyAPI.Models;

public class Course
{
    public int Id { get; set; }
    [Required, MaxLength(100)]
    public string Title { get; set; } = string.Empty;
    [MaxLength(500)]
    public string? Description { get; set; }
    [Range(1, 6)]
    public int Credits { get; set; }

    [ForeignKey("Instructor")]
    public int InstructorId { get; set; }
    public Instructor? Instructor { get; set; }

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
