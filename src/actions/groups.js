import {
  GET_ALL_GROUPS_REQUEST,
  GET_ALL_GROUPS_SUCCESS,
  GET_ALL_GROUPS_ERROR,
  GET_GROUP_STUDENTS_REQUEST,
  GET_GROUP_STUDENTS_SUCCESS,
  GET_GROUP_STUDENTS_ERROR,
  UPDATE_ACTIVE
} from "../constants";
import * as api from "../api/groups";

export const getAllGroups = () => dispatch => {
  dispatch(getAllGroupsRequest());
  api
    .getAllGroups()
    .then(res => dispatch(getAllGroupsSuccess(res.data.Groups)))
    .catch(error => dispatch(getAllGroupsError(error)));
};

const getAllGroupsRequest = () => ({
  type: GET_ALL_GROUPS_REQUEST,
  payload: null
});

const getAllGroupsSuccess = groups => ({
  type: GET_ALL_GROUPS_SUCCESS,
  payload: groups
});

const getAllGroupsError = error => ({
  type: GET_ALL_GROUPS_ERROR,
  payload: error
});

export const getGroupStudents = groupId => dispatch => {
  dispatch(getGroupStudentsRequest());
  api
    .getGroupStudents(groupId)
    .then(res => dispatch(getGroupStudentsSuccess(res.data.Users)))
    .catch(error => dispatch(getGroupStudentsError(error)));
};

const getGroupStudentsRequest = () => ({
  type: GET_GROUP_STUDENTS_REQUEST,
  payload: null
});

const getGroupStudentsSuccess = students => ({
  type: GET_GROUP_STUDENTS_SUCCESS,
  payload: students
});

const getGroupStudentsError = error => ({
  type: GET_GROUP_STUDENTS_ERROR,
  payload: error
});

//==============sync

export const updateActive = avtive => ({
  type: UPDATE_ACTIVE,
  payload: avtive
})
