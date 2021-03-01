import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {
  authRegisterReducer,
  authLoginReducer,
  fetchUsersReducer,
  userDeleteReducer
} from "./reducers";


const reducer = combineReducers({
  authRegister: authRegisterReducer,
  authInfo: authLoginReducer,
  userList: fetchUsersReducer,
  userDelete: userDeleteReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
