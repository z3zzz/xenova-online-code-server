import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions, useTypedSelector } from "../hooks";

interface CodeCellProps {
  data: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ data }) => {
  const { id, content } = data;
  const initialCode =
    "const root = document.querySelector('#root'); root.innerText = 'Hello World';";

  const bundle = useTypedSelector((state) => state.bundles[id]);

  const { updateCell, createBundle } = useActions();

  useEffect(() => {
    const timer = setTimeout(() => {
      createBundle(id, content);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [content, id, createBundle]);

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
        {bundle && <Preview code={bundle.code} err={bundle.err} />}
      </div>
    </Resizable>
  );
};

export default CodeCell;
