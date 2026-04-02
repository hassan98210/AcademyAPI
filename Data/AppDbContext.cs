using AcademyAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AcademyAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Instructor> Instructors { get; set; }
    public DbSet<InstructorProfile> InstructorProfiles { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Enrollment> Enrollments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // One-to-One: Instructor <-> InstructorProfile
        modelBuilder.Entity<Instructor>()
            .HasOne(i => i.Profile)
            .WithOne(p => p.Instructor)
            .HasForeignKey<InstructorProfile>(p => p.InstructorId)
            .OnDelete(DeleteBehavior.Cascade);

        // One-to-Many: Instructor -> Courses
        modelBuilder.Entity<Instructor>()
            .HasMany(i => i.Courses)
            .WithOne(c => c.Instructor)
            .HasForeignKey(c => c.InstructorId);

        // Many-to-Many via Enrollment join table
        modelBuilder.Entity<Enrollment>()
            .HasKey(e => e.Id);
            
        modelBuilder.Entity<Enrollment>()
            .HasOne(e => e.Student)
            .WithMany(s => s.Enrollments)
            .HasForeignKey(e => e.StudentId);

        modelBuilder.Entity<Enrollment>()
            .HasOne(e => e.Course)
            .WithMany(c => c.Enrollments)
            .HasForeignKey(e => e.CourseId);
    }
}
