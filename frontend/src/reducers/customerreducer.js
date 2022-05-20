import {
    CUSTOMER_FAIL,
    CUSTOMER_REQUEST,
    CUSTOMER_SUCCESS,
    LOAD_CUSTOMER_FAIL,
    LOAD_CUSTOMER_REQUEST,
    LOAD_CUSTOMER_SUCCESS,
    LOGOUT_CUSTOMER_FAIL,
    LOGOUT_CUSTOMER_SUCCESS,
    ADD_CUSTOMER_FAIL,
    ADD_CUSTOMER_REQUEST,
    ADD_CUSTOMER_SUCCESS,
    CLEAR_ERRORS
} from "../constants/customerconstants";
export const customerReducer = (state = { customer: {} }, action) => {
    switch (action.type) {
        case CUSTOMER_REQUEST:
        case LOAD_CUSTOMER_REQUEST:
            return {
                loadingCustomer: true,
                isAuthenticatedCustomer: false
            }

        case CUSTOMER_SUCCESS:
        case LOAD_CUSTOMER_SUCCESS:
            return {
                ...state,
                loadingCustomer: false,
                isAuthenticatedCustomer: true,
                customer: action.payload
            }

        case CUSTOMER_FAIL:
            return {
                ...state,
                loadingCustomer: false,
                customer: null,
                isAuthenticatedCustomer: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOAD_CUSTOMER_FAIL:
            return {
                loadingCustomer: false,
                customer: null,
                isAuthenticatedCustomer: false,
                error: action.payload
            }
        case LOGOUT_CUSTOMER_SUCCESS:
            return {
                loadingCustomer: false,
                isAuthenticatedCustomer: false,
                customer: null
            }
        case ADD_CUSTOMER_REQUEST:
            return {
                ...state,
                loadingCustomer: true
            }
        case ADD_CUSTOMER_SUCCESS:
            return {
                loadingCustomer: false,
                success: true,
                customer: action.payload
            }
        case ADD_CUSTOMER_FAIL:
            return {
                ...state,
                loadingCustomer: false,
                error: action.payload
            }
        default:
            return state;
    }
}
