import { 
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_CURRENT_USER,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
} from "../actions/types";
const isEmpty = require("is-empty");
const Cookie = require('js-cookie');
const token = localStorage.getItem('jwtToken') || null;

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  authToken: token
};

export const authRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
	  return { loading: false, message: action.payload  };
	case REGISTER_FAIL:
	  return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const authLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
		loading: false
      };
	case LOGIN_FAIL:
	  return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchUsersReducer = (state = {users: []}, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { ...state, loading: true };
    case USER_DELETE_SUCCESS:
      return { ...state, loading: false, user: action.payload, success: true };
    case USER_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};