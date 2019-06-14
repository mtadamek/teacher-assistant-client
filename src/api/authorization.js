import axios from "../modules/axiosConfig";

export const postLoginCall = user => axios().post("/auth/login", user);
