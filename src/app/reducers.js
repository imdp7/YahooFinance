import { SET_MODE, SET_MOTION, SET_DENSITY } from './actions';
const initialState = {
  mode: false,
  density: true,
  motion: true,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case SET_DENSITY:
      return {
        ...state,
        density: action.payload,
      };
    case SET_MOTION:
      return {
        ...state,
        motion: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
