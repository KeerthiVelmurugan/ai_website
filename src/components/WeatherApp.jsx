import { useState } from "react";
import "./WeatherApp.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async (event) => {
    event.preventDefault();

    const cityName = city.trim();

    if (!cityName) {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    if (!API_KEY) {
      setError("Weather API key is missing. Please configure your .env file.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message === "city not found"
            ? "City not found. Please check the spelling."
            : data.message || "Unable to fetch weather information."
        );
      }

      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const weatherIcon = weather?.weather?.[0]?.icon;

  return (
    <div className="weather-page">
      <div className="weather-card">
        <header className="weather-header">
          <span className="weather-brand-icon">☁</span>
          <h1>Weatherly</h1>
          <p>Discover the weather around you</p>
        </header>

        <form className="weather-search" onSubmit={searchWeather}>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Enter city name..."
            aria-label="City name"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {loading && (
          <p className="weather-message" role="status">
            Fetching weather data...
          </p>
        )}

        {error && (
          <p className="weather-error" role="alert">
            {error}
          </p>
        )}

        {weather && (
          <section className="weather-result" aria-live="polite">
            <div className="weather-location">
              <h2>{weather.name}</h2>
              <p>{weather.sys.country}</p>
            </div>

            {weatherIcon && (
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                alt={weather.weather[0].description}
              />
            )}

            <div className="weather-temperature">
              {Math.round(weather.main.temp)}°C
            </div>

            <p className="weather-condition">
              {weather.weather[0].description}
            </p>

            <div className="weather-divider" />

            <div className="weather-details">
              <div className="weather-detail">
                <span className="detail-icon">🌡️</span>
                <div>
                  <p>Feels Like</p>
                  <strong>{Math.round(weather.main.feels_like)}°C</strong>
                </div>
              </div>

              <div className="weather-detail">
                <span className="detail-icon">💧</span>
                <div>
                  <p>Humidity</p>
                  <strong>{weather.main.humidity}%</strong>
                </div>
              </div>

              <div className="weather-detail">
                <span className="detail-icon">💨</span>
                <div>
                  <p>Wind Speed</p>
                  <strong>{weather.wind.speed} m/s</strong>
                </div>
              </div>

              <div className="weather-detail">
                <span className="detail-icon">🔽</span>
                <div>
                  <p>Pressure</p>
                  <strong>{weather.main.pressure} hPa</strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {!weather && !loading && !error && (
          <div className="weather-empty">
            <span>🌤️</span>
            <h2>Check the weather</h2>
            <p>Enter a city name to see its current weather conditions.</p>
          </div>
        )}

        <footer className="weather-footer">
          Weather data provided by OpenWeather
        </footer>
      </div>
    </div>
  );
}

export default WeatherApp;