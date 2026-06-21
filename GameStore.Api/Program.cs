using GameStore.GameStoreApi;
using GameStore.GameStoreApi.Data;
using GameStore.GameStoreApi.Dtos;
using GameStore.GameStoreApi.Endpoints;
using GameStore.GameStoreApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddValidation();

// Allow the React dev frontend (Vite, port 5173) to call the API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
        policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// seeding and db context
builder.AddGameStoreDb();

var app = builder.Build();

app.UseCors("ReactApp");

app.MapGamesEndpoints();
app.MapGenresEndpoints();

// Migrate the database on application startup with the new extension method
app.MigrateDb();

app.Run();
