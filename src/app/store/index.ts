import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import reducers, { Reducer } from "@app/store/reducer";
import { compose } from "redux";
import thunk from "redux-thunk";
import { Store as ReduxStore, Action as ReduxAction } from "redux";

export type State = Reducer;
export type Action = ReduxAction;
export type Store = ReduxStore<State, Action>;

function configureStore(): Store {
  return createStore(reducers, compose(applyMiddleware(thunk)));
}

export const store = configureStore();
