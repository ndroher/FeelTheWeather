import React from "react";

interface LocalTimeDisplayProps {
  timezoneOffset: number;
  locale: string;
  is12HourFormat: boolean;
}

const LocalTimeDisplay: React.FC<LocalTimeDisplayProps> = ({
  timezoneOffset,
  locale,
  is12HourFormat,
}) => {
  const [localTime, setLocalTime] = React.useState("");
  const [localDate, setLocalDate] = React.useState("");

  React.useEffect(() => {
    const updateLocalTimeAndDate = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utc + timezoneOffset * 1000);

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
          month: "long",
          day: "2-digit",
          //year: "numeric",
        })
      );
    };

    updateLocalTimeAndDate();
    const interval = setInterval(updateLocalTimeAndDate, 1000);

    return () => clearInterval(interval);
  }, [timezoneOffset, locale, is12HourFormat]);

  return (
    <div className="flex flex-col text-center md:text-right md:justify-self-end md:self-end">
      <h2 className="text-xl md:text-2xl">{localTime}</h2>
      <h3 className="text-sm md:text-base">{localDate}</h3>
    </div>
  );
};

export default LocalTimeDisplay;
