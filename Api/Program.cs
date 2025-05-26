// RigSync | Program.cs
#pragma warning disable SA1200 // Using directives should be placed correctly
using Api.Middleware;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Hosting;
#pragma warning restore SA1200 // Using directives should be placed correctly

var builder = FunctionsApplication.CreateBuilder(args);

builder.ConfigureFunctionsWebApplication();

builder.UseMiddleware<ExceptionHandlerMiddleware>();

// Application Insights isn't enabled by default. See https://aka.ms/AAt8mw4.
/*
builder.Services
  .AddApplicationInsightsTelemetryWorkerService()
  .ConfigureFunctionsApplicationInsights();
*/

builder.Build().Run();
