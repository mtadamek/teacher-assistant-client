import {
  GET_ALL_GROUPS_REQUEST,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_ERROR,
  GET_GROUP_STUDENTS_REQUEST,
  GET_GROUP_STUDENTS_SUCCESS,
  GET_GROUP_STUDENTS_ERROR,
  UPDATE_ACTIVE
} from "../constants";

const initialState = {
  groups: null,
  students: null,
  active: [],
  loading: false,
  error: false
};

const groupsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_GROUPS_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_ALL_GROUPS_SUCCESS:
      return { ...state, loading: false, groups: payload };
    case GET_ALL_GROUPS_ERROR:
      return { ...state, loading: false, error: payload };

    case GET_GROUP_STUDENTS_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_GROUP_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: payload.sort((a, b) => {
          if (a.surname < b.surname) {
            return -1;
          }
          if (a.surname > b.surname) {
            return 1;
          }
          return 0;
        })
      };
    case GET_GROUP_STUDENTS_ERROR:
      return { ...state, loading: false, error: payload };

    case UPDATE_ACTIVE:
      return { ...state, active: payload };
    default:
      return state;
  }
};

export default groupsReducer;
