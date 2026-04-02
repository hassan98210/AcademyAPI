using System.ComponentModel.DataAnnotations.Schema;

namespace AcademyAPI.Models;

public class Enrollment
{
    public int Id { get; set; }
    [ForeignKey("Student")]
    public int StudentId { get; set; }
    public Student? Student { get; set; }

    [ForeignKey("Course")]
    public int CourseId { get; set; }
    public Course? Course { get; set; }

    public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;
    public string? Grade { get; set; }
}
