# Weather Monitor - Local API

This project includes a small local API that proxies requests to the National Weather Service (api.weather.gov) and a front-end that can call it.

Setup

1. Install dependencies (from project root):

   npm install

2. Start the server:

   npm start

By default the server listens on port 3000. The front-end expects the API at `/api/weather`.

Endpoints

- GET /api/weather?city=Seattle%2C%20WA  — geocodes the city and returns forecast data from NWS
- GET /api/weather?lat=47.6062&lon=-122.3321 — fetch forecast directly by coordinates

Notes

- The server uses Nominatim (OpenStreetMap) for geocoding. Be considerate with rate limits.
- The NWS API requires a proper User-Agent that identifies the application and contact info; change the USER_AGENT value in `server.js` to an email or URL for production use.
 - This server enforces a basic rate limit (60 requests per minute per IP) to avoid overloading upstream services.
 - Forecast responses now include a `normalizedForecast` array which contains a simplified, consistent shape for each period (startTime, endTime, temperature, shortForecast, detailedForecast, windSpeed, windDirection, probabilityOfPrecipitation, etc.). The full raw NWS payload is still returned as `forecast` for debugging.

Caching

- Geocoding results are cached for 24 hours.
- Forecasts are cached for 10 minutes.
