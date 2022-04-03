import * as esbuild from "esbuild-wasm";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin } from "./unpkg";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const ref = useRef<any>();
  const onClick = async () => {
    if (!ref.current) {
      return;
    }
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    console.log({ result });
    setCode(result.outputFiles[0].text);
  };
  useEffect(() => {
    if (inputRef.current === null) {
      return;
    }
    inputRef.current.focus();
    startService();
  }, []);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    console.log({ esbuildService: ref.current });
  };

  return (
    <div>
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
