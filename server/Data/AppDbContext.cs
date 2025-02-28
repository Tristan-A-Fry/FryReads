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
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<UserBook> UserBooks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserBook>()
                .HasOne(ub => ub.User)
                .WithMany(u => u.UserBooks)
                .HasForeignKey(ub => ub.UserId);

            modelBuilder.Entity<UserBook>()
                .HasOne(ub => ub.Book)
                .WithMany()
                .HasForeignKey(ub => ub.BookId);
        }
    }

}