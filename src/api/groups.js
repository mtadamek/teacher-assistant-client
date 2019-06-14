import axios from "../modules/axiosConfig";

export const getAllGroups = () => axios().get("/groups/get-all-groups");

export const getGroupStudents = groupId => axios().get("/groups/get-group-students", { params: { groupId } });
