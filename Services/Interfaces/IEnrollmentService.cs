using AcademyAPI.DTOs.Enrollment;

namespace AcademyAPI.Services.Interfaces;

public interface IEnrollmentService
{
    Task<IEnumerable<EnrollmentResponseDto>> GetAllAsync();
    Task<IEnumerable<EnrollmentResponseDto>> GetByStudentIdAsync(int studentId);
    Task<EnrollmentResponseDto> CreateAsync(CreateEnrollmentDto dto);
    Task<bool> UpdateGradeAsync(int id, string grade);
    Task<bool> DeleteAsync(int id);
}
