import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

const initialState: BundleState = {};

const reducer = (
  state: BundleState = initialState,
  action: Action
): BundleState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        const idToBundle = action.payload;
        draft[idToBundle] = {
          loading: true,
          code: "",
          err: "",
        };
        break;

      case ActionType.BUNDLE_COMPLETE:
        const { id, bundle } = action.payload;
        draft[id] = {
          loading: false,
          code: bundle.code,
          err: bundle.err,
        };
        break;

      default:
        break;
    }
  });
};

export default reducer;
