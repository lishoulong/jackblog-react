import * as types from './types';
import axios from 'axios';

/*获取文章列表*/
export const getArticleList = (isAdd = true) =>{
  return (dispatch,getState) => {
    const options = getState().options.toJS()
    return dispatch({
      type: types.ARTICLE_LIST,
      itemsPerPage: options.itemsPerPage,
      promise: api.getArticleList(options),
      isAdd: isAdd
    })
  }
}

export const loadDetaileBillData = (params, domain = '') => {
  const url = `${domain}/api/bill/${params.id}`;
  return axios.get(url);
}

export const getDetailedBillData = (params) => {
  return (dispatch, getState) => {
    loadDetaileBillData(params).then((response) => {
      return dispatch({
        type: types.BILL_DETAIL_SUCCESS,
        billDetail: response.data
      })
    }).catch((err) => {
      return dispatch({
        type: types.BILL_DETAIL_FAILURE
      })
    })
  }
}

export const loadLatestBillsData = (params, domain = '') => {
    const url = `${domain}/api/latest-bills`;
    return axios.get(url);
}

export const getLatestBillsData = (params) => {
    loadLatestBillsData(params).then((response) => {
        return dispatch({
          type: types.BILL_LIST_SUCCESS,
          billList: response.data
        })
    }).catch((err) => {
        return dispatch({
          type: types.BILL_LIST_FAILURE
        })
    });
}