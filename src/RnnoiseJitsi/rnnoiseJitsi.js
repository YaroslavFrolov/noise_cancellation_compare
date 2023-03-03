/**
 * Class Implementing the effect interface expected by a JitsiLocalTrack.
 * Effect applies rnnoise denoising on a audio JitsiLocalTrack.
 */
export class NoiseSuppressionEffect {
  /**
   * Web audio context.
   */
  _audioContext;

  /**
   * Source that will be attached to the track affected by the effect.
   */
  _audioSource;

  /**
   * Destination that will contain denoised audio from the audio worklet.
   */
  _audioDestination;

  /**
   * `AudioWorkletProcessor` associated node.
   */
  _noiseSuppressorNode;

  /**
   * Audio track extracted from the original MediaStream to which the effect is applied.
   */
  _originalMediaTrack;

  /**
   * Noise suppressed audio track extracted from the media destination node.
   */
  _outputMediaTrack;

  /**
   * Effect interface called by source JitsiLocalTrack.
   * Applies effect that uses a {@code NoiseSuppressor} service initialized with {@code RnnoiseProcessor}
   * for denoising.
   *
   * @param {MediaStream} audioStream - Audio stream which will be mixed with _mixAudio.
   * @returns {MediaStream} - MediaStream containing both audio tracks mixed together.
   */
  async startEffect(audioStream) {
    // this._originalMediaTrack = audioStream.getAudioTracks()[0];
    this._audioContext = new AudioContext();
    this._audioSource = this._audioContext.createMediaStreamSource(audioStream);
    // this._audioDestination = this._audioContext.createMediaStreamDestination();
    this._audioDestination = this._audioContext.destination;
    // this._outputMediaTrack = this._audioDestination.stream.getAudioTracks()[0];

    // const baseUrl = `${getBaseUrl()}libs/`;
    // const workletUrl = `${baseUrl}noise-suppressor-worklet.min.js`;

    // Connect the audio processing graph MediaStream -> AudioWorkletNode -> MediaStreamAudioDestinationNode
    this._audioContext.audioWorklet
      .addModule("./NoiseSuppressorWorklet.js")
      .then(() => {
        // After the resolution of module loading, an AudioWorkletNode can be constructed.
        this._noiseSuppressorNode = new AudioWorkletNode(
          this._audioContext,
          "NoiseSuppressorWorklet"
        );
        this._audioSource
          .connect(this._noiseSuppressorNode)
          .connect(this._audioDestination);
      })
      .catch((error) => {
        console.error("Error while adding audio worklet module: ", error);
      });

    // Sync the effect track muted state with the original track state.
    // this._outputMediaTrack.enabled = this._originalMediaTrack.enabled;

    // We enable the audio on the original track because mute/unmute action will only affect the audio destination
    // output track from this point on.
    // this._originalMediaTrack.enabled = true;

    return this._audioDestination.stream;
  }

  /**
   * Clean up resources acquired by noise suppressor and rnnoise processor.
   *
   * @returns {void}
   */
  stopEffect() {
    // Sync original track muted state with effect state before removing the effect.
    // this._originalMediaTrack.enabled = this._outputMediaTrack.enabled;

    // Technically after this process the Audio Worklet along with it's resources should be garbage collected,
    // however on chrome there seems to be a problem as described here:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1298955
    this._noiseSuppressorNode?.port?.close();
    this._audioDestination?.disconnect();
    this._noiseSuppressorNode?.disconnect();
    this._audioSource?.disconnect();
    this._audioContext?.close();
  }
}
