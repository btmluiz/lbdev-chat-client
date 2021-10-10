import { combineReducers } from "redux";

const _reducers = {};

const reducer = combineReducers<typeof _reducers>(_reducers);

export type Reducer = ReturnType<typeof reducer>;

export default reducer;
