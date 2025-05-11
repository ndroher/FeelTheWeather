import type { ISourceOptions } from "@tsparticles/engine";

export const clearSkyDayParticles: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    opacity: {
      value: { min: 0.3, max: 0.5 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    size: {
      value: {
        min: 0.5,
        max: 3,
      },
      animation: {
        enable: true,
        speed: 2,
        sync: false,
      },
    },
    number: {
      value: 40,
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
    },
    move: {
      direction: "none",
      enable: true,
      speed: 0.5,
      outModes: {
        default: "out",
      },
      straight: false,
    },
  },
};
