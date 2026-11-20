
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Homepage
app.MapGet("/", () =>
{
    return Results.Content("""
        <!DOCTYPE html>
        <html>
        <head>
            <title>Study Room Booking API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f4f6f9;
                    text-align: center;
                    padding: 80px 20px;
                }
                .container {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    max-width: 600px;
                    margin: auto;
                }
                h1 { color: #2563eb; }
                a { color: #2563eb; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Study Room Booking</h1>
                <p>Welcome to the Study Room Booking API!</p>
                <p>Your ASP.NET 10 backend is running.</p>
                <a href="/openapi/v1.json">
                    View API documentation
                </a>
            </div>
        </body>
        </html>
        """, "text/html");
});

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
