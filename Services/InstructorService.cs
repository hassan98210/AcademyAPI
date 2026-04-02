using AcademyAPI.Data;
using AcademyAPI.Models;
using AcademyAPI.DTOs.Instructor;
using AcademyAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace AcademyAPI.Services;

public class InstructorService : IInstructorService
{
    private readonly AppDbContext _context;

    public InstructorService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<InstructorResponseDto>> GetAllAsync()
    {
        return await _context.Instructors
            .AsNoTracking()
            .Include(i => i.Profile)
            .Select(i => new InstructorResponseDto
            {
                Id = i.Id,
                FullName = i.FullName,
                Email = i.Email,
                Role = i.Role,
                Bio = i.Profile!.Bio,
                AvatarUrl = i.Profile!.AvatarUrl,
                LinkedInUrl = i.Profile!.LinkedInUrl
            })
            .ToListAsync();
    }

    public async Task<InstructorResponseDto?> GetByIdAsync(int id)
    {
        return await _context.Instructors
            .AsNoTracking()
            .Include(i => i.Profile)
            .Where(i => i.Id == id)
            .Select(i => new InstructorResponseDto
            {
                Id = i.Id,
                FullName = i.FullName,
                Email = i.Email,
                Role = i.Role,
                Bio = i.Profile.Bio,
                AvatarUrl = i.Profile.AvatarUrl,
                LinkedInUrl = i.Profile.LinkedInUrl
            })
            .FirstOrDefaultAsync();
    }

    public async Task<InstructorResponseDto> CreateAsync(CreateInstructorDto dto)
    {
        var instructor = new Instructor
        {
            FullName = dto.FullName,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Profile = new InstructorProfile
            {
                Bio = dto.Bio,
                AvatarUrl = dto.AvatarUrl,
                LinkedInUrl = dto.LinkedInUrl
            }
        };

        _context.Instructors.Add(instructor);
        await _context.SaveChangesAsync();

        return new InstructorResponseDto
        {
            Id = instructor.Id,
            FullName = instructor.FullName,
            Email = instructor.Email,
            Role = instructor.Role,
            Bio = instructor.Profile.Bio,
            AvatarUrl = instructor.Profile.AvatarUrl,
            LinkedInUrl = instructor.Profile.LinkedInUrl
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdateInstructorDto dto)
    {
        var instructor = await _context.Instructors
            .Include(i => i.Profile)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (instructor == null) return false;

        if (dto.FullName != null) instructor.FullName = dto.FullName;
        if (dto.Email != null) instructor.Email = dto.Email;
        
        if (instructor.Profile != null)
        {
            if (dto.Bio != null) instructor.Profile.Bio = dto.Bio;
            if (dto.AvatarUrl != null) instructor.Profile.AvatarUrl = dto.AvatarUrl;
            if (dto.LinkedInUrl != null) instructor.Profile.LinkedInUrl = dto.LinkedInUrl;
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var instructor = await _context.Instructors.FindAsync(id);
        if (instructor == null) return false;

        _context.Instructors.Remove(instructor);
        await _context.SaveChangesAsync();
        return true;
    }
}
