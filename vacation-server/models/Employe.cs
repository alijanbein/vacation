public class Employee
 {
    public int EmployeeId {get; set;}
    public string? Username {get; set;}
    public string? Password {get; set;}

    public ICollection<Vacation>? Vacations { get; set; }
}

