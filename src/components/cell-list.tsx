import { Fragment } from "react";
import CellListItem from "./cell-list-item";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
  const { order, data } = useTypedSelector((state) => state.cells);
  console.log({ order });

  const isNoCell = order.length === 0;

  return (
    <div>
      <AddCell alwaysVisible={isNoCell} prevCellId={null} />
      {order.map((id) => (
        <Fragment key={id}>
          <CellListItem data={data[id]} />
          <AddCell prevCellId={id} />
        </Fragment>
      ))}
    </div>
  );
};

export default CellList;
