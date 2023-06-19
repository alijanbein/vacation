
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class TokenMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public TokenMiddleware(RequestDelegate next,IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task Invoke(HttpContext context)
    {

       
            string header = context.Request.Headers["Authorization"];
            string token = header.Substring("Bearer ".Length);
            Console.WriteLine(token);
            if (token != null)
            {
                try
                {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadToken(token) as JwtSecurityToken;
                var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                var claimsPrincipal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);
                var claimsIdentity = claimsPrincipal.Identity as ClaimsIdentity;
                var claims = claimsIdentity.Claims.ToList();
                var username = claimsIdentity.FindFirst("username")?.Value;
                var id = claimsIdentity.FindFirst("EmployeeId")?.Value;
                Console.WriteLine(username);
                context.Items["username"] = username;
                context.Items["id"] = id;
                }
                catch (Exception ex)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("your are not authorized");

                    return;
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                
                return;
               
            }
        

        await _next(context);
    }

}
