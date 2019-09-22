import { START_LOADING, FINISH_LOADING } from "./types";

export const loadResourceAction = (action: typeof START_LOADING | typeof FINISH_LOADING) => ({
  type: action
});