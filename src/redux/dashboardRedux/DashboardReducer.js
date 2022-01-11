import {GET_DASHBOARD_DATA, GET_ALL_PRODUCT} from './DashboardActionTypes';

const initialState = {
  dashboardData: [],
  allProductData: [],
};
export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.dashboardResp,
      };
    case GET_ALL_PRODUCT: {
      return {
        ...state,
        allProductData: action.allProductResponse,
      };
    }
    default:
      return state;
  }
};
