using System;
using GameStore.GameStoreApi.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.GameStoreApi.Data
{
    public class GameStoreContext : DbContext
    {
        public GameStoreContext(DbContextOptions<GameStoreContext> options) : base(options)
        {
        }

        // public DbSet<Game> Games { get; set; }  
        public DbSet<Game> Games => Set<Game>();
        public DbSet<Genre> Genres => Set<Genre>();
    }
}