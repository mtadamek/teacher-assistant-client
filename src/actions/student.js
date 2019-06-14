import { ADD_QUIZ, DELETE_QUIZ } from "../constants";

export const addQuiz = quiz => ({
    type: ADD_QUIZ,
    payload: quiz
})

export const deleteQuiz = quiz => ({
    type: DELETE_QUIZ,
    payload: quiz
})