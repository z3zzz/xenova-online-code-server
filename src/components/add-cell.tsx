import "./add-cell.css";
import { useActions } from "../hooks";
import IconButton from "./icon-button";

interface AddCellProps {
  prevCellId: string | null;
  alwaysVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ prevCellId, alwaysVisible }) => {
  const { insertCellAfter } = useActions();

  const onClickAddCode = () => {
    insertCellAfter(prevCellId, "code");
  };

  const onClickAddText = () => {
    insertCellAfter(prevCellId, "text");
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
