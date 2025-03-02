using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;


/*
The AppDbContext class in Entity Framework Core acts as a bridge between your C# code and your PostgreSQL (or MySQL) database. It allows you to interact with the database using C# objects, rather than writing raw SQL queries.


  public class ApplicationDbContext : 
    IdentityDbContext<ApplicationUser>, this line ineherits from the 
    identitydbcontext<Application user> which means, it automaticall includes all the tables needed for 
    asp.net core identity(seethe db for the tables)

  The public DbSet<UserBook> UserBooks { get; set; }  // Stores books that users track:
      tells EF core that we want a db table called UserBooks.
      Ef core will map this UserBook model into a table when we run migrations.
      Each row in the userbooks table will represent a book that a user is tracking.

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options) { } : 
          receives the database options from program.cs and then passes them to the base class (identityDbContext).
          The "options" tell EF core how to connect to the db (which provider).
          See program.cs for how we tell it what provider we are using.


*/



namespace server.Data
{
  public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
  {
    public DbSet<UserBook> UserBooks { get; set; }  

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }
  }

}
