import React from "react";
import useFetch from "./useFetch";
import { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import ParticlesBackground from "./particles/ParticlesBackground";
import CustomSelect from "./components/customSelect";

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
  const [particlesLoaded, setParticlesLoaded] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      setParticlesLoaded(true);
    });
  }, []);

  const [query, setQuery] = React.useState("");
  const [selectedQuery, setSelectedQuery] = React.useState(["", "", ""]);
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
      : null;

  const suggestions = useFetch<GeocodingData[]>(GEOCODING_URL);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const suggestionBoxRef = React.useRef<HTMLDivElement>(null);

  const [showConfig, setShowConfig] = React.useState(false);
  const configRef = React.useRef<HTMLDivElement>(null);
  const configButtonRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(target)
      ) {
        setShowSuggestions(false);
      }

      if (
        configRef.current &&
        !configRef.current.contains(target) &&
        configButtonRef.current &&
        !configButtonRef.current.contains(target)
      ) {
        setShowConfig(false);
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
    setSelectedQuery([
      translatedName,
      selectedLocation.state ? selectedLocation.state : "",
      selectedLocation.country,
    ]);
  }, [lang, selectedLocation]);

  const [locale, setLocale] = React.useState("en-US");

  React.useEffect(() => {
    setLocale(langAliasToBCP47[lang]);
  }, [lang]);

  const [units, setUnits] = React.useState("metric");

  const WEATHER_URL =
    selectedLocation !== null
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${
          selectedLocation.lat
        }&lon=${selectedLocation.lon}&appid=${
          import.meta.env.VITE_OPENWEATHER_API_KEY
        }&units=${units}&lang=${lang}`
      : "";

  const weather = useFetch<WeatherData>(WEATHER_URL);

  const [localTime, setLocalTime] = React.useState("");
  const [localDate, setLocalDate] = React.useState("");
  const [is12HourFormat, setIs12HourFormat] = React.useState(false);

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
          hour12: is12HourFormat,
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
  }, [weather.data, is12HourFormat]);

  const unitsOptions = [
    { label: "Metric (°C)", value: "metric" },
    { label: "Imperial (°F)", value: "imperial" },
  ];

  const hourFormatOptions = [
    { label: "12h", value: true },
    { label: "24h", value: false },
  ];

  function getUnitSymbol(units: string): string {
    switch (units) {
      case "metric":
        return "°C";
      case "imperial":
        return "°F";
      default:
        return "";
    }
  }

  function getFlagEmoji(countryCode: string): string | null {
    if (!countryCode || countryCode.length !== 2) return null;
    const codePoints = [...countryCode.toUpperCase()].map(
      (c) => 127397 + c.charCodeAt(0)
    );
    return String.fromCodePoint(...codePoints);
  }

  //const [icon, setIcon] = React.useState<string | undefined>(undefined);
  const [weatherId, setWeatherId] = React.useState<number | undefined>(
    undefined
  );
  const [isNight, setIsNight] = React.useState(false);

  React.useEffect(() => {
    if (weather.data?.weather?.[0]?.icon) {
      //setIcon(weather.data.weather[0].icon);
      setIsNight(weather.data.weather[0].icon.endsWith("n"));
    }
    if (weather.data?.weather?.[0]?.id) {
      setWeatherId(weather.data.weather[0].id);
    }
  }, [weather.data]);

  return (
    <>
      {/* Day gradient */}
      <div
        className={`fixed inset-0 -z-20 transition-opacity duration-2000 ease-in-out ${
          isNight ? "opacity-0" : "opacity-100"
        } bg-gradient-to-b from-sky-200 to-blue-400`}
      />

      {/* Night gradient */}
      <div
        className={`fixed inset-0 -z-20 transition-opacity duration-2000 ease-in-out ${
          isNight ? "opacity-100" : "opacity-0"
        } bg-gradient-to-b from-[#070B34] to-[#483475]`}
      />

      {particlesLoaded && weatherId && <ParticlesBackground id={weatherId} />}

      <div className="h-full flex items-center justify-center">
        <section
          className={`${
            isNight ? "text-white" : "text-black"
          } p-8 max-w-xl md:max-w-2xl md:min-w-xl transition-colors duration-2000`}
        >
          <div className="relative" ref={suggestionBoxRef}>
            <div className="flex gap-2">
              <input
                className="placeholder-slate-500 px-4 py-2 w-full rounded glass glass-hover-shadow"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                  setShowConfig(false);
                }}
                placeholder="Search"
              />
              <div
                ref={configButtonRef}
                className="p-2 rounded cursor-pointer glass glass-hover-shadow"
                onClick={() => {
                  setShowConfig((prev) => !prev);
                  setShowSuggestions(false);
                }}
              >
                ⚙️
              </div>
            </div>
            {suggestions.data && showSuggestions && (
              <ul className="absolute z-10 glass w-full rounded mt-1 shadow">
                {suggestions.loading && (
                  <li className="px-4 py-2 text-slate-500">Loading...</li>
                )}
                {suggestions.error && (
                  <li className="px-4 py-2 text-slate-500">
                    Error: {suggestions.error}
                  </li>
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
                        className="px-4 py-2 glass-hover rounded cursor-pointer"
                        onClick={() => {
                          const translatedName = getTranslatedCityName(
                            location,
                            lang
                          );
                          setSelectedLocation(location);
                          setQuery("");
                          setSelectedQuery([
                            translatedName,
                            location.state ? location.state : "",
                            location.country,
                          ]);
                          setShowSuggestions(false);
                        }}
                      >
                        {location.name},{" "}
                        {location.state ? `${location.state},` : ""}{" "}
                        {location.country}
                      </li>
                    ))
                  : !suggestions.loading && (
                      <li className="px-4 py-2 text-slate-500">Not Found</li>
                    )}
              </ul>
            )}

            {showConfig && (
              <div
                ref={configRef}
                className="flex flex-col absolute z-10 glass rounded mt-1 shadow p-4 right-0"
              >
                {/* lang */}
                <CustomSelect
                  options={languages}
                  value={lang}
                  onChange={setLang}
                  setOpen={setOpen}
                />

                {/* units */}
                <div
                  className={`${
                    open ? "invisible h-0" : "visible h-auto mt-6"
                  }`}
                >
                  {unitsOptions.map(({ label, value }, index) => (
                    <label
                      key={value}
                      className={`text-nowrap cursor-pointer py-2 px-4 ${
                        units === value
                          ? "bg-white/40"
                          : "bg-white/10 hover:bg-white/20"
                      } ${index === 0 ? "rounded-l" : "rounded-r"}`}
                    >
                      <input
                        type="radio"
                        name="units"
                        value={value}
                        checked={units === value}
                        onChange={() => setUnits(value)}
                        hidden
                      />
                      {label}
                    </label>
                  ))}
                </div>

                {/* hour */}
                <div
                  className={`${
                    open ? "invisible h-0" : "visible h-auto mt-6"
                  }`}
                >
                  {hourFormatOptions.map(({ label, value }, index) => (
                    <label
                      key={String(value)}
                      className={`text-nowrap cursor-pointer py-2 px-4 ${
                        is12HourFormat === value
                          ? "bg-white/40"
                          : "bg-white/10 hover:bg-white/20"
                      } ${index === 0 ? "rounded-l" : "rounded-r"}`}
                    >
                      <input
                        type="radio"
                        name="is12HourFormat"
                        value={String(value)}
                        checked={is12HourFormat === value}
                        onChange={() => setIs12HourFormat(value)}
                        hidden
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {weather.loading && <div className="mt-4">Loading...</div>}

          {weather.data && (
            <div className="mt-4 p-8 glass rounded-xl flex flex-col gap-6 items-center justify-center md:grid md:grid-cols-2 md:gap-4 md:aspect-[4/3]">
              <div
                className={` ${
                  selectedQuery[0].includes(" ") ? "break-normal" : "break-all"
                } flex gap-2 items-center flex-col text-center md:text-start md:items-start md:self-start md:content-start"`}
              >
                <h1 className="text-2xl md:text-3xl">{selectedQuery[0]}</h1>
                {selectedQuery[1] && (
                  <h3 className="text-sm md:text-base">{selectedQuery[1]}</h3>
                )}
                <h3 className="text-xl md:text-2xl">
                  {getFlagEmoji(selectedQuery[2]) ?? "🏳️"}
                </h3>
              </div>
              <div className="flex flex-col text-center md:text-right md:justify-self-end md:self-start">
                <h1 className="text-4xl md:text-5xl">
                  {weather.data.main.temp} {getUnitSymbol(units)}
                </h1>
                <div className="flex items-center justify-center md:justify-end">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}.png`}
                    alt="Weather Icon"
                  />
                  <h2 className="text-lg md:text-xl">
                    {weather.data.weather[0].description}
                  </h2>
                </div>
              </div>
              <div className="hidden md:block"></div>
              <div className="flex flex-col text-center md:text-right md:justify-self-end md:self-end">
                <h2 className="text-xl md:text-2xl">{localTime}</h2>
                <h3 className="text-sm md:text-base">{localDate}</h3>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
