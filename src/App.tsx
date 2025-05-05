import React from "react";
import useFetch from "./useFetch";

type WeatherData = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
  };
  timezone: number;
};

type GeocodingData = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

function App() {
  const [query, setQuery] = React.useState("");
  const [selectedQuery, setSelectedQuery] = React.useState("");
  const [selectedLocation, setSelectedLocation] =
    React.useState<GeocodingData | null>(null);
  const [debouncedQuery, setDebouncedQuery] = React.useState(query);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const GEOCODING_URL =
    debouncedQuery.length > 2
      ? `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedQuery}&limit=5&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }`
      : "";

  const suggestions = useFetch<GeocodingData[]>(GEOCODING_URL);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const suggestionBoxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const WEATHER_URL =
    selectedLocation !== null
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${
          selectedLocation.lat
        }&lon=${selectedLocation.lon}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }&units=metric&lang=en_us`
      : "";

  const weather = useFetch<WeatherData>(WEATHER_URL);

  const [localTime, setLocalTime] = React.useState("");
  const [localDate, setLocalDate] = React.useState("");

  React.useEffect(() => {
    if (!weather.data) return;

    const offset = weather.data.timezone;

    const updateLocalTimeAndDate = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + offset * 1000);

      setLocalTime(
        local.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      setLocalDate(
        local.toLocaleDateString("en-US", {
          weekday: "long",
          //year: "numeric",
          month: "long",
          day: "2-digit",
        })
      );
    };

    updateLocalTimeAndDate();
    const interval = setInterval(updateLocalTimeAndDate, 1000);

    return () => clearInterval(interval);
  }, [weather.data]);

  return (
    <section className="p-8 max-w-md mx-auto">
      <div className="relative" ref={suggestionBoxRef}>
        <input
          className="p-2 w-full border rounded"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          placeholder="Search"
        />
        {suggestions.data && showSuggestions && (
          <ul className="absolute z-10 bg-white border w-full rounded mt-1 shadow">
            {suggestions.loading && (
              <li className="p-2 text-gray-600">Loading...</li>
            )}
            {suggestions.error && (
              <li className="p-2 text-red-500">Error: {suggestions.error}</li>
            )}
            {suggestions.data && suggestions.data.length > 0
              ? [
                  ...new Map(
                    suggestions.data.map((item) => [
                      `${item.name}-${item.state ?? ""}-${item.country}`,
                      item,
                    ])
                  ).values(),
                ].map((location, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                    onClick={() => {
                      setSelectedLocation(location);
                      setQuery("");
                      setSelectedQuery(
                        `${location.name}, ${
                          location.state ? `${location.state},` : ""
                        } ${location.country}`
                      );
                      setShowSuggestions(false);
                    }}
                  >
                    {location.name},{" "}
                    {location.state ? `${location.state},` : ""}{" "}
                    {location.country}
                  </li>
                ))
              : !suggestions.loading && (
                  <li className="p-2 text-gray-600">Not Found</li>
                )}
          </ul>
        )}
      </div>

      {weather.loading && <div className="mt-4">Loading...</div>}

      {weather.data && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">{selectedQuery}</h2>
          <p>{weather.data.main.temp}°C</p>
          <p>{weather.data.weather[0].main}</p>
          <p>{weather.data.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p>{localTime}</p>
          <p>{localDate}</p>
        </div>
      )}
    </section>
  );
}

export default App;
