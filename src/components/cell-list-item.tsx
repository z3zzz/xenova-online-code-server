import { Cell } from "../state";
import CodeCell from "./code-cell";
import MarkDownEditor from "./markdown-editor";
import ActionBar from "./action-bar";

interface CellListItemProps {
  data: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ data }) => {
  const { id, type } = data;
  const isCodeCell = type === "code";
  const isTextCell = type === "text";
  return (
    <div>
      <ActionBar id={id} />
      {isCodeCell && <CodeCell data={data} />}
      {isTextCell && <MarkDownEditor data={data} />}
    </div>
  );
};

export default CellListItem;
