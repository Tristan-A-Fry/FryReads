using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public interface IJwtService
{
    string GenerateToken(string userId, string email);
}

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;

    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

        public string GenerateToken(string userId, string email)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secret = jwtSettings["Secret"];
            
            Console.WriteLine($"Secret Key (JwtService.cs) : {secret}");

            if (string.IsNullOrEmpty(secret))
            {
                throw new InvalidOperationException("JWT Secret is missing from appsettings.json");
            }

            var key = new SymmetricSecurityKey(Convert.FromBase64String(secret)); // ✅ Convert Secret to Bytes
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId), 
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationInMinutes"] ?? "60")),
                signingCredentials: credentials
            );
            Console.WriteLine($"✅ Generated Token: {new JwtSecurityTokenHandler().WriteToken(token)}");  // ✅ Debugging
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
}
//     public string GenerateToken(string userId, string email)
//     {
//         var jwtSettings = _configuration.GetSection("JwtSettings");
//         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));
//
//         var claims = new[]
//         {
//             new Claim(JwtRegisteredClaimNames.Sub, userId),
//             // new Claim(ClaimTypes.NameIdentifier, userId),
//             new Claim(JwtRegisteredClaimNames.Email, email),
//             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
//         };
//
//         var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
//         var token = new JwtSecurityToken(
//             issuer: jwtSettings["Issuer"],
//             audience: jwtSettings["Audience"],
//             claims: claims,
//             expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationInMinutes"])),
//             signingCredentials: credentials
//         );
//
//         return new JwtSecurityTokenHandler().WriteToken(token);
//     }
// }
