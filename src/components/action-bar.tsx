import { useActions } from "../hooks";
import IconButton from "./icon-button";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  const onClickUp = () => moveCell(id, "up");
  const onClickDown = () => moveCell(id, "down");
  const onClickDelete = () => deleteCell(id);

  return (
    <div>
      <IconButton onClick={onClickUp} type="up" />
      <IconButton onClick={onClickDown} type="down" />
      <IconButton onClick={onClickDelete} type="x" />
    </div>
  );
};

export default ActionBar;
