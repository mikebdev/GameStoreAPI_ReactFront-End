using GameStore.GameStoreApi;
using GameStore.GameStoreApi.Data;
using GameStore.GameStoreApi.Dtos;
using GameStore.GameStoreApi.Endpoints;
using GameStore.GameStoreApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddValidation();

// seeding and db context
builder.AddGameStoreDb();

var app = builder.Build();

app.MapGamesEndpoints();
app.MapGenresEndpoints();

// Migrate the database on application startup with the new extension method
app.MigrateDb();

app.Run();
