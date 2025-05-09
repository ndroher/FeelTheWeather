import { GeocodingData } from "../types/GeocodingData";
import { langAliasToISO639 } from "../constants/langAliasToISO639";

export function getTranslatedCityName(
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
