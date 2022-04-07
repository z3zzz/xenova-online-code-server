import "bulmaswatch/superhero/bulmaswatch.min.css";
import * as esbuild from "esbuild-wasm";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin, fetchPlugin } from "./plugins";
import CodeEditor from "./components/code-editor";
import Preview from "./components/preview";
import "./index.css";

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
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    setCode(result.outputFiles[0].text);
  };

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
    console.log({ esbuildService: ref.current });
  };

  useEffect(() => {
    if (inputRef.current === null) {
      return;
    }
    inputRef.current.focus();
    startService();
  }, []);

  return (
    <div>
      <CodeEditor
        initialValue="const hello = 'world'"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
