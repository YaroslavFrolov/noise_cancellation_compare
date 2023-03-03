import { useState } from "react";

import { TestWasm } from "./TestWasm/TestWasm";
import { BrowserDefault } from "./BrowserDefault/BrowserDefault";
import { BrowserCustom } from "./BrowserCustom/BrowserCustom";
import { RnnoiseJitsi } from "./RnnoiseJitsi/RnnoiseJitsi";
import { RnnoiseTimTimWong } from "./RnnoiseTimTimWong/RnnoiseTimTimWong";
import { Krisp } from "./Krisp/Krisp";

import "./index.css";

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(null);

  return (
    <div>
      <TestWasm />
      <hr />
      <h1 className="head">Use headphones with mic</h1>
      <BrowserDefault isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <hr />
      <BrowserCustom isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <hr />
      <RnnoiseJitsi isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <hr />
      <RnnoiseTimTimWong isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <hr />
      <Krisp />
    </div>
  );
};
