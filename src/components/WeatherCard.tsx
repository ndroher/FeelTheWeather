import { getFlagEmoji } from "../utils/getFlagEmoji";
import { getUnitSymbol } from "../utils/getUnitSymbol";
import { WeatherData } from "../types/WeatherData";
import LocalTimeDisplay from "./LocalTimeDisplay";

type WeatherCardProps = {
  weatherData: WeatherData;
  selectedQuery: string[];
  units: string;
  locale: string;
  is12HourFormat: boolean;
};

const WeatherCard = ({
  weatherData,
  selectedQuery,
  units,
  locale,
  is12HourFormat,
}: WeatherCardProps) => {
  if (!weatherData) return null;

  return (
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
          {weatherData.main.temp} {getUnitSymbol(units)}
        </h1>
        <div className="flex items-center justify-center md:justify-end">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <h2 className="text-lg md:text-xl">
            {weatherData.weather[0].description}
          </h2>
        </div>
      </div>
      <div className="hidden md:block"></div>
      <LocalTimeDisplay
        timezoneOffset={weatherData.timezone}
        locale={locale}
        is12HourFormat={is12HourFormat}
      />
    </div>
  );
};

export default WeatherCard;
