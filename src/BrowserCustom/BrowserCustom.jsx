import { StartButton } from "../StartButton";

export const BrowserCustom = ({ isPlaying, setIsPlaying }) => {
  const handlerClick = () => {
    window.navigator.mediaDevices
      .getUserMedia({
        audio: { noiseSuppression: false, echoCancellation: false },
      })
      .then((stream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(audioContext.destination);
        setIsPlaying("custom");
      });
  };

  return (
    <div>
      <h1>Custom browser settings</h1>
      <p>(noiseSuppression: false, echoCancellation: false)</p>
      <br />
      <StartButton
        handlerClick={handlerClick}
        isPlaying={isPlaying}
        name="custom"
      />
      <br />
      <br />
    </div>
  );
};
