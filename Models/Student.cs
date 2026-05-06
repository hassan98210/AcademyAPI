using System.ComponentModel.DataAnnotations;

namespace AcademyAPI.Models;

public class Student
{
    public int Id { get; set; }
    [Required, MaxLength(100)]
    public string FullName { get; set; } = string.Empty;
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Student";
    public string? PhotoUrl { get; set; } // Base64 encoded photo data URI

    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}
