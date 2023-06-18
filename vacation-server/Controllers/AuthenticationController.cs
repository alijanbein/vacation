using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.RegularExpressions;

[ApiController]
[Route("api/authentication/")]

public class AuthenticationController: ControllerBase
{
    private readonly VacationDbContext? _dbContext;

    public AuthenticationController(VacationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("register")]
    public ActionResult<Employee> registerEmployee([FromForm] EmployeeInput employeeInput)
    {
        
        if(employeeInput.Password == null || employeeInput.Username == null ||
            employeeInput.RePassword == null || !ValidateUsername(employeeInput.Username) ||
            !ValidatePassword(employeeInput.Password) ||
            employeeInput.Password != employeeInput.RePassword )
           {
            return BadRequest("Invalid Input entered");
        }    

        var employee = _dbContext.Employees.FirstOrDefault(e => e.Username == employeeInput.Username);

        if(employee != null){
            return BadRequest("Employee already exists.");
        }
        var newEmployee = new Employee
        {
            Username = employeeInput.Username,
            Password = PasswordHasher.HashPassword(employeeInput.Password),
        };

        _dbContext.Employees.Add(newEmployee);
        _dbContext.SaveChanges();
        var response = new {status = "succes",user = newEmployee};
        return Ok(new JsonResult(response));
    }
    public static bool ValidateUsername(string username)
        {
            return username.Length > 1;
        }
    public static bool ValidatePassword(string password)
        {
            if (password.Length <= 5)
            {
                return false;
            }

            return Regex.IsMatch(password, @"\d");
        }
}

public class EmployeeInput
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? RePassword { get; set; }
        
    }

