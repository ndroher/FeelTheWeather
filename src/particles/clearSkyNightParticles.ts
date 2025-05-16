import type { ISourceOptions } from "@tsparticles/engine";

export const clearSkyNightParticles: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  particles: {
    opacity: {
      value: { min: 0.3, max: 0.7 },
      animation: {
        enable: true,
        speed: 0.4,
        sync: false,
      },
    },
    size: {
      value: {
        min: 1,
        max: 4,
      },
    },
    number: {
      value: 40,
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "star",
      options: {
        star: {
          sides: 5,
        },
      },
    },
    move: {
      direction: "left",
      enable: true,
      speed: 1,
      outModes: {
        default: "out",
      },
      straight: true,
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
        distance: 100,
        size: 6,
        opacity: 0.9,
        duration: 4,
        speed: 0.5,
      },
      push: {
        quantity: 1,
      },
    },
  },
};
