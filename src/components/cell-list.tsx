import { Fragment } from "react";
import CellListItem from "./cell-list-item";
import { useTypedSelector } from "../hooks/use-typed-selector";
import AddCell from "./add-cell";
import "./cell-list.css";

const CellList: React.FC = () => {
  const { order, data } = useTypedSelector((state) => state.cells);
  const hasNoCell = order.length === 0;

  return (
    <div className="cell-list">
      <AddCell alwaysVisible={hasNoCell} prevCellId={null} />
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
