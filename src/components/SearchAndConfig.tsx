import React from "react";
import CustomSelect from "./CustomSelect";
import { languages } from "../constants/languages";
import { getTranslatedCityName } from "../utils/getTranslatedCityName";
import { hourFormatOptions } from "../constants/hourFormatOptions";
import { unitsOptions } from "../constants/unitsOptions";
import { setVolume, toggleMute } from "../utils/soundManager";
import GlassRange from "./GlassRange";

type SearchAndConfigProps = {
  query: string;
  setQuery: (val: string) => void;
  suggestions: {
    data: any[] | null;
    loading: boolean;
    error: string | null;
  };
  setSelectedLocation: (val: any) => void;
  setSelectedQuery: (val: string[]) => void;
  lang: string;
  setLang: (val: string) => void;
  units: string;
  setUnits: (val: string) => void;
  is12HourFormat: boolean;
  setIs12HourFormat: (val: boolean) => void;
};

const SearchAndConfig = ({
  query,
  setQuery,
  suggestions,
  setSelectedLocation,
  setSelectedQuery,
  lang,
  setLang,
  units,
  setUnits,
  is12HourFormat,
  setIs12HourFormat,
}: SearchAndConfigProps) => {
  const suggestionBoxRef = React.useRef<HTMLDivElement>(null);
  const configButtonRef = React.useRef<HTMLDivElement>(null);
  const configRef = React.useRef<HTMLDivElement>(null);

  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showConfig, setShowConfig] = React.useState(false);
  const [showLangOptions, setShowLangOptions] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }

      if (
        configButtonRef.current &&
        !configButtonRef.current.contains(event.target as Node) &&
        configRef.current &&
        !configRef.current.contains(event.target as Node)
      ) {
        setShowConfig(false);
        setShowLangOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [volume, setLocalVolume] = React.useState(() => {
    const stored = localStorage.getItem("volume");
    return stored ? parseFloat(stored) : 0.6;
  });

  const [muted, setMuted] = React.useState(() => {
    return localStorage.getItem("isMuted") === "true";
  });

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLocalVolume(newVolume);
    localStorage.setItem("volume", String(newVolume));
    setVolume(newVolume);
  };

  const handleToggleMute = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    localStorage.setItem("isMuted", String(newMuted));
    toggleMute();
  };

  return (
    <div className="relative" ref={suggestionBoxRef}>
      <div className="flex gap-4 items-center">
        <input
          className="placeholder-slate-500 px-4 py-2 w-full rounded glass glass-hover-shadow"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
            setShowConfig(false);
            setShowLangOptions(false);
          }}
          placeholder="Search"
          name="search"
        />
        <div
          ref={configButtonRef}
          className="rounded cursor-pointer glass glass-hover-shadow py-2 px-3"
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
                  {location.name}, {location.state ? `${location.state},` : ""}{" "}
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
            setOpen={setShowLangOptions}
          />

          {/* units */}
          <div
            className={`${
              showLangOptions ? "invisible h-0" : "visible h-auto flex mt-4"
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
              showLangOptions ? "invisible h-0" : "visible h-auto flex mt-4"
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

          {/* volume */}
          <div
            className={`${
              showLangOptions ? "invisible h-0" : "visible h-auto flex mt-4"
            } flex items-center gap-2`}
          >
            <button
              onClick={handleToggleMute}
              className="p-2 rounded-full cursor-pointer"
            >
              {muted ? "🔇" : "🔊"}
            </button>
            <GlassRange value={volume} onChange={handleVolumeChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndConfig;
