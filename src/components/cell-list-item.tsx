import { Cell } from "../state";
import CodeCell from "./code-cell";
import MarkDownEditor from "./markdown-editor";

interface CellListItemProps {
  data: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ data }) => {
  const { type, content } = data;
  const isCodeCell = type === "code";
  const isTextCell = type === "text";
  return (
    <div>
      {isCodeCell && <CodeCell data={data} />}
      {isTextCell && <MarkDownEditor initialValue={content} />}
    </div>
  );
};

export default CellListItem;
