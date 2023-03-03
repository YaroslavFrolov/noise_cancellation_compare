import { NoiseSuppressionEffect } from "./rnnoiseJitsi";
import { StartButton } from "../StartButton";

export const RnnoiseJitsi = ({ isPlaying, setIsPlaying }) => {
  const handlerClick = () => {
    const effect = new NoiseSuppressionEffect();

    window.navigator.mediaDevices
      .getUserMedia({
        audio: { noiseSuppression: false, echoCancellation: false },
      })
      .then((stream) => {
        setIsPlaying("Jitsi");
        effect.startEffect(stream);
      });
  };

  return (
    <div>
      <h1>Test noise cancellation via rnnoise from Jitsi implementation</h1>
      <p>(wasm as base64 string in source code)</p>
      <br />
      <StartButton
        handlerClick={handlerClick}
        isPlaying={isPlaying}
        name="Jitsi"
      />
      <br />
      <br />
    </div>
  );
};
