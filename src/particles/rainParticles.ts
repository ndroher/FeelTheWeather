import type { IOptions, RecursivePartial } from "@tsparticles/engine";

export function rainParticles(
  id: number,
  isNight: boolean
): RecursivePartial<IOptions> {
  const strokeColor = isNight ? "#b6dbed" : "#ffffff";

  let delay = 0.2;
  let quantity = 30;
  let speedMin = 30;
  let speedMax = 50;
  let sizeMin = 4;
  let sizeMax = 40;
  let animationSpeedMin = 60;
  let animationSpeedMax = 80;

  switch (id) {
    case 500: // light rain
    case 520: // light intensity shower rain
      delay = 0.3;
      quantity = 20;
      speedMin = 25;
      speedMax = 30;
      sizeMax = 25;
      animationSpeedMin = 35;
      animationSpeedMax = 55;
      break;

    case 501: // moderate rain
    case 521: // shower rain
    case 511: // freezing rain
      delay = 0.2;
      quantity = 32;
      speedMin = 35;
      speedMax = 45;
      sizeMax = 35;
      animationSpeedMin = 60;
      animationSpeedMax = 80;
      break;

    case 502: // heavy intensity rain
    case 522: // heavy intensity shower rain
      delay = 0.1;
      quantity = 60;
      speedMin = 40;
      speedMax = 55;
      sizeMax = 45;
      animationSpeedMin = 90;
      animationSpeedMax = 110;
      break;

    case 503: // very heavy rain
    case 531: // ragged shower rain
      delay = 0.1;
      quantity = 75;
      speedMin = 45;
      speedMax = 65;
      sizeMax = 50;
      animationSpeedMin = 115;
      animationSpeedMax = 135;
      break;

    case 504: // extreme rain
      delay = 0.1;
      quantity = 100;
      speedMin = 60;
      speedMax = 75;
      sizeMax = 60;
      animationSpeedMin = 140;
      animationSpeedMax = 160;
      break;

    default:
      break;
  }

  return {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      size: {
        value: { min: sizeMin, max: sizeMax },
        animation: {
          enable: true,
          speed: { min: animationSpeedMin, max: animationSpeedMax },
          startValue: "max",
          destroy: "min",
          sync: false,
        },
      },
      number: {
        value: 0,
      },
      shape: { type: "line" },
      move: {
        enable: true,
        direction: "bottom-right",
        speed: { min: speedMin, max: speedMax },
        straight: false,
        random: false,
        angle: {
          value: 10,
          offset: 1,
        },
        outModes: "destroy",
      },
      zIndex: {
        value: { min: 0, max: 100 },
        opacityRate: 2,
      },
      rotate: { path: true },
      stroke: {
        color: strokeColor,
        width: 2,
      },
      destroy: {
        mode: "split",
        split: {
          count: 1,
          factor: 1 / 3,
          rate: { value: 3 },
          particles: {
            stroke: {
              color: "#ffffff",
              width: 1,
            },
            opacity: {
              value: { min: 0, max: 1 },
              animation: {
                enable: true,
                speed: 0.7,
                startValue: "max",
                destroy: "min",
              },
            },
            shape: { type: "circle" },
            size: {
              value: 1,
            },
            move: {
              enable: true,
              speed: 2,
              random: true,
              straight: false,
              outModes: { default: "destroy" },
            },
          },
        },
      },
    },
    emitters: {
      direction: 69,
      position: {
        x: 30,
        y: 0,
      },
      rate: {
        quantity,
        delay,
      },
      size: {
        width: 150,
        height: 100,
      },
    },
  };
}
