using AcademyAPI.Data;
using AcademyAPI.Models;
using AcademyAPI.DTOs.Student;
using AcademyAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace AcademyAPI.Services;

public class StudentService : IStudentService
{
    private readonly AppDbContext _context;

    public StudentService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<StudentResponseDto>> GetAllAsync()
    {
        return await _context.Students
            .AsNoTracking()
            .Select(s => new StudentResponseDto
            {
                Id = s.Id,
                FullName = s.FullName,
                Email = s.Email,
                Role = s.Role
            })
            .ToListAsync();
    }

    public async Task<StudentResponseDto?> GetByIdAsync(int id)
    {
        var student = await _context.Students
            .AsNoTracking()
            .Include(s => s.Enrollments)
            .ThenInclude(e => e.Course)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (student == null) return null;

        return new StudentResponseDto
        {
            Id = student.Id,
            FullName = student.FullName,
            Email = student.Email,
            Role = student.Role,
            Enrollments = student.Enrollments.Select(e => new EnrollmentInStudentDto
            {
                Id = e.Id,
                CourseId = e.CourseId,
                CourseTitle = e.Course?.Title ?? "Unknown",
                Grade = e.Grade,
                EnrolledAt = e.EnrolledAt
            }).ToList()
        };
    }

    public async Task<RegistrationResponseDto> RegisterAsync(CreateStudentDto dto)
    {
        var student = new Student
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return new RegistrationResponseDto
        {
            Id = student.Id,
            FullName = student.FullName,
            Email = student.Email,
            Role = student.Role
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student == null) return false;

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
        return true;
    }
}
