import type { IOptions, RecursivePartial } from "@tsparticles/engine";

export function cloudParticles(id: number): RecursivePartial<IOptions> {
  let cloudIntensity = 30;

  switch (id) {
    case 801: //few clouds
      cloudIntensity = 10;
      break;

    case 802: //scattered clouds
      cloudIntensity = 20;
      break;

    case 803: //broken clouds
      cloudIntensity = 40;
      break;

    case 804: //overcast clouds
      cloudIntensity = 60;
      break;

    default:
      cloudIntensity = 30;
      break;
  }

  return {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      opacity: {
        value: { min: 0.3, max: 0.7 },
        animation: {
          enable: true,
          speed: 0.2,
          sync: false,
        },
      },
      size: {
        value: { min: 40, max: 120 },
        animation: {
          enable: true,
          speed: 5,
          sync: false,
        },
      },
      number: { value: cloudIntensity },
      shape: {
        type: "image",
        options: {
          image: {
            src: "src/assets/images/cloud.png",
          },
        },
      },

      move: {
        enable: true,
        direction: "right",
        speed: { min: 0.2, max: 0.8 },
        outModes: { default: "out" },
      },
    },
  };
}
