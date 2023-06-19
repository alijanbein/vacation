using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


var connectionString = "Server=localhost;Port=3306;Database=vacation_db;Uid=root;";
var serverVersion = new MySqlServerVersion(new Version(8, 0, 26));
builder.Services.AddDbContext<VacationDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();
// app.UsePathBase("/api/vacation/");
// app.UseMiddleware<AuthMiddelware>();
app.UseRouting();
app.UseAuthorization();
app.Map("/api/vacation", app =>
{
    app.UseMiddleware<AuthMiddelware>(); // Apply authentication middleware
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
});


app.MapControllers();

app.Run();
