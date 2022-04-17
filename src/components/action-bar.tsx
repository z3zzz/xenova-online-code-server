import { useActions } from "../hooks";
import IconButton from "./icon-button";
import "./action-bar.css";

interface ActionBarProps {
  id: string;
  withWrapper?: boolean;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, withWrapper }) => {
  const { moveCell, deleteCell } = useActions();

  const onClickUp = () => moveCell(id, "up");
  const onClickDown = () => moveCell(id, "down");
  const onClickDelete = () => deleteCell(id);

  const wrapperClassName = withWrapper ? "action-bar-wrapper" : "";

  return (
    <div className={wrapperClassName}>
      <div className="action-bar">
        <IconButton onClick={onClickUp} type="up" />
        <IconButton onClick={onClickDown} type="down" />
        <IconButton onClick={onClickDelete} type="x" />
      </div>
    </div>
  );
};

export default ActionBar;
