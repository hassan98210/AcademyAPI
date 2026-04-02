using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AcademyAPI.Models;

public class InstructorProfile
{
    public int Id { get; set; }
    [MaxLength(500)]
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public string? LinkedInUrl { get; set; }

    [ForeignKey("Instructor")]
    public int InstructorId { get; set; }
    public Instructor? Instructor { get; set; }
}
