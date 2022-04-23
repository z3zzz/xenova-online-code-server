import { ActionType } from "../action-types";
import { CellTypes } from "../cell";

export type Directions = "up" | "down";

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Directions;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: string;
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    id: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction;
