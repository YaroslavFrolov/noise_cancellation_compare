import { StartButton } from "../StartButton";

class RNNoiseNode extends AudioWorkletNode {
  constructor(context, rnnoiseWasmModule) {
    super(context, "rnnoiseWorklet", {
      channelCountMode: "explicit",
      channelCount: 1,
      channelInterpretation: "speakers",
      numberOfInputs: 1,
      numberOfOutputs: 1,
      outputChannelCount: [1],
      processorOptions: {
        module: rnnoiseWasmModule,
      },
    });
    this.port.onmessage = ({ data }) => {
      const e = Object.assign(new Event("status"), data);
      this.dispatchEvent(e);
      if (this.onstatus) this.onstatus(e);
    };
  }

  update(keepalive) {
    this.port.postMessage(keepalive);
  }
}

export const RnnoiseTimTimWong = ({ isPlaying, setIsPlaying }) => {
  const handlerClick = async () => {
    window.navigator.mediaDevices
      .getUserMedia({
        audio: { noiseSuppression: false, echoCancellation: false },
      })
      .then(async (stream) => {
        setIsPlaying("Tim");
        const audioContext = new AudioContext();
        // const rnnoiseWasmModule = await WebAssembly.compileStreaming(
        const { module } = await WebAssembly.instantiateStreaming(
          fetch("./rnnoise-processor.wasm")
        );
        await audioContext.audioWorklet.addModule("./rnnoiseWorklet.js");
        const source = audioContext.createMediaStreamSource(stream);
        const rnnoise = new RNNoiseNode(audioContext, module);
        source.connect(rnnoise).connect(audioContext.destination);
      });
  };

  return (
    <div>
      <h1>
        Test noise cancellation via rnnoise from Tim Tim Wong implementation
      </h1>
      <p>(native wasm by fetching from public folder)</p>
      <br />
      <StartButton
        handlerClick={handlerClick}
        isPlaying={isPlaying}
        name="Tim"
      />
      <br />
      <br />
    </div>
  );
};
