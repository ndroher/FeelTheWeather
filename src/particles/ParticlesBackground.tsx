import React from "react";
import Particles from "@tsparticles/react";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";
// import { thunderstormParticles } from "./thunderstormParticles";
// import { rainParticles } from "./rainParticles";
// import { drizzleParticles } from "./drizzleParticles";
import { snowParticles } from "./snowParticles";
import { cloudParticles } from "./cloudParticles";
// import { mistParticles } from "./mistParticles";
import { clearSkyDayParticles } from "./clearSkyDayParticles";
import { clearSkyNightParticles } from "./clearSkyNightParticles";

interface Props {
  id: number;
  isNight: boolean;
}

const ParticlesBackground = React.memo(function ParticlesBackground({
  id,
  isNight,
}: Props) {
  const layers: RecursivePartial<IOptions>[] = React.useMemo(() => {
    const layerConfigs: RecursivePartial<IOptions>[] = [];

    const thunderstormIds = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
    const rainIds = [
      500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 200, 201, 202, 615, 616,
    ];
    const drizzleIds = [
      300, 301, 302, 310, 311, 312, 313, 314, 321, 230, 231, 232,
    ];
    const snowIds = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622];
    const cloudIds = [801, 802, 803, 804];
    const mistIds = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    const clearSkyIds = [800];

    // if (thunderstormIds.includes(id)) layerConfigs.push(thunderstormParticles(id));
    // if (rainIds.includes(id)) layerConfigs.push(rainParticles(id));
    // if (drizzleIds.includes(id)) layerConfigs.push(drizzleParticles(id));
    if (snowIds.includes(id)) layerConfigs.push(snowParticles(id));
    if (cloudIds.includes(id)) layerConfigs.push(cloudParticles(id));
    // if (mistIds.includes(id)) layerConfigs.push(mistParticles(id));
    if (clearSkyIds.includes(id) && !isNight)
      layerConfigs.push(clearSkyDayParticles);
    if (clearSkyIds.includes(id) && isNight)
      layerConfigs.push(clearSkyNightParticles);

    return layerConfigs;
  }, [id]);

  return (
    <>
      {layers.map((layer, index) => (
        <Particles
          key={`particles-${index}`}
          id={`particles-${index}`}
          options={layer}
        />
      ))}
    </>
  );
});

export default ParticlesBackground;
