import { Howl } from "howler";

export interface WeatherSound {
  ids: number[];
  sounds: string[];
}

const weatherSoundMap: WeatherSound[] = [
  // rain
  { ids: [500, 520], sounds: ["rain_light.wav"] },
  { ids: [501, 521], sounds: ["rain_moderate.wav"] },
  { ids: [511], sounds: ["rain_moderate.wav", "snow.mp3"] },
  { ids: [502, 503, 522, 531], sounds: ["rain_heavy.mp3"] },
  { ids: [504], sounds: ["rain_extreme.mp3"] },

  // drizzle
  { ids: [300, 301, 310, 321], sounds: ["drizzle.mp3"] },
  { ids: [302, 311, 313], sounds: ["rain_light.wav"] },
  { ids: [312, 314], sounds: ["rain_moderate.wav"] },

  // thunderstorm
  { ids: [200], sounds: ["thunder_light.mp3", "rain_light.wav"] },
  { ids: [201], sounds: ["thunder.mp3", "rain_moderate.wav"] },
  { ids: [202], sounds: ["thunder_heavy.mp3", "rain_heavy.mp3"] },
  { ids: [210], sounds: ["thunder_light.mp3"] },
  { ids: [211], sounds: ["thunder.mp3"] },
  { ids: [221], sounds: ["thunder_heavy.mp3"] },
  { ids: [230], sounds: ["thunder_light.mp3", "drizzle.mp3"] },
  { ids: [231, 232], sounds: ["thunder.mp3", "rain_light.wav"] },

  // snow
  { ids: [600, 620], sounds: ["snow.mp3"] },
  { ids: [615], sounds: ["melting_snow.mp3"] },
  { ids: [601, 621], sounds: ["snow.mp3"] },
  { ids: [616], sounds: ["snow.mp3", "rain_moderate.wav"] },
  { ids: [602, 622], sounds: ["snow_heavy.wav"] },
  { ids: [611, 612, 613], sounds: ["sleet.mp3"] },

  // clouds
  { ids: [801, 802], sounds: ["breeze1_day.mp3"] },
  { ids: [803, 804], sounds: ["breeze2_day.mp3"] },
  { ids: [801, 802], sounds: ["breeze1_night.mp3"] },
  { ids: [803, 804], sounds: ["breeze2_night.mp3"] },

  // clear
  { ids: [800], sounds: ["calm_day.wav"] },
  { ids: [800], sounds: ["calm_night.wav"] },

  // atmosphere
  { ids: [701, 741], sounds: ["foggy_wind.wav"] },
  { ids: [711, 721], sounds: ["haze_wind.mp3"] },
  { ids: [731, 751, 761], sounds: ["dust_wind.wav"] },
  { ids: [762], sounds: ["volcanic.mp3"] },
  { ids: [771], sounds: ["gusts.mp3"] },
  { ids: [781], sounds: ["tornado.mp3"] },
];

let activeSounds: Howl[] = [];
let isMuted = localStorage.getItem("isMuted") === "true";
let previousVolume = parseFloat(localStorage.getItem("volume") || "0.6");
let currentVolume = isMuted ? 0 : previousVolume;

export function playWeatherSounds(id: number, isNight: boolean) {
  stopAllSounds();

  const preferredMatch = weatherSoundMap.find(
    (entry) =>
      entry.ids.includes(id) &&
      entry.sounds.some((s) =>
        isNight ? s.includes("_night") : s.includes("_day")
      )
  );

  const fallbackMatch = weatherSoundMap.find((entry) => entry.ids.includes(id));
  const match = preferredMatch || fallbackMatch;
  if (!match) return;

  activeSounds = match.sounds.map((soundFile) => {
    const sound = new Howl({
      src: [`/sounds/${soundFile}`],
      loop: true,
      volume: isMuted ? 0 : currentVolume,
    });
    sound.play();
    return sound;
  });
}

export function setVolume(volume: number) {
  currentVolume = volume;
  previousVolume = volume;
  localStorage.setItem("volume", volume.toString());
  if (!isMuted) {
    activeSounds.forEach((sound) => sound.volume(currentVolume));
  }
}

export function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem("isMuted", String(isMuted));
  if (isMuted) {
    activeSounds.forEach((sound) => sound.volume(0));
  } else {
    activeSounds.forEach((sound) => sound.volume(previousVolume));
  }
}

export function stopAllSounds() {
  activeSounds.forEach((sound) => sound.stop());
  activeSounds = [];
}

export function fadeOutAllSounds(duration = 1000) {
  activeSounds.forEach((sound) => sound.fade(sound.volume(), 0, duration));
  setTimeout(() => stopAllSounds(), duration);
}
