import {
    RESELLER_FAIL,
    RESELLER_REQUEST,
    RESELLER_SUCCESS,
    LOAD_RESELLER_FAIL,
    LOAD_RESELLER_REQUEST,
    LOAD_RESELLER_SUCCESS,
    LOGOUT_RESELLER_FAIL,
    GET_ALL_RESELLER_REQUEST,
    GET_ALL_RESELLER_SUCCESS,
    GET_ALL_RESELLER_FAIL,
    LOGOUT_RESELLER_SUCCESS,
    CLEAR_ERRORS,
    ADD_RESELLER_FAIL,
    ADD_RESELLER_REQUEST,
    ADD_RESELLER_SUCCESS,
    ALL_CUSTOMERS_FAIL,
    ALL_CUSTOMERS_REQUEST,
    ALL_CUSTOMERS_SUCCESS
} from "../constants/resellerconstants";
export const resellerReducer = (state = { reseller: {} }, action) => {
    switch (action.type) {
        case GET_ALL_RESELLER_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case GET_ALL_RESELLER_SUCCESS:
            return{
                ...state,
                loading:false,
                resellers:action.payload
            }

        case GET_ALL_RESELLER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            
        case RESELLER_REQUEST:
        case LOAD_RESELLER_REQUEST:
            return {
                loadingReseller: true,
                isAuthenticatedReseller: false
            }

        case RESELLER_SUCCESS:
        case LOAD_RESELLER_SUCCESS:
            return {
                ...state,
                loadingReseller: false,
                isAuthenticatedReseller: true,
                reseller: action.payload
            }

        case RESELLER_FAIL:
            return {
                ...state,
                loadingReseller: false,
                reseller: null,
                isAuthenticatedReseller: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOAD_RESELLER_FAIL:
            return {
                loadingReseller: false,
                reseller: null,
                isAuthenticatedReseller: false,
                error: action.payload
            }
        case LOGOUT_RESELLER_SUCCESS:
            return {
                loadingReseller: false,
                isAuthenticatedReseller: false,
                reseller: null
            }
        case ADD_RESELLER_REQUEST:
            return {
                ...state,
                loadingReseller: true
            }
        case ADD_RESELLER_SUCCESS:
            return {
                loadingReseller: false,
                success: true,
                reseller: action.payload
            }
        case ADD_RESELLER_FAIL:
            return {
                ...state,
                loadingReseller: false,
                error: action.payload
            }
        case ALL_CUSTOMERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_CUSTOMERS_FAIL:
            return {
                ...state,
                loading: false,
                customers: null
            }
        case ALL_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,

                customers: action.payload
            }
        default:
            return state;
    }
}
