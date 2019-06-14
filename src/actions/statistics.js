import {
    GET_GROUP_STATISTICS_REQUEST,
    GET_GROUP_STATISTICS_SUCCESS,
    GET_GROUP_STATISTICS_ERROR
  } from "../constants";
  import * as api from "../api/statistics";
  
  export const getGroupStatistics = values => dispatch => {
    dispatch(getGroupStatisticsRequest());
    api
      .getGroupStatistics(values)
      .then(res => dispatch(getGroupStatisticsSuccess(res.data)))
      .catch(error => dispatch(getGroupStatisticsError(error)));
  };
  
  const getGroupStatisticsRequest = () => ({
    type: GET_GROUP_STATISTICS_REQUEST,
    payload: null
  });
  
  const getGroupStatisticsSuccess = statistics => ({
    type: GET_GROUP_STATISTICS_SUCCESS,
    payload: statistics
  });
  
  const getGroupStatisticsError = error => ({
    type: GET_GROUP_STATISTICS_ERROR,
    payload: error
  });
  