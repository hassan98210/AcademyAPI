using AcademyAPI.DTOs.Student;

namespace AcademyAPI.Services.Interfaces;

public interface IStudentService
{
    Task<IEnumerable<StudentResponseDto>> GetAllAsync();
    Task<StudentResponseDto?> GetByIdAsync(int id);
    Task<RegistrationResponseDto> RegisterAsync(CreateStudentDto dto);
    Task<bool> DeleteAsync(int id);
}
