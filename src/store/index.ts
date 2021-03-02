import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { Action, combineReducers } from 'redux';

import history from './history';

let store: ReturnType<typeof createStore> | undefined;

export const rootReducer = combineReducers({
  history,
});
export type AppState = ReturnType<typeof rootReducer>;

const createStore = (preloadedState: AppState) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export const initStore = (preloadedState: AppState) => {
  let _store = store ?? createStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = createStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store;
  }

  // Create the store once in the client
  if (!store) {
    store = _store;
  }

  return _store;
};

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default function useStore(initialState: AppState) {
  return useMemo(() => initStore(initialState), [initialState]);
}
