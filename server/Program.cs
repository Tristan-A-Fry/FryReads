using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using server.Data;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

//JWT Settings
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["Secret"];

//For debugging
// Console.WriteLine($"🔑 Secret Key (Program.cs): {secretKey}");  // ✅ Debugging

// ✅ Add Swagger with JWT Authentication Support
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "FryReads API", Version = "v1" });

    // 🔹 JWT Security (for your API authentication)
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter 'Bearer {your JWT token}'",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT"
    };

    // 🔹 ISBNdb API Key Security (for external API)
    var isbnSecurityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter your ISBNdb API Key",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "ApiKey"
    };

    options.AddSecurityDefinition("Bearer", jwtSecurityScheme);  // ✅ For your API auth
    options.AddSecurityDefinition("ApiKey", isbnSecurityScheme); // ✅ For ISBNdb

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, new string[] { } },
        { isbnSecurityScheme, new string[] { } }
    });
});


// Add database connection (Change to your connection string)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Add Jwt services
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String(secretKey)),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero, //prevents token expiry issues


        // NameClaimType = JwtRegisteredClaimNames.Sub
        NameClaimType = "sub"

    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IJwtService, JwtService>();

builder.Services.AddScoped<IBookRepository, BookRepository >();
builder.Services.AddScoped<IBookService, BookService>();

builder.Services.AddScoped<IIsbnDbService, IsbnDbService>();

builder.Services.AddHttpClient<IIsbnDbService, IsbnDbService>(); 

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "FryReads API V1");
        options.RoutePrefix = string.Empty; // Serve Swagger at root (http://localhost:5000)
        options.ConfigObject.AdditionalItems["persistAuthorization"] = true;
    });
}


app.UseCors("AllowAll");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
