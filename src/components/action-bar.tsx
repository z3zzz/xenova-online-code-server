import { useActions } from "../hooks";

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
      <button onClick={onClickUp}>Up</button>
      <button onClick={onClickDown}>Down</button>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};

export default ActionBar;
