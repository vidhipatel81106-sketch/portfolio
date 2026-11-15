
export default async function handler(req, res) {
    const city = typeof req.query.city === "string"
      ? req.query.city.trim()
      : "";
  
    if (!city) {
      return res.status(400).json({
        error: "Please enter a city name."
      });
    }
  
    const apiKey = process.env.OPENWEATHER_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({
        error: "Weather API key is not configured."
      });
    }
  
    try {
      const url = new URL(
        "https://api.openweathermap.org/data/2.5/weather"
      );
  
      url.searchParams.set("q", city);
      url.searchParams.set("appid", apiKey);
      url.searchParams.set("units", "metric");
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status === 401 ? 502 : response.status).json({
          error: response.status === 404
            ? "City not found. Check the spelling."
            : "Unable to get weather data. Please try again."
        });
      }
  
      return res.status(200).json({
        name: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity
      });
  
    } catch (error) {
      return res.status(502).json({
        error: "Unable to contact the weather service."
      });
    }
  }
  