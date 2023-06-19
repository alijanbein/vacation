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
        var respone = new {status = "succes", vacation = vacation};
        return Ok(respone);
        }
        catch (System.Exception ex)
        {
            
            return NotFound(ex.Message);
        }
    }

    [HttpPut("update_vacation/{id}")]
    public ActionResult<Vacation> updateVacation([FromForm] VacationInput vacationInput, int id )
    {
        try
        {
             string s = HttpContext.Items["id"].ToString();
            int employeeId;
            int.TryParse(s, out employeeId);
            var vacation = _dbContext.Vacations.Find(id);
            if(vacation == null){
                return NotFound();
            }
            if(vacation.EmployeeId == employeeId){
                vacation.title = vacationInput.title;
                vacation.Description = vacationInput.Description;
                vacation.DateTimeFrom = vacationInput.DateTimeFrom;
                vacation.DateTimeTo = vacationInput.DateTimeTo;
                _dbContext.SaveChanges();
                var respone = new {status= "succes", vacation = vacation};
                return Ok(respone);
            }
            else
            {
                return NotFound("your are not the owner of this vacation");

            }
        }
        catch (System.Exception ex) 
        {
            
         return NotFound(ex.Message);
;
        }
       return  Ok("fwe");
    }

}

public class VacationInput{
    public String  title { get; set; }
    public string? Description { get; set; }
    public DateTime DateTimeFrom { get; set; }
    public DateTime DateTimeTo { get; set; }
 
}