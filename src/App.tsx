import React from "react";
//hooks
import useFetch from "./hooks/useFetch";
//types
import type { WeatherData } from "./types/WeatherData";
import type { GeocodingData } from "./types/GeocodingData";
//constants
import { langAliasToBCP47 } from "./constants/langAliasToBCP47";
//utils
import { getTranslatedCityName } from "./utils/getTranslatedCityName";
import { playWeatherSounds, stopAllSounds } from "./utils/soundManager";
//components
import Background from "./components/Background";
import Loading from "./components/Loading";
import SearchAndConfig from "./components/SearchAndConfig";
import WeatherCard from "./components/WeatherCard";
//particles
import { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

function App() {
  // particles
  const [particlesLoaded, setParticlesLoaded] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      setParticlesLoaded(true);
    });
  }, []);

  // GET suggestions
  const [query, setQuery] = React.useState("");
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
      : null;

  const suggestions = useFetch<GeocodingData[]>(GEOCODING_URL);

  // GET weather
  const [selectedLocation, setSelectedLocation] =
    React.useState<GeocodingData | null>(null);
  const [units, setUnits] = React.useState("metric");
  const [lang, setLang] = React.useState("en");

  const WEATHER_URL =
    selectedLocation !== null
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${
          selectedLocation.lat
        }&lon=${selectedLocation.lon}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }&units=${units}&lang=${lang}`
      : "";

  const weather = useFetch<WeatherData>(WEATHER_URL);

  //isNight & weatherId
  const [isNight, setIsNight] = React.useState(false);
  const [weatherId, setWeatherId] = React.useState<number | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (weather.data?.weather?.[0]?.icon) {
      setIsNight(weather.data.weather[0].icon.endsWith("n"));
    }
    if (weather.data?.weather?.[0]?.id) {
      setWeatherId(weather.data.weather[0].id);
    }
  }, [weather.data]);

  // selectedQuery
  const [selectedQuery, setSelectedQuery] = React.useState(["", "", ""]);

  React.useEffect(() => {
    if (!selectedLocation) return;

    const translatedName = getTranslatedCityName(selectedLocation, lang);

    setSelectedQuery([
      translatedName,
      selectedLocation.state ? selectedLocation.state : "",
      selectedLocation.country,
    ]);
  }, [lang, selectedLocation]);

  // Date & Time
  const [locale, setLocale] = React.useState("en-US");

  React.useEffect(() => {
    setLocale(langAliasToBCP47[lang]);
  }, [lang]);

  const [is12HourFormat, setIs12HourFormat] = React.useState(false);

  // sounds
  React.useEffect(() => {
    if (weatherId) {
      playWeatherSounds(weatherId, isNight);
    }

    return () => {
      stopAllSounds();
    };
  }, [weatherId, isNight]);

  return (
    <>
      <Background
        particlesLoaded={particlesLoaded}
        isNight={isNight}
        weatherId={weatherId}
      />

      <div className="h-full flex items-center justify-center">
        <section
          className={`${
            isNight ? "text-white" : "text-black"
          } p-8 max-w-xl md:max-w-2xl md:min-w-xl transition-colors duration-2000`}
        >
          <SearchAndConfig
            //search
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
            setSelectedLocation={setSelectedLocation}
            setSelectedQuery={setSelectedQuery}
            //config
            lang={lang}
            setLang={setLang}
            units={units}
            setUnits={setUnits}
            is12HourFormat={is12HourFormat}
            setIs12HourFormat={setIs12HourFormat}
          />

          {weather.loading && <Loading />}

          {weather.data && (
            <WeatherCard
              selectedQuery={selectedQuery}
              weatherData={weather.data}
              units={units}
              locale={locale}
              is12HourFormat={is12HourFormat}
            />
          )}
        </section>
      </div>
    </>
  );
}

export default App;
