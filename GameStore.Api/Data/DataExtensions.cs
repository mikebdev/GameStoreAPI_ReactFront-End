using GameStore.GameStoreApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.GameStoreApi.Data
{
    public static class DataExtensions
    {
        // Extension method to migrate the database on application startup
        public static void MigrateDb(this WebApplication app)
        {
            using var scope = app.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<GameStoreContext>();
            dbContext.Database.Migrate();
        }

        public static void AddGameStoreDb(this WebApplicationBuilder builder)
        {
            var connectionString = builder.Configuration.GetConnectionString("GameStore");

            // DbContext has a Scoped service lifetime because:
            // 1. It ensures that each HTTP request gets its own instance of the DbContext.
            // 2. It allows for proper disposal of the DbContext instance after each request.
            // 3. It prevents issues with concurrent access to the DbContext in a multi-threaded environment, which can lead to data corruption or unexpected behavior.
            // 4. Reusing an instance of the DbContext can lead to increased memory usage and potential performance issues.

            builder.Services.AddSqlite<GameStoreContext>(
                connectionString,
                optionsAction: options => options.UseSeeding((context, _) =>
                {
                    // Seed the database with initial data

                    // Check if the Genres table is empty before seeding
                    if (!context.Set<Genre>().Any())
                    {
                        context.Set<Genre>().AddRange(
                            new Genre { Id = 1, Name = "Action-adventure" },
                            new Genre { Id = 2, Name = "Platform" },
                            new Genre { Id = 3, Name = "Role-playing" },
                            new Genre { Id = 4, Name = "Simulation" },
                            new Genre { Id = 5, Name = "Strategy" },
                            new Genre { Id = 6, Name = "Sports" }
                        );
                    }
                    context.SaveChanges();
                })

                );


        }

    }

}