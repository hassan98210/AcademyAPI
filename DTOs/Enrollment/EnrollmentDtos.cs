using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.DTOs.Enrollment;

public class CreateEnrollmentDto
{
    [Required]
    public int StudentId { get; set; }
    [Required]
    public int CourseId { get; set; }
}

public class UpdateGradeDto
{
    [Required]
    public string Grade { get; set; } = string.Empty;
}

public class EnrollmentResponseDto
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public int CourseId { get; set; }
    public string CourseTitle { get; set; } = string.Empty;
    public string? Grade { get; set; }
    public DateTime EnrolledAt { get; set; }
}
