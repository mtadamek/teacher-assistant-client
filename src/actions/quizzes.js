import {
  GET_ALL_QUIZZES_REQUEST,
  GET_ALL_QUIZZES_SUCCESS,
  GET_ALL_QUIZZES_ERROR,
  POST_QUIZ_REQUEST,
  POST_QUIZ_SUCCESS,
  POST_QUIZ_ERROR,
  PATCH_QUIZ_REQUEST,
  PATCH_QUIZ_SUCCESS,
  PATCH_QUIZ_ERROR,
  DELETE_QUIZ_REQUEST,
  DELETE_QUIZ_SUCCESS,
  DELETE_QUIZ_ERROR
} from "../constants";
import * as api from "../api/quizzes";

export const getAllQuizzes = () => dispatch => {
  dispatch(getAllQuizzesRequest());
  api
    .getAllQuizzes()
    .then(res => dispatch(getAllQuizzesSuccess(res.data)))
    .catch(error => dispatch(getAllQuizzesError(error)));
};

const getAllQuizzesRequest = () => ({
  type: GET_ALL_QUIZZES_REQUEST,
  payload: null
});

const getAllQuizzesSuccess = quizzes => ({
  type: GET_ALL_QUIZZES_SUCCESS,
  payload: quizzes
});

const getAllQuizzesError = error => ({
  type: GET_ALL_QUIZZES_ERROR,
  payload: error
});

//===========================================================

export const addQuiz = quiz => dispatch => {
  dispatch(addQuizRequest());
  api
    .addQuiz(quiz)
    .then(res => dispatch(addQuizSuccess(res.data)))
    .catch(error => dispatch(addQuizError(error)));
};

const addQuizRequest = () => ({
  type: POST_QUIZ_REQUEST,
  payload: null
});

const addQuizSuccess = quiz => ({
  type: POST_QUIZ_SUCCESS,
  payload: quiz
});

const addQuizError = error => ({
  type: POST_QUIZ_ERROR,
  payload: error
});


export const updateQuiz = quiz => dispatch => {
  dispatch(updateQuizRequest());
  api
    .updateQuiz(quiz)
    .then(res => dispatch(updateQuizSuccess(res.data)))
    .catch(error => dispatch(updateQuizError(error)));
};

const updateQuizRequest = () => ({
  type: PATCH_QUIZ_REQUEST,
  payload: null
});

const updateQuizSuccess = quiz => ({
  type: PATCH_QUIZ_SUCCESS,
  payload: quiz
});

const updateQuizError = error => ({
  type: PATCH_QUIZ_ERROR,
  payload: error
});

//===========================================================

export const deleteQuiz = id => dispatch => {
  dispatch(deleteQuizRequest());
  api
    .deleteQuiz(id)
    .then(() => dispatch(deleteQuizSuccess(id)))
    .catch(error => dispatch(deleteQuizError(error)));
}

const deleteQuizRequest = () => ({
  type: DELETE_QUIZ_REQUEST,
  payload: null
});

const deleteQuizSuccess = id => ({
  type: DELETE_QUIZ_SUCCESS,
  payload: id
});

const deleteQuizError = error => ({
  type: DELETE_QUIZ_ERROR,
  payload: error
});
