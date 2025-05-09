export function getUnitSymbol(units: string): string {
  switch (units) {
    case "metric":
      return "°C";
    case "imperial":
      return "°F";
    default:
      return "";
  }
}
