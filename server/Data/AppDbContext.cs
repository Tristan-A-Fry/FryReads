using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;


/*
The AppDbContext class in Entity Framework Core acts as a bridge between your C# code and your PostgreSQL (or MySQL) database. It allows you to interact with the database using C# objects, rather than writing raw SQL queries.

In simple terms:
    It maps your C# models (User, Book, UserBook) to database tables.
    It provides a way to query, insert, update, and delete records using C#.
    It helps enforce relationships (e.g., User has many Books).
*/



namespace server.Data
{
  public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
  {
    public DbSet<UserBook> UserBooks { get; set; }  // Stores books that users track

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }
  }

}
