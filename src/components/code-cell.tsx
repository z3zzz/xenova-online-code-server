import { useState, useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import bundle from "../bundler";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions } from "../hooks";

interface CodeCellProps {
  data: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ data }) => {
  const { id, content } = data;
  const initialCode =
    "const root = document.querySelector('#root'); root.innerText = 'Hello World';";
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(content);
      setCode(output.code);
      setErr(output.err);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={initialCode}
            onChange={(value) => updateCell(id, value)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
