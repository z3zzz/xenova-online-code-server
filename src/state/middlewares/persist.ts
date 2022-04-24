import { Dispatch } from "redux";
import { Action } from "../actions";
import { ActionType } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

const targetActions = [
  ActionType.UPDATE_CELL,
  ActionType.MOVE_CELL,
  ActionType.INSERT_CELL_BEFORE,
  ActionType.INSERT_CELL_AFTER,
  ActionType.DELETE_CELL,
];

export const persist = ({
  dispatch,
  getState,
}: {
  dispatch: Dispatch<Action>;
  getState: () => RootState;
}) => {
  return (next: (action: Action) => void) => {
    return (action: Action) => {
      next(action);

      if (targetActions.includes(action.type)) {
        saveCells()(dispatch, getState);
      }
    };
  };
};
