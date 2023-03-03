import { StartButton } from "../StartButton";

export const BrowserDefault = ({ isPlaying, setIsPlaying }) => {
  const handlerClick = () => {
    window.navigator.mediaDevices
      .getUserMedia({
        audio: true,
        // audio: { noiseSuppression: false, echoCancellation: false },
      })
      .then((stream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(audioContext.destination);
        setIsPlaying("default");
      });
  };

  return (
    <div>
      <h1>Default browser settings</h1>
      <p>(noiseSuppression: true, echoCancellation: true)</p>
      <br />
      <StartButton
        handlerClick={handlerClick}
        isPlaying={isPlaying}
        name="default"
      />
      <br />
      <br />
    </div>
  );
};
