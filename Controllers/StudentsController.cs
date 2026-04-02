using AcademyAPI.DTOs.Student;
using AcademyAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademyAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly IStudentService _service;

    public StudentsController(IStudentService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<StudentResponseDto>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<StudentResponseDto>> GetById(int id)
    {
        var student = await _service.GetByIdAsync(id);
        if (student == null) return NotFound();
        return Ok(student);
    }

    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<RegistrationResponseDto>> Register([FromBody] CreateStudentDto dto)
    {
        var result = await _service.RegisterAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        if (!success) return NotFound();
        return NoContent();
    }
}
