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
    

}