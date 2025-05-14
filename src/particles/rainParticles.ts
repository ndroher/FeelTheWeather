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
  let opacityMin = 0.4;
  let opacityMax = 0.8;
  let emitterDirection = 69;
  let emitterWidth = 150;
  let emitterX = 30;
  let spread = 10;

  switch (id) {
    // Light Rain
    case 500:
    case 520:
    case 615: // light rain and snow
    case 200: // thunderstorm with light rain
      delay = 0.3;
      quantity = 20;
      speedMin = 25;
      speedMax = 30;
      sizeMax = 25;
      animationSpeedMin = 35;
      animationSpeedMax = 55;
      break;

    // Moderate Rain
    case 501:
    case 521:
    case 511: // freezing rain
    case 616: // rain and snow
    case 201: // thunderstorm with rain
      delay = 0.2;
      quantity = 32;
      speedMin = 35;
      speedMax = 45;
      sizeMax = 35;
      animationSpeedMin = 60;
      animationSpeedMax = 80;
      break;

    // Heavy Rain
    case 502:
    case 522:
    case 202: // thunderstorm with heavy rain
      delay = 0.1;
      quantity = 60;
      speedMin = 40;
      speedMax = 55;
      sizeMax = 45;
      animationSpeedMin = 90;
      animationSpeedMax = 110;
      break;

    // Very Heavy Rain
    case 503:
    case 531:
      delay = 0.1;
      quantity = 75;
      speedMin = 45;
      speedMax = 65;
      sizeMax = 50;
      animationSpeedMin = 115;
      animationSpeedMax = 135;
      break;

    // Extreme Rain
    case 504:
      delay = 0.1;
      quantity = 100;
      speedMin = 60;
      speedMax = 75;
      sizeMax = 60;
      animationSpeedMin = 140;
      animationSpeedMax = 160;
      break;

    // Light Drizzle
    case 300:
    case 310:
    case 230: // thunderstorm with light drizzle
      delay = 0.4;
      quantity = 10;
      speedMin = 8;
      speedMax = 12;
      sizeMin = 1;
      sizeMax = 8;
      animationSpeedMin = 20;
      animationSpeedMax = 30;
      opacityMin = 0.2;
      opacityMax = 0.4;
      emitterDirection = 90;
      emitterWidth = 200;
      emitterX = 50;
      spread = 30;
      break;

    // Drizzle
    case 301:
    case 311:
    case 313:
    case 321:
    case 231: // thunderstorm with drizzle
      delay = 0.35;
      quantity = 15;
      speedMin = 10;
      speedMax = 15;
      sizeMin = 2;
      sizeMax = 10;
      animationSpeedMin = 25;
      animationSpeedMax = 35;
      opacityMin = 0.3;
      opacityMax = 0.5;
      emitterDirection = 90;
      emitterWidth = 180;
      emitterX = 45;
      spread = 25;
      break;

    // Heavy Drizzle
    case 302:
    case 312:
    case 314:
    case 232: // thunderstorm with heavy drizzle
      delay = 0.25;
      quantity = 25;
      speedMin = 15;
      speedMax = 20;
      sizeMin = 2;
      sizeMax = 12;
      animationSpeedMin = 30;
      animationSpeedMax = 45;
      opacityMin = 0.4;
      opacityMax = 0.6;
      emitterDirection = 90;
      emitterWidth = 170;
      emitterX = 40;
      spread = 20;
      break;

    default:
      break;
  }

  return {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      opacity: {
        value: { min: opacityMin, max: opacityMax },
        animation: {
          enable: true,
          speed: 0.3,
          sync: false,
        },
      },
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
      number: { value: 0 },
      shape: { type: "line" },
      move: {
        enable: true,
        direction: "bottom-right",
        speed: { min: speedMin, max: speedMax },
        straight: false,
        random: false,
        angle: {
          value: spread,
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
            size: { value: 1 },
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
      direction: emitterDirection,
      position: {
        x: emitterX,
        y: 0,
      },
      rate: {
        quantity,
        delay,
      },
      size: {
        width: emitterWidth,
        height: 100,
      },
    },
  };
}
