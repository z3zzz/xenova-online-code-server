import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { CellTypes, Cell } from "../cell";
import * as Api from "../../utils/api";
import {
  Directions,
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
  InsertCellAfterAction,
  Action,
} from "../actions";
import { RootState } from "..";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Directions): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string | null,
  type: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const fetchCells = () => {
  return async function (dispatch: Dispatch<Action>) {
    dispatch({ type: ActionType.FETCH_CELLS_START });

    try {
      const { data }: { data: Cell[] } = await Api.get("api/cells");

      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const saveCells = () => {
  return async function (
    dispatch: Dispatch<Action>,
    getState: () => RootState
  ) {
    const {
      cells: { order, data },
    } = getState();

    const cells = order.map((cellId) => data[cellId]);

    try {
      await Api.post("cells", { cells });
    } catch (err: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};
