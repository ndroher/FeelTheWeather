import React from "react";
import Particles from "@tsparticles/react";
import type { IOptions, RecursivePartial } from "@tsparticles/engine";
import { thunderstormParticles } from "./thunderstormParticles";
import { rainParticles } from "./rainParticles";
import { snowParticles } from "./snowParticles";
import { cloudParticles } from "./cloudParticles";
import { atmosphereParticles } from "./atmosphereParticles";
import { clearSkyDayParticles } from "./clearSkyDayParticles";
import { clearSkyNightParticles } from "./clearSkyNightParticles";

interface Props {
  id: number;
  isNight: boolean;
}

function getScreenSize() {
  return Math.max(window.innerWidth, window.innerHeight) * 1.5;
}

const ParticlesBackground = React.memo(function ParticlesBackground({
  id,
  isNight,
}: Props) {
  const thunderstormIds = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232];
  const rainIds = [
    500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 200, 201, 202, 615, 616,
  ];
  const drizzleIds = [
    300, 301, 302, 310, 311, 312, 313, 314, 321, 230, 231, 232,
  ];
  const snowIds = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622, 511];
  const cloudIds = [801, 802, 803, 804];
  const atmosphereIds = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
  const clearSkyIds = [800];

  const needsScreenSize = thunderstormIds.includes(id);
  const [screenSize, setScreenSize] = React.useState(
    needsScreenSize ? getScreenSize() : 0
  );

  React.useEffect(() => {
    if (!needsScreenSize) return;

    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [needsScreenSize]);

  const layers: RecursivePartial<IOptions>[] = React.useMemo(() => {
    const layerConfigs: RecursivePartial<IOptions>[] = [];

    if (thunderstormIds.includes(id))
      layerConfigs.push(thunderstormParticles(id, screenSize));
    if (rainIds.includes(id) || drizzleIds.includes(id))
      layerConfigs.push(rainParticles(id, isNight));
    if (snowIds.includes(id)) layerConfigs.push(snowParticles(id));
    if (cloudIds.includes(id)) layerConfigs.push(cloudParticles(id));
    if (atmosphereIds.includes(id)) layerConfigs.push(atmosphereParticles(id));
    if (clearSkyIds.includes(id) && !isNight)
      layerConfigs.push(clearSkyDayParticles);
    if (clearSkyIds.includes(id) && isNight)
      layerConfigs.push(clearSkyNightParticles);

    return layerConfigs;
  }, [id, isNight, ...(needsScreenSize ? [screenSize] : [])]);

  return (
    <>
      {layers.map((layer, index) => (
        <Particles
          key={`particles-${index}${needsScreenSize ? `-${screenSize}` : ""}`}
          id={`particles-${index}`}
          options={layer}
        />
      ))}
    </>
  );
});

export default ParticlesBackground;
