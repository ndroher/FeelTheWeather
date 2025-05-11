import type { IOptions, RecursivePartial } from "@tsparticles/engine";

export function atmosphereParticles(id: number): RecursivePartial<IOptions> {
  const cleanSmokeIds = [701, 721, 741, 771];
  const sandSmokeIds = [711, 721, 731, 751, 761];
  const blackSmokeIds = [711, 762, 771];

  const imageOptions = [];

  if (cleanSmokeIds.includes(id)) {
    imageOptions.push({
      src: "src/assets/smoke-clean.png",
    });
  }
  if (sandSmokeIds.includes(id)) {
    imageOptions.push({
      src: "src/assets/smoke-sand.png",
    });
  }
  if (blackSmokeIds.includes(id)) {
    imageOptions.push({
      src: "src/assets/smoke-black.png",
    });
  }

  return {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      opacity: {
        value: {
          min: 0,
          max: 0.8,
        },
        animation: {
          enable: true,
          speed: 0.7,
          startValue: "min",
          destroy: "min",
        },
      },
      size: {
        value: {
          min: 64,
          max: 128,
        },
      },
      number: {
        value: 0,
      },
      shape: {
        type: "image",
        options: {
          image: imageOptions,
        },
      },
      move: {
        enable: true,
        direction: "top-right",
        speed: { min: 1, max: 4 },
        outModes: {
          default: "destroy",
        },
        straight: false,
        random: false,
        angle: {
          value: 0,
          offset: 45,
        },
      },
    },
    emitters: {
      direction: "top",
      position: {
        x: 40,
        y: 110,
      },
      rate: {
        quantity: 50,
        delay: 0.4,
      },
      size: {
        width: 110,
        height: 20,
      },
    },
  };
}
