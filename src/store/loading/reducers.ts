import { LoadingState, START_LOADING, FINISH_LOADING } from "./types";
import { BaseAction } from "../base-action";

const initialState: LoadingState = {
  loadingResourcesCount: 0
}

export const loadingReducer = (state: LoadingState = initialState, action: BaseAction): LoadingState => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loadingResourcesCount: state.loadingResourcesCount + 1 }
    case FINISH_LOADING:
      return { ...state, loadingResourcesCount: state.loadingResourcesCount - 1 }
    default:
      return state;
  }
}