using Microsoft.AspNetCore.Mvc;
  

    [ApiController]
    [Route("api/vacation/")]
public class VacationController : ControllerBase
{

    private readonly VacationDbContext? _dbContext;

    public VacationController(VacationDbContext dbContext)
    {
        _dbContext = dbContext;
    }
 
    [HttpGet]
    public ActionResult<Vacation> getVactions()
    {
        var vactions = _dbContext.Vacations.ToList();
        
        return Ok(vactions);
    }
    [HttpPost("add_vacation")]
    public ActionResult<Vacation> addVaction([FromForm] VacationInput vacationInput){
        try
        {
            string id = HttpContext.Items["id"].ToString();
            // Console.WriteLine((int)HttpContext.Items["id"]);
            int employeeId;
            if(int.TryParse(id, out employeeId)){
                
     
            };
            var vacation = new Vacation{
            title = vacationInput.title,
            Description = vacationInput.Description,
            DateTimeFrom = vacationInput.DateTimeFrom,
            DateTimeTo = vacationInput.DateTimeTo,
            EmployeeId = employeeId
        };
        _dbContext.Vacations.Add(vacation);
        _dbContext.SaveChanges();
        return Ok(vacation);
        }
        catch (System.Exception ex)
        {
            
            return NotFound(ex.Message);
        }
    }

}

public class VacationInput{
    public String  title { get; set; }
    public string? Description { get; set; }
    public DateTime DateTimeFrom { get; set; }
    public DateTime DateTimeTo { get; set; }
 
}