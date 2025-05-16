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
      value: ["#ffffff", "#fffee9", "#fffbc8"],
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
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "bubble",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      bubble: {
        distance: 150,
        size: 6,
        opacity: 0.5,
        duration: 4,
        speed: 0.5,
      },
      push: {
        quantity: 3,
      },
    },
  },
};
