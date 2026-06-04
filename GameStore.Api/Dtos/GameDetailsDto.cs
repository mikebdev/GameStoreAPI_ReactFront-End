
namespace GameStore.GameStoreApi.Dtos
{
    // A Record is a reference type that provides built-in functionality for encapsulating data.
    // A DTO (Data Transfer Object) is a simple object that is used to transfer data between layers of an application. 
    // It is often used to encapsulate data and to reduce the amount of data that is sent over the network. 
    // In this case, the GameDto class is likely used to transfer data about a game from the API layer to the service layer or vice versa.

    public record GameDetailsDto( 
        int Id,
        string Name,
        int GenreId,
        decimal Price,
        DateOnly ReleaseDate
    );

}