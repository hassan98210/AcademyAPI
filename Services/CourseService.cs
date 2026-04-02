using AcademyAPI.Data;
using AcademyAPI.Models;
using AcademyAPI.DTOs.Course;
using AcademyAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AcademyAPI.Services;

public class CourseService : ICourseService
{
    private readonly AppDbContext _context;

    public CourseService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CourseResponseDto>> GetAllAsync()
    {
        return await _context.Courses
            .AsNoTracking()
            .Include(c => c.Instructor)
            .Select(c => new CourseResponseDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Credits = c.Credits,
                InstructorId = c.InstructorId,
                InstructorName = c.Instructor!.FullName
            })
            .ToListAsync();
    }

    public async Task<CourseResponseDto?> GetByIdAsync(int id)
    {
        return await _context.Courses
            .AsNoTracking()
            .Include(c => c.Instructor)
            .Where(c => c.Id == id)
            .Select(c => new CourseResponseDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                Credits = c.Credits,
                InstructorId = c.InstructorId,
                InstructorName = c.Instructor.FullName
            })
            .FirstOrDefaultAsync();
    }

    public async Task<CourseResponseDto> CreateAsync(CreateCourseDto dto)
    {
        var course = new Course
        {
            Title = dto.Title,
            Description = dto.Description,
            Credits = dto.Credits,
            InstructorId = dto.InstructorId
        };

        _context.Courses.Add(course);
        await _context.SaveChangesAsync();

        var instructor = await _context.Instructors.FindAsync(dto.InstructorId);

        return new CourseResponseDto
        {
            Id = course.Id,
            Title = course.Title,
            Description = course.Description,
            Credits = course.Credits,
            InstructorId = course.InstructorId,
            InstructorName = instructor?.FullName ?? "Unknown"
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateCourseDto dto)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null) return false;

        if (dto.Title != null) course.Title = dto.Title;
        if (dto.Description != null) course.Description = dto.Description;
        if (dto.Credits.HasValue) course.Credits = dto.Credits.Value;
        if (dto.InstructorId.HasValue) course.InstructorId = dto.InstructorId.Value;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var course = await _context.Courses.FindAsync(id);
        if (course == null) return false;

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();
        return true;
    }
}
