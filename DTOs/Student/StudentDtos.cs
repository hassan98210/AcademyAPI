using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.DTOs.Student;

public class CreateStudentDto
{
    [Required, MaxLength(100)]
    public string FullName { get; set; } = string.Empty;
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required, MinLength(6)]
    public string Password { get; set; } = string.Empty;
}

public class RegistrationResponseDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public class StudentResponseDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public List<EnrollmentInStudentDto> Enrollments { get; set; } = new();
}

public class EnrollmentInStudentDto
{
    public int Id { get; set; }
    public int CourseId { get; set; }
    public string CourseTitle { get; set; } = string.Empty;
    public string? Grade { get; set; }
    public DateTime EnrolledAt { get; set; }
}
