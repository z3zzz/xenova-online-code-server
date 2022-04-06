import * as esbuild from "esbuild-wasm";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { unpkgPathPlugin, fetchPlugin } from "./plugins";
import CodeEditor from "./components/code-editor";
import "./index.css";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const ref = useRef<any>();
  const iframe = useRef<any>();

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframe.current.srcdoc = iframeHTML;

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

    console.log({ result });
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, "*");
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

  const iframeHTML = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener("message", e => {
            try {
              eval(e.data)
            } catch (err) {
              const div = document.querySelector('#root')
              div.innerHTML = 
                '<div style="color: red;">' + 
                  '<h4>Runtime Error</h4>' + 
                  err + 
                '</div>'
              console.error(err)
            }
          }, false)
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor
        initialValue="const hello = 'world'"
        onChange={(value) => setInput(value)}
      />
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
      <iframe
        title="test"
        sandbox="allow-scripts"
        srcDoc={iframeHTML}
        ref={iframe}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
