using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using Microsoft.IdentityModel.Tokens;
[ApiController]
[Route("api/authentication/")]

public class AuthenticationController: ControllerBase
{
    private readonly VacationDbContext? _dbContext;
    private readonly IConfiguration _configuration;

    public AuthenticationController(VacationDbContext dbContext,IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public ActionResult<Employee> registerEmployee([FromForm] EmployeeInput employeeInput)
    {
        
        if(employeeInput.Password == null || employeeInput.Username == null || !ValidateUsername(employeeInput.Username) ||
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

    [HttpPost("login")]
    public ActionResult<Employee> loginEmployee([FromForm] EmployeeInput employeeInput)
    {
        if(employeeInput.Password == null || employeeInput.Username == null)
        {
            return BadRequest("Invalid Input entered");
        }    
        var employee = _dbContext.Employees.FirstOrDefault(e => e.Username == employeeInput.Username);
        if(employee == null || !PasswordHasher.VerifyPassword(employeeInput.Password,employee.Password))
        {
            return BadRequest("Ops! your Username or password are invalid");
        }
        var token = GenerateJwtToken(employee);
        var response = new {status = "succes",user = employee,token=token};

        return Ok(response);
        
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
        private string GenerateJwtToken(Employee employee)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("EmployeeId", employee.EmployeeId.ToString()),
                    new Claim("username", employee.Username)
                }),
                Expires = DateTime.UtcNow.AddDays(7), 
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
}

public class EmployeeInput
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? RePassword { get; set; }
        
    }

