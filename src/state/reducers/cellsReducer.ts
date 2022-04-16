import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;

    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;

    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const curIndex = state.order.findIndex(
        (value) => value === action.payload.id
      );
      const targetIndex = direction === "up" ? curIndex - 1 : curIndex + 1;
      const isIndexNegative = targetIndex < 0;
      const isIndexMoreThanMaximum = targetIndex >= state.order.length;

      if (isIndexNegative || isIndexMoreThanMaximum) {
        return state;
      }

      state.order.splice(targetIndex, 0, id);
      state.order.splice(curIndex, 1);
      return state;

    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: "",
        type: action.payload.type,
        id: randomId(),
      };

      const targetIndex_2 =
        state.order.findIndex((value) => value === action.payload.id) - 1;

      state.data[cell.id] = cell;

      if (targetIndex_2 === -1) {
        state.order.unshift(cell.id);
        return state;
      }

      if (targetIndex_2 < -1) {
        state.order.push(cell.id);
        return state;
      }

      state.order.splice(targetIndex_2, 0, cell.id);
      return state;

    default:
      return state;
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 7);
};

export default reducer;
