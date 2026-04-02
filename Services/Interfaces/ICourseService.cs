using AcademyAPI.DTOs.Course;

namespace AcademyAPI.Services.Interfaces;

public interface ICourseService
{
    Task<IEnumerable<CourseResponseDto>> GetAllAsync();
    Task<CourseResponseDto?> GetByIdAsync(int id);
    Task<CourseResponseDto> CreateAsync(CreateCourseDto dto);
    Task<bool> UpdateAsync(int id, UpdateCourseDto dto);
    Task<bool> DeleteAsync(int id);
}
