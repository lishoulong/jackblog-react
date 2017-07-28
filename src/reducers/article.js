import {
  BILL_DETAIL_SUCCESS,
  BILL_DETAIL_FAILURE,
  BILL_LIST_SUCCESS,
  BILL_LIST_FAILURE
} from '../actions/types'
const initialState = {
    billDetail: '',
    billList: []
};

export const articleData = (state = initialState, action) => {
    switch (action.type) {
        case BILL_DETAIL_SUCCESS:
            return {
                ...state,
                billDetail: action.billDetail
            };
        case BILL_DETAIL_FAILURE:
            return {
                ...state,
            };
        case BILL_LIST_SUCCESS:
            return {
                ...state,
                billList: action.billList
            };
        case BILL_LIST_FAILURE:
            return {
                ...state
            };
        default:
            return state;
    }
};