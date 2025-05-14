import type { IOptions, RecursivePartial } from "@tsparticles/engine";

export function thunderstormParticles(
  id: number,
  screenSize: number
): RecursivePartial<IOptions> {
  let flashDelay = { min: 5, max: 10 };
  let flashOpacity = { min: 0.1, max: 0.4 };
  let flashColor = ["#ffffff", "#ffffcc"];

  if ([200, 210, 230].includes(id)) {
    // light thunderstorm
    flashDelay = { min: 6, max: 10 };
    flashOpacity = { min: 0.1, max: 0.3 };
    flashColor = ["#ffffee"];
  } else if ([201, 211, 231].includes(id)) {
    // moderate thunderstorm
    flashDelay = { min: 5, max: 9 };
    flashOpacity = { min: 0.2, max: 0.4 };
  } else if ([202, 212, 221, 232].includes(id)) {
    // heavy thunderstorm
    flashDelay = { min: 4, max: 8 };
    flashOpacity = { min: 0.3, max: 0.4 };
    flashColor = ["#ffffff", "#ffffcc", "#ffffee"];
  }

  return {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      number: {
        value: 0,
      },
    },
    emitters: [
      {
        rate: {
          quantity: 1,
          delay: flashDelay,
        },
        size: {
          width: 0,
          height: 0,
        },
        position: {
          x: 50,
          y: 50,
        },
        particles: {
          color: {
            value: flashColor,
          },
          opacity: {
            value: flashOpacity,
          },
          shape: {
            type: "square",
          },
          size: {
            value: screenSize,
          },
          move: {
            enable: false,
          },
          life: {
            duration: {
              sync: true,
              value: 0.1,
            },
            count: 2,
          },
        },
      },
    ],
  };
}
