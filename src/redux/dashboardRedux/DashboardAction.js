import {GET_DASHBOARD_DATA, GET_ALL_PRODUCT} from './DashboardActionTypes';
export const getDashboardData = dashboardResp => ({
  type: GET_DASHBOARD_DATA,
  dashboardResp,
});
export const getAllProduct = allProductResponse => ({
  type: GET_ALL_PRODUCT,
  allProductResponse,
});
