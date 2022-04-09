import { useState } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  const initialCode = "console.log('hello')";
  const [input, setInput] = useState(initialCode);
  const [code, setCode] = useState("");

  const onClick = async () => {
    console.log({ input });
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="horizantal">
      <CodeEditor
        initialValue={initialCode}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </Resizable>
  );
};

export default CodeCell;
