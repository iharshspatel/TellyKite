import { faL } from "@fortawesome/free-solid-svg-icons";
import {
    ADMIN_FAIL,
    ADMIN_REQUEST,
    ADMIN_SUCCESS,
    LOAD_ADMIN_FAIL,
    LOAD_ADMIN_REQUEST,
    LOAD_ADMIN_SUCCESS,
    LOGOUT_ADMIN_FAIL,
    LOGOUT_ADMIN_SUCCESS,
    CLEAR_ERRORS,
    LOAD_ROLE_REQUEST,
    LOAD_ROLE_SUCCESS,
    ALL_RESELLER_FAIL,
    ALL_RESELLER_REQUEST,
    ALL_RESELLER_SUCCESS,
    ALL_CUSTOMER_FAIL,
    ALL_CUSTOMER_REQUEST,
    ALL_CUSTOMER_SUCCESS,
    UPDATE_RESELLER_FAIL,
    UPDATE_RESELLER_REQUEST,
    UPDATE_RESELLER_SUCCESS,
    UPDATE_CUSTOMER_FAIL,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_REQUEST,
    TOP_RESELLERS_FAIL,
    TOP_RESELLERS_REQUEST,
    TOP_RESELLERS_SUCCESS,
    TOTAL_REQUEST,
    TOTAL_FAIL,
    TOTAL_SUCCESS,
    EXPITY_CUSTOMERS_FAIL,
    EXPITY_CUSTOMERS_REQUEST,
    EXPITY_CUSTOMERS_SUCCESS
} from "../constants/adminconstants";
export const adminReducer = (state = { admin: {} }, action) => {
    switch (action.type) {
        case ADMIN_REQUEST:
        case LOAD_ADMIN_REQUEST:
            return {
                loadingAdmin: true,
                isAuthenticatedAdmin: false
            }

        case ADMIN_SUCCESS:
        case LOAD_ADMIN_SUCCESS:
            return {
                ...state,
                loadingAdmin: false,
                isAuthenticatedAdmin: true,
                admin: action.payload
            }

        case ADMIN_FAIL:
            return {
                ...state,
                loadingAdmin: false,
                admin: null,
                isAuthenticatedAdmin: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOAD_ADMIN_FAIL:
            return {
                loadingAdmin: false,
                admin: null,
                isAuthenticatedAdmin: false,
                error: action.payload
            }
        case LOGOUT_ADMIN_SUCCESS:
            return {
                loadingAdmin: false,
                isAuthenticatedAdmin: false,
                admin: null
            }
        case LOGOUT_ADMIN_FAIL:
            return {
                loadingAdmin: false,
                isAuthenticatedAdmin: false,
                admin: null
            }
        case UPDATE_RESELLER_FAIL:
        case UPDATE_CUSTOMER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case UPDATE_RESELLER_SUCCESS:
        case UPDATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_RESELLER_REQUEST:
        case UPDATE_CUSTOMER_REQUEST:

            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}
export const resellersReducer = (state = { resellers: {} }, action) => {
    switch (action.type) {
        case ALL_RESELLER_SUCCESS:
            return {
                ...state,
                loading: false,
                resellers: action.payload.reseller,
            }
        case ALL_RESELLER_REQUEST:
            return {
                loading: true
            }
        case ALL_RESELLER_FAIL:
            return {
                loading: false,
                resellers: null,
                error: action.payload
            }
        default:
            return state
    }
}
export const totalReducer = (state = { total: {} }, action) => {
    switch (action.type) {
        case TOTAL_REQUEST:
            return {
                loading: true
            }
        case TOTAL_SUCCESS:
            return {
                ...state,
                loading: false,
                resellerCount: action.payload.resellerCount,
                customerCount: action.payload.customerCount,
                nonDirectCustomerCount: action.payload.nonDirectCustomerCount,
                directCustomerCount: action.payload.directCustomerCount

            }
        case TOTAL_FAIL:
            return {
                loading: false,
                total: null,
                error: action.payload
            }
        default:
            return state
    }
}
export const expiryReducer = (state = { expiringCustomers: {} }, action) => {
    switch (action.type) {
        case EXPITY_CUSTOMERS_FAIL:
            return {
                loading: false,
                expiringCustomers: null,
                error: action.payload
            }
        case EXPITY_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,
                expiringCustomers: action.payload.t
            }
        case EXPITY_CUSTOMERS_REQUEST:
            return {
                loading: true
            }
        default:
            return state
    }
}
export const topResellersReducer = (state = { topResellers: [{}] }, action) => {
    switch (action.type) {
        case TOP_RESELLERS_FAIL:
            return {
                loading: false,
                topResellers: null,
                error: action.payload
            }
        case TOP_RESELLERS_REQUEST:
            return {
                loading: true
            }
        case TOP_RESELLERS_SUCCESS:
            return {
                ...state,
                loading: false,
                topResellers: action.payload.topResellers
            }
        default:
            return state
    }
}
export const customersReducer = (state = { customers: {} }, action) => {
    switch (action.type) {
        case ALL_CUSTOMER_SUCCESS:
            return {
                ...state,
                loading: false,
                customers: action.payload.customer,
            }
        case ALL_CUSTOMER_REQUEST:
            return {
                loading: true
            }
        case ALL_CUSTOMER_FAIL:
            return {
                loading: false,
                customers: null,
                error: action.payload
            }
        default:
            return state
    }
}