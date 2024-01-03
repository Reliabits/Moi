import { PROFILE, LOADER } from "./Constant.js";

const initialState = {
  PROFILE: null,
  LOADER: false,
};

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE:
      return {
        ...state,
        PROFILE: action.payload,
      };

    case LOADER:
      return {
        ...state,
        LOADER: action.payload,
      };
    default:
      return state;
  }
};
export default countReducer;
