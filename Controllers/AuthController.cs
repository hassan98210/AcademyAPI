using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AcademyAPI.Data;
using AcademyAPI.DTOs.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AcademyAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto dto)
    {
        // Check Instructors
        var instructor = await _context.Instructors
            .FirstOrDefaultAsync(i => i.Email == dto.Email);

        if (instructor != null && BCrypt.Net.BCrypt.Verify(dto.Password, instructor.PasswordHash))
        {
            return Ok(new AuthResponseDto
            {
                Token = GenerateToken(instructor.Id.ToString(), instructor.Email, instructor.Role),
                Email = instructor.Email,
                Role = instructor.Role
            });
        }

        // Check Students
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Email == dto.Email);

        if (student != null && BCrypt.Net.BCrypt.Verify(dto.Password, student.PasswordHash))
        {
            return Ok(new AuthResponseDto
            {
                Token = GenerateToken(student.Id.ToString(), student.Email, student.Role),
                Email = student.Email,
                Role = student.Role
            });
        }

        return Unauthorized("Invalid credentials");
    }

    private string GenerateToken(string userId, string email, string role)
    {
        var jwtSettings = _config.GetSection("Jwt");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]!);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(ClaimTypes.Role, role)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}
