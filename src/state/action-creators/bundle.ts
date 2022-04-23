import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { BundleStartAction, BundleCompleteAction } from "../actions";
import bundleCode from "../../bundler/";

type BundleAction = BundleStartAction | BundleCompleteAction;

export const createBundle = (id: string, rawCode: string) => {
  return async function (dispatch: Dispatch<BundleAction>) {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: id,
    });

    const bundle = await bundleCode(rawCode);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        id,
        bundle,
      },
    });
  };
};
