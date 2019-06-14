import axios from "../modules/axiosConfig";

export const getAllQuizzes = () => axios().get("/quizzes");

export const addQuiz = quiz => axios().post("/quizzes", quiz);

export const updateQuiz = quiz => axios().patch("/quizzes", quiz);

export const deleteQuiz = id => axios().delete("/quizzes", { data: { id } });
