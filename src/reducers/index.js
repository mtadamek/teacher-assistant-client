import { combineReducers } from "redux";
import { reducer as form } from 'redux-form'
import authorization from "./authorization";
import socket from "./socket";
import groups from "./groups";
import quizzes from "./quizzes";
import student from "./student";
import statistics from "./statistics";

const rootReducer = combineReducers({
  form,
  authorization,
  socket,
  groups,
  quizzes,
  student,
  statistics
});

export default rootReducer;
