import CellListItem from "./cell-list-item";
import { useTypedSelector } from "../hooks/use-typed-selector";

const CellList: React.FC = () => {
  const { order, data } = useTypedSelector((state) => state.cells);
  console.log({ order });

  return (
    <div>
      {order.map((id) => (
        <CellListItem key={id} data={data[id]} />
      ))}
    </div>
  );
};

export default CellList;
