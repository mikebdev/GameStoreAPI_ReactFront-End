using GameStore.GameStoreApi.Data;
using GameStore.GameStoreApi.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GameStore.GameStoreApi.Endpoints
{
    public static class GenresEndpoints 
    {
        
        // We could add full CRUD operations for genres.
        public static void MapGenresEndpoints(this WebApplication app)
            {
                var group = app.MapGroup("/genres");
                group.MapGet("/", async (GameStoreContext context)
                => await context.Genres.Select(g => new GenreDto(g.Id, g.Name))
                .AsNoTracking()
                .ToListAsync());
            }

    }
}