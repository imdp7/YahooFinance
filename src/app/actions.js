export const SET_MODE = 'SET_MODE';
export const SET_DENSITY = 'SET_DENSITY';
export const SET_MOTION = 'SET_MOTION';

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: mode,
});

export const setDensity = (density) => ({
  type: SET_DENSITY,
  payload: density,
});
export const setMotion = (motion) => ({
  type: SET_MOTION,
  payload: motion,
});
