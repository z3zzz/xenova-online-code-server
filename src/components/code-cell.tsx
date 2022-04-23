import { useEffect } from "react";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { Cell } from "../state";
import { useActions, useTypedSelector } from "../hooks";
import { initialCode } from "../state";
import "./code-cell.css";

interface CodeCellProps {
  data: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ data }) => {
  const { id, content } = data;
  const { updateCell, createBundle } = useActions();

  const cumulativeCode = useTypedSelector((state) => {
    const { order, data } = state.cells;

    const targetCellCodes = [];
    for (let cellId of order) {
      if (data[cellId].type === "text") {
        continue;
      }

      targetCellCodes.push(data[cellId].content);

      if (cellId === id) {
        break;
      }
    }

    const resultCode = targetCellCodes.join("\n");

    return resultCode;
  });

  const bundle = useTypedSelector((state) => state.bundles[id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }

    const timer = setTimeout(() => {
      createBundle(id, cumulativeCode);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, createBundle]);

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
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
