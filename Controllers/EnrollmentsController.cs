using AcademyAPI.DTOs.Enrollment;
using AcademyAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademyAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class EnrollmentsController : ControllerBase
{
    private readonly IEnrollmentService _service;

    public EnrollmentsController(IEnrollmentService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<IEnumerable<EnrollmentResponseDto>>> GetAll()
    {
        return Ok(await _service.GetAllAsync());
    }

    [HttpGet("student/{studentId}")]
    public async Task<ActionResult<IEnumerable<EnrollmentResponseDto>>> GetByStudentId(int studentId)
    {
        return Ok(await _service.GetByStudentIdAsync(studentId));
    }

    [HttpPost]
    [Authorize(Roles = "Student,Admin")]
    public async Task<ActionResult<EnrollmentResponseDto>> Create([FromBody] CreateEnrollmentDto dto)
    {
        var result = await _service.CreateAsync(dto);
        return Ok(result);
    }

    [HttpPut("{id}/grade")]
    [Authorize(Roles = "Instructor,Admin")]
    public async Task<IActionResult> UpdateGrade(int id, [FromBody] UpdateGradeDto dto)
    {
        var success = await _service.UpdateGradeAsync(id, dto.Grade);
        if (!success) return NotFound();
        return NoContent();
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
