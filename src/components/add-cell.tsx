import "./add-cell.css";
import { useActions } from "../hooks";
import IconButton from "./icon-button";

interface AddCellProps {
  nextCellId: string | null;
  alwaysVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, alwaysVisible }) => {
  const { insertCellBefore } = useActions();

  const onClickAddCode = () => {
    insertCellBefore(nextCellId, "code");
  };

  const onClickAddText = () => {
    insertCellBefore(nextCellId, "text");
  };

  return (
    <div className={`add-cell ${alwaysVisible && "is-always-visible"}`}>
      <div className="add-buttons">
        <IconButton
          icon="+"
          onClick={onClickAddCode}
          buttonRound
          iconSmall
          extraText="Code"
        />
        <IconButton
          icon="+"
          onClick={onClickAddText}
          buttonRound
          iconSmall
          extraText="Text"
        />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
