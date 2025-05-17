import type { IOptions, RecursivePartial } from "@tsparticles/engine";

export function snowParticles(id: number): RecursivePartial<IOptions> {
  let snowIntensity = 200;
  let speed = 1.5;
  let size = { min: 4, max: 10 };

  if ([511, 600, 612, 620].includes(id)) {
    // light snow
    snowIntensity = 150;
    speed = 1.0;
    size = { min: 4, max: 8 };
  } else if ([601, 611, 613, 615, 616, 621].includes(id)) {
    // moderate snow
    snowIntensity = 240;
    speed = 2.0;
    size = { min: 5, max: 10 };
  } else if ([602, 622].includes(id)) {
    // heavy snow
    snowIntensity = 384;
    speed = 3.0;
    size = { min: 6, max: 12 };
  }

  return {
    fullScreen: { enable: true, zIndex: -1 },
    particles: {
      opacity: {
        value: { min: 0.5, max: 0.9 },
      },
      size: {
        value: size,
      },
      number: {
        value: snowIntensity,
        density: {
          enable: true,
        },
      },
      shape: {
        type: "image",
        options: {
          image: {
            src: "/images/snowflake.png",
          },
        },
      },
      move: {
        enable: true,
        direction: "bottom",
        speed: speed,
        outModes: "out",
        straight: false,
      },
      wobble: {
        enable: true,
        distance: 10,
        speed: 3,
      },
      zIndex: {
        value: { min: 0, max: 100 },
      },
      rotate: {
        value: { min: 0, max: 360 },
        direction: "random",
        animation: {
          enable: true,
          speed: 8,
          sync: false,
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "slow",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
      },
      modes: {
        slow: {
          factor: 5,
          radius: 150,
        },
        push: {
          quantity: 3,
        },
      },
    },
  };
}
