import { Cell } from "../state";
import CodeCell from "./code-cell";
import MarkDownEditor from "./markdown-editor";
import ActionBar from "./action-bar";
import "./cell-list-item.css";

interface CellListItemProps {
  data: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ data }) => {
  const { id, type } = data;
  const isCodeCell = type === "code";

  return (
    <div className="cell-list-item">
      {isCodeCell && (
        <>
          <ActionBar id={id} withWrapper />
          <CodeCell data={data} />
        </>
      )}
      {!isCodeCell && (
        <>
          <MarkDownEditor data={data} />
          <ActionBar id={id} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
