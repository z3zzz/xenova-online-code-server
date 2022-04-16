import CellListItem from "./cell-list-item";
import { useTypedSelector } from "../hooks/use-typed-selector";

const CellList: React.FC = () => {
  const { loading, error, order, data } = useTypedSelector(
    (state) => state.cells
  );

  console.log(loading);
  console.log(error);
  console.log(order);
  console.log(data);
  return (
    <div>
      <CellListItem />
    </div>
  );
};

export default CellList;
