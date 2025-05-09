export function getFlagEmoji(countryCode: string): string | null {
  if (!countryCode || countryCode.length !== 2) return null;
  const codePoints = [...countryCode.toUpperCase()].map(
    (c) => 127397 + c.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}
