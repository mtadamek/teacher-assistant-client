import { AsyncStorage } from "react-native";
import {
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_ERROR,
  SET_USER_PASSWORD,
  SET_USER_LOGIN,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  DISCARD_USER_TOKEN_ERROR,
  SET_USER_TOKEN,
  SET_USER_DATA,
  AUTH_CHECKED
} from "../constants";
import * as api from "../api/authorization";
import { connectToSocket } from "./socket";

export const postLogin = user => dispatch => {
  let data = null;
  dispatch(postLoginRequest());
  api
    .postLoginCall(user)
    .then(response => {
      data = {
        token: response.headers["x-auth"],
        user: response.data
      };
      return AsyncStorage.setItem("x-auth", data.token);
    })
    .then(() => {
      dispatch(postLoginSuccess(data));
      dispatch(connectToSocket(data.token));
    })
    .catch(error => {
      dispatch(postLoginError(error.response));
    });
};

const postLoginRequest = () => ({
  type: POST_LOGIN_REQUEST,
  payload: null
});

const postLoginSuccess = response => ({
  type: POST_LOGIN_SUCCESS,
  payload: response
});

const postLoginError = error => ({
  type: POST_LOGIN_ERROR,
  payload: error
});

//================================================================

export const logoutUser = () => dispatch => {
  AsyncStorage.removeItem("x-auth")
    .then(() => {
      dispatch(logoutUserSuccess());
    })
    .catch(error => dispatch(logoutUserError(error)));
};

const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
  payload: null
});

const logoutUserError = error => ({
  type: LOGOUT_USER_ERROR,
  payload: error
});

//================================================================

export const setUserLogin = login => ({
  type: SET_USER_LOGIN,
  payload: login
});

export const setUserPassword = password => ({
  type: SET_USER_PASSWORD,
  payload: password
});

export const setUserToken = token => ({
  type: SET_USER_TOKEN,
  payload: token
});

export const setUserData = user => ({
  type: SET_USER_DATA,
  payload: user
});

export const authChecked = checked => ({
  type: AUTH_CHECKED,
  payload: checked
});
