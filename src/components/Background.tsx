import ParticlesBackground from "../particles/ParticlesBackground";

type BackgroundProps = {
  isNight: boolean;
  particlesLoaded: boolean;
  weatherId: number | undefined;
};

const Background = ({
  isNight,
  particlesLoaded,
  weatherId,
}: BackgroundProps) => {
  return (
    <>
      {/* Day gradient */}
      <div
        className={`fixed inset-0 -z-20 transition-opacity duration-2000 ease-in-out ${
          isNight ? "opacity-0" : "opacity-100"
        } bg-gradient-to-b from-sky-200 to-blue-400`}
      />

      {/* Night gradient */}
      <div
        className={`fixed inset-0 -z-20 transition-opacity duration-2000 ease-in-out ${
          isNight ? "opacity-100" : "opacity-0"
        } bg-gradient-to-b from-[#070B34] to-[#483475]`}
      />

      {/* Particles */}
      {particlesLoaded && weatherId && (
        <ParticlesBackground id={weatherId} isNight={isNight} />
      )}
    </>
  );
};

export default Background;
