using AcademyAPI.Data;
using AcademyAPI.Models;
using AcademyAPI.DTOs.Enrollment;
using AcademyAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AcademyAPI.Services;

public class EnrollmentService : IEnrollmentService
{
    private readonly AppDbContext _context;

    public EnrollmentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EnrollmentResponseDto>> GetAllAsync()
    {
        return await _context.Enrollments
            .AsNoTracking()
            .Include(e => e.Student)
            .Include(e => e.Course)
            .Select(e => new EnrollmentResponseDto
            {
                Id = e.Id,
                StudentId = e.StudentId,
                StudentName = e.Student!.FullName,
                CourseId = e.CourseId,
                CourseTitle = e.Course!.Title,
                Grade = e.Grade,
                EnrolledAt = e.EnrolledAt
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<EnrollmentResponseDto>> GetByStudentIdAsync(int studentId)
    {
        return await _context.Enrollments
            .AsNoTracking()
            .Include(e => e.Student)
            .Include(e => e.Course)
            .Where(e => e.StudentId == studentId)
            .Select(e => new EnrollmentResponseDto
            {
                Id = e.Id,
                StudentId = e.StudentId,
                StudentName = e.Student!.FullName,
                CourseId = e.CourseId,
                CourseTitle = e.Course!.Title,
                Grade = e.Grade,
                EnrolledAt = e.EnrolledAt
            })
            .ToListAsync();
    }

    public async Task<EnrollmentResponseDto> CreateAsync(CreateEnrollmentDto dto)
    {
        var enrollment = new Enrollment
        {
            StudentId = dto.StudentId,
            CourseId = dto.CourseId,
            EnrolledAt = DateTime.UtcNow
        };

        _context.Enrollments.Add(enrollment);
        await _context.SaveChangesAsync();

        var student = await _context.Students.FindAsync(dto.StudentId);
        var course = await _context.Courses.FindAsync(dto.CourseId);

        return new EnrollmentResponseDto
        {
            Id = enrollment.Id,
            StudentId = enrollment.StudentId,
            StudentName = student?.FullName ?? "Unknown",
            CourseId = enrollment.CourseId,
            CourseTitle = course?.Title ?? "Unknown",
            Grade = enrollment.Grade,
            EnrolledAt = enrollment.EnrolledAt
        };
    }

    public async Task<bool> UpdateGradeAsync(int id, string grade)
    {
        var enrollment = await _context.Enrollments.FindAsync(id);
        if (enrollment == null) return false;

        enrollment.Grade = grade;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var enrollment = await _context.Enrollments.FindAsync(id);
        if (enrollment == null) return false;

        _context.Enrollments.Remove(enrollment);
        await _context.SaveChangesAsync();
        return true;
    }
}
