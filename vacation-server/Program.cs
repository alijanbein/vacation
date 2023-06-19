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

app.UseMiddleware<TokenMiddleware>();
app.UseRouting();
app.UseAuthorization();

// app.MapWhen(context => context.Request.Path.StartsWithSegments("/api/vacation"), appBranch =>
// {
//     appBranch.UseMiddleware<TokenMiddleware>();
// });

app.MapControllers();

app.Run();
