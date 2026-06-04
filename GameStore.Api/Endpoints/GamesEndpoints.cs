using GameStore.GameStoreApi.Data;
using GameStore.GameStoreApi.Dtos;
using GameStore.GameStoreApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.GameStoreApi.Endpoints
{

    public static class GamesEndpoints
    {

        // Minimum API setup with in-memory data store for testing purposes. In a real application, you would want to use a database and implement repositories and services to handle data access and business logic.
        // Here for now, will move later and use repositories and services, but for now just want to get something working for testing

        // We could have injected the context into the constructor of the class.

        const string GetGameByIdRouteName = "GetGameById";

        // In-memory data store for testing purposes; we would store in a DB in a real application
        // private static readonly List<GameDto> games = [
        // new GameDto(1, "The Legend of Zelda: Breath of the Wild", "Action-Adventure", 59.99m, new DateOnly(2017, 3, 3)),
        // new GameDto(2, "Super Mario Odyssey", "Platformer", 59.99m, new DateOnly(2017, 10, 27)),
        // new GameDto(3, "Red Dead Redemption 2", "Action-Adventure", 59.99m, new DateOnly(2018, 10, 26)),
        // new GameDto(4, "The Witcher 3: Wild Hunt", "Action RPG", 39.99m, new DateOnly(2015, 5, 19)),
        // new GameDto(5, "Minecraft", "Sandbox", 26.95m, new DateOnly(2011, 11, 18)),
        // new GameDto(6, "Cyberpunk 2077", "Action RPG", 59.99m, new DateOnly(2020, 12, 10))
        // ];


        // **************************
        // ***** Game endpoints *****
        // **************************
        public static void MapGamesEndpoints(this WebApplication app)
        {

            var group = app.MapGroup("/games");

            // ***** [HttpGet] ***** /games
            /// <summary>
            /// TEST URL: GET ALL http://localhost:port/games
            /// </summary>
            /// <param name="id"></param>
            /// <param name="context"></param   >
            /// <returns></returns>
            group.MapGet("/", async (GameStoreContext context)
             => await context.Games
                .Include(game => game.Genre)
                .Select(game => new GameSummaryDto(
                 Id: game.Id,
                 Name: game.Name,
                 Genre: game.Genre!.Name,
                 Price: game.Price,
                 ReleaseDate: game.ReleaseDate
             ))
             .AsNoTracking() // AsNoTracking is used to improve performance when you don't need to track changes to the entities. Since we're just reading data and not modifying it, we can use AsNoTracking to avoid the overhead of change tracking.
             .ToListAsync());



            // ***** [HttpGet] ***** /games/1
            /// <summary>
            /// TEST URL: GET http://localhost:port/games/1
            /// </summary>
            /// <param name="id"></param>
            /// <param name="context"></param   >
            /// <returns></returns>
            group.MapGet("/{id}", async (int id, GameStoreContext context) =>
            {
                var game = await context.Games.FindAsync(id);
                return game is null ? Results.NotFound() : Results.Ok(
                    new GameDetailsDto(
                        Id: game.Id,
                        Name: game.Name,
                        GenreId: game.GenreId,
                        Price: game.Price,
                        ReleaseDate: game.ReleaseDate
                    )
                );
            }).WithName(GetGameByIdRouteName);



            // ***** [HttpPost] ***** /games
            /// <summary>
            /// TEST URL: POST http://localhost:port/games // with JSON body: { "name": "New Game", "genreId": 1, "price": 19.99, "releaseDate": "2024-01-01" }
            /// </summary>
            /// <param name="NewGame"></param>
            /// <param name="context"></param   >
            /// <returns></returns>
            group.MapPost("/", async (CreateGameDto NewGame, GameStoreContext context) =>
            {
                // Validate the incoming game data
                // if (string.IsNullOrEmpty(NewGame.Name) || string.IsNullOrEmpty(NewGame.Genre) || NewGame.Price <= 0)
                // {
                //     return Results.BadRequest("Invalid game data. Name and Genre cannot be empty, and Price must be greater than 0.");
                // }   

                var game = new Game
                {
                    Name = NewGame.Name,
                    GenreId = NewGame.GenreId,
                    Price = NewGame.Price,
                    ReleaseDate = NewGame.ReleaseDate
                };

                // Add the new game to the database and save changes
                context.Games.Add(game);
                await context.SaveChangesAsync();

                // Create a GameDetailsDto to return in the response
                GameDetailsDto gameDetailsDto = new GameDetailsDto(
                    Id: game.Id,
                    Name: game.Name,
                    GenreId: game.GenreId,
                    Price: game.Price,
                    ReleaseDate: game.ReleaseDate
                );
                return Results.CreatedAtRoute(GetGameByIdRouteName, new { id = gameDetailsDto.Id }, gameDetailsDto)
                //return Results.Created($"/games/{game.Id}", game);
            ;
            });



            // ***** [HttpPut] ***** /games/1
            /// <summary>
            /// TEST URL: UPDATE http://localhost:port/games/1
            /// </summary>
            /// <param name="id"></param>
            /// <param name="updatedGame"></param>  
            /// <param name="context"></param>
            /// <returns></returns>
            group.MapPut("/{id}", async (int id, UpdateGameDto updatedGame, GameStoreContext context) =>
            {
                var existingGame = await context.Games.FindAsync(id);

                if (existingGame is null)
                {
                    return Results.NotFound();
                }

                // Update the existing game with the new values
                existingGame.Name = updatedGame.Name;
                existingGame.GenreId = updatedGame.GenreId;
                existingGame.Price = updatedGame.Price;
                existingGame.ReleaseDate = updatedGame.ReleaseDate;
                await context.SaveChangesAsync();
                return Results.NoContent();
            });

            // ***** [HttpDelete("{id:int}")] ***** /games/1
            /// <summary>
            /// TEST URL: DELETE http://localhost:port/games/1
            /// </summary>
            /// <param name="id"></param>
            /// <param name="context"></param   >
            /// <returns></returns>
            group.MapDelete("/{id}", async (int id, GameStoreContext context) =>
            {
                await context.Games.Where(game => game.Id == id).ExecuteDeleteAsync();
                return Results.NoContent();
            });

        }

    }


}