import { useState } from "react";

export const TestWasm = () => {
  const [wasmInstance, setWasmInstance] = useState(null);

  const handlerLoad = async () => {
    const { instance } = await WebAssembly.instantiateStreaming(
      fetch("./myfib.wasm")
    );

    setWasmInstance(instance);
  };

  const handlerCalculate = () => {
    const fibC = wasmInstance.exports["_Z3fibi"];
    console.log("fibC:======", fibC);
    const result = fibC(24);
    console.log("result:=======", result);
  };

  return (
    <div className="fib">
      <h1>Test fibonachi from wasm module</h1>
      <button onClick={handlerLoad}>load module</button>
      <button onClick={handlerCalculate}>calculate fib</button>
      <br />
      <br />
    </div>
  );
};
