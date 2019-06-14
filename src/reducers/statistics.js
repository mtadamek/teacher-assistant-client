import {
  GET_GROUP_STATISTICS_REQUEST,
  GET_GROUP_STATISTICS_SUCCESS,
  GET_GROUP_STATISTICS_ERROR
} from "../constants";

const initialState = {
    statistics: [],
    loading: false,
    error: false
  };

const statisticsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_GROUP_STATISTICS_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_GROUP_STATISTICS_SUCCESS:
      return { ...state, loading: false, statistics: payload };
    case GET_GROUP_STATISTICS_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default statisticsReducer;
