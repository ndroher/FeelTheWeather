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
  local_names?: Record<string, string>;
};

const languages: { label: string; value: string }[] = [
  { label: "Albanian", value: "sq" },
  { label: "Afrikaans", value: "af" },
  { label: "Arabic", value: "ar" },
  { label: "Azerbaijani", value: "az" },
  { label: "Basque", value: "eu" },
  { label: "Belarusian", value: "be" },
  { label: "Bulgarian", value: "bg" },
  { label: "Catalan", value: "ca" },
  { label: "Chinese Simplified", value: "zh_cn" },
  { label: "Chinese Traditional", value: "zh_tw" },
  { label: "Croatian", value: "hr" },
  { label: "Czech", value: "cz" },
  { label: "Danish", value: "da" },
  { label: "Dutch", value: "nl" },
  { label: "English", value: "en" },
  { label: "Finnish", value: "fi" },
  { label: "French", value: "fr" },
  { label: "Galician", value: "gl" },
  { label: "German", value: "de" },
  { label: "Greek", value: "el" },
  { label: "Hebrew", value: "he" },
  { label: "Hindi", value: "hi" },
  { label: "Hungarian", value: "hu" },
  { label: "Icelandic", value: "is" },
  { label: "Indonesian", value: "id" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "kr" },
  { label: "Kurmanji (Kurdish)", value: "ku" },
  { label: "Latvian", value: "la" },
  { label: "Lithuanian", value: "lt" },
  { label: "Macedonian", value: "mk" },
  { label: "Norwegian", value: "no" },
  { label: "Persian (Farsi)", value: "fa" },
  { label: "Polish", value: "pl" },
  { label: "Portuguese", value: "pt" },
  { label: "Portuguese (Brazil)", value: "pt_br" },
  { label: "Romanian", value: "ro" },
  { label: "Russian", value: "ru" },
  { label: "Serbian", value: "sr" },
  { label: "Slovak", value: "sk" },
  { label: "Slovenian", value: "sl" },
  { label: "Spanish", value: "es" },
  { label: "Swedish", value: "sv" },
  { label: "Thai", value: "th" },
  { label: "Turkish", value: "tr" },
  { label: "Ukrainian", value: "uk" },
  { label: "Vietnamese", value: "vi" },
  { label: "Zulu", value: "zu" },
];

const langAliasToISO639: Record<string, string> = {
  sq: "sq", // Albanian
  af: "af", // Afrikaans
  ar: "ar", // Arabic
  az: "az", // Azerbaijani
  eu: "eu", // Basque
  be: "be", // Belarusian
  bg: "bg", // Bulgarian
  ca: "ca", // Catalan
  zh_cn: "zh", // Chinese Simplified
  zh_tw: "zh", // Chinese Traditional
  hr: "hr", // Croatian
  cz: "cs", // Czech
  da: "da", // Danish
  nl: "nl", // Dutch
  en: "en", // English
  fi: "fi", // Finnish
  fr: "fr", // French
  gl: "gl", // Galician
  de: "de", // German
  el: "el", // Greek
  he: "he", // Hebrew
  hi: "hi", // Hindi
  hu: "hu", // Hungarian
  is: "is", // Icelandic
  id: "id", // Indonesian
  it: "it", // Italian
  ja: "ja", // Japanese
  kr: "ko", // Korean
  ku: "ku", // Kurdish (Kurmanji)
  la: "lv", // Latvian
  lt: "lt", // Lithuanian
  mk: "mk", // Macedonian
  no: "no", // Norwegian
  fa: "fa", // Persian
  pl: "pl", // Polish
  pt: "pt", // Portuguese
  pt_br: "pt", // Brazilian Portuguese mapped to pt
  ro: "ro", // Romanian
  ru: "ru", // Russian
  sr: "sr", // Serbian
  sk: "sk", // Slovak
  sl: "sl", // Slovenian
  sp: "es", // Spanish alias
  es: "es", // Spanish
  sv: "sv", // Swedish
  se: "sv", // Swedish alias
  th: "th", // Thai
  tr: "tr", // Turkish
  ua: "uk", // Ukrainian alias
  uk: "uk", // Ukrainian
  vi: "vi", // Vietnamese
  zu: "zu", // Zulu
};

const langAliasToBCP47: Record<string, string> = {
  sq: "sq", // Albanian
  af: "af", // Afrikaans
  ar: "ar", // Arabic
  az: "az", // Azerbaijani
  eu: "eu", // Basque
  be: "be", // Belarusian
  bg: "bg", // Bulgarian
  ca: "ca", // Catalan
  zh_cn: "zh-CN", // Chinese Simplified
  zh_tw: "zh-TW", // Chinese Traditional
  hr: "hr", // Croatian
  cz: "cs", // Czech
  da: "da", // Danish
  nl: "nl", // Dutch
  en: "en-US", // English
  fi: "fi", // Finnish
  fr: "fr", // French
  gl: "gl", // Galician
  de: "de", // German
  el: "el", // Greek
  he: "he", // Hebrew
  hi: "hi", // Hindi
  hu: "hu", // Hungarian
  is: "is", // Icelandic
  id: "id", // Indonesian
  it: "it", // Italian
  ja: "ja", // Japanese
  kr: "ko", // Korean
  ku: "ku", // Kurdish (Kurmanji)
  la: "lv", // Latvian
  lt: "lt", // Lithuanian
  mk: "mk", // Macedonian
  no: "no", // Norwegian
  fa: "fa", // Persian
  pl: "pl", // Polish
  pt: "pt-PT", // European Portuguese
  pt_br: "pt-BR", // Brazilian Portuguese
  ro: "ro", // Romanian
  ru: "ru", // Russian
  sr: "sr", // Serbian
  sk: "sk", // Slovak
  sl: "sl", // Slovenian
  sp: "es-ES", // Spanish (alias)
  es: "es-ES", // Spanish
  sv: "sv", // Swedish
  se: "sv", // Swedish (alias)
  th: "th", // Thai
  tr: "tr", // Turkish
  ua: "uk", // Ukrainian (alias)
  uk: "uk", // Ukrainian
  vi: "vi", // Vietnamese
  zu: "zu", // Zulu
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

  function getTranslatedCityName(
    location: GeocodingData,
    openWeatherLangCode: string
  ): string {
    const localNames = location.local_names ?? {};
    const normalizedLang = openWeatherLangCode.toLowerCase();
    const mappedLang = langAliasToISO639[normalizedLang];
    return mappedLang && localNames[mappedLang]
      ? localNames[mappedLang]
      : location.name;
  }

  const [lang, setLang] = React.useState("en");

  React.useEffect(() => {
    if (!selectedLocation) return;

    const translatedName = getTranslatedCityName(selectedLocation, lang);
    setSelectedQuery(`${translatedName}, ${selectedLocation.country}`);
  }, [lang, selectedLocation]);

  const [locale, setLocale] = React.useState("en-US");

  React.useEffect(() => {
    setLocale(langAliasToBCP47[lang]);
  }, [lang]);

  const WEATHER_URL =
    selectedLocation !== null
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${
          selectedLocation.lat
        }&lon=${selectedLocation.lon}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }&units=metric&lang=${lang}`
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
        local.toLocaleDateString(locale, {
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
        <select
          className="p-2 border rounded my-2"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          {languages.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

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
                      const translatedName = getTranslatedCityName(
                        location,
                        lang
                      );
                      setSelectedLocation(location);
                      setQuery("");
                      setSelectedQuery(
                        `${translatedName}, ${location.country}`
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
