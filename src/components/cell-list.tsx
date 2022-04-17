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
      {order.map((id) => (
        <Fragment key={id}>
          <AddCell nextCellId={id} />
          <CellListItem data={data[id]} />
        </Fragment>
      ))}
      <AddCell alwaysVisible={isNoCell} nextCellId={null} />
    </div>
  );
};

export default CellList;
