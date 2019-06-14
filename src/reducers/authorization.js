import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  SET_USER_LOGIN,
  SET_USER_PASSWORD,
  SET_USER_TOKEN,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  SET_USER_DATA,
  AUTH_CHECKED
} from "../constants";

const initialState = {
  user: null,
  login: null,
  password: null,
  isAuthorization: false,
  error: null,
  token: null,
  checked: false
};

const authorizationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_LOGIN_REQUEST:
      return { ...state, isAuthorization: true, error: null };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthorization: false,
        error: null
      };
    case POST_LOGIN_ERROR:
      return { ...state, isAuthorization: false, error: payload };

    case SET_USER_LOGIN:
      return {
        ...state,
        login: payload,
        error: false
      };
    case SET_USER_PASSWORD:
      return {
        ...state,
        password: payload,
        error: false
      };
    case SET_USER_TOKEN:
      return {
        ...state,
        token: payload,
        error: false
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        token: payload,
        user: payload,
        error: false
      };
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        error: true
      };

    case SET_USER_DATA:
      return {
        ...state,
        user: payload,
        error: false
      };
    case AUTH_CHECKED:
      return {
        ...state,
        checked: payload
      };

    default:
      return state;
  }
};

export default authorizationReducer;
