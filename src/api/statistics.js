import axios from "../modules/axiosConfig";

export const getGroupStatistics = ({ quizId, groupId }) =>
  axios().get("/statistics", { params: { quizId, groupId } });
