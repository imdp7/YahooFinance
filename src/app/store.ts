import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import themes from './theme'
// import regions './region'
import rootReducer from './reducers';

export const store = configureStore({
  reducer: {
    // preferences: preferences,
    //feature2Data: feature2DataReducer,
    rootReducer: rootReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
