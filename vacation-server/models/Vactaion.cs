public class Vacation
{
    public int VacationId { get; set; }
    public String  title { get; set; }
    public string? Description { get; set; }
    public DateTime DateTimeFrom { get; set; }
    public DateTime DateTimeTo { get; set; }
    public int EmployeeId { get; set; }
    public Employee Employee { get; set; }
}