import {
    ADMIN_FAIL,
    ADMIN_REQUEST,
    LOAD_ROLE_REQUEST,
    LOAD_ROLE_SUCCESS,
    ALL_RESELLER_FAIL,
    ALL_RESELLER_REQUEST,
    ALL_RESELLER_SUCCESS,
    ADMIN_SUCCESS,
    CLEAR_ERRORS,
    LOAD_ADMIN_FAIL,
    LOAD_ADMIN_REQUEST,
    LOAD_ADMIN_SUCCESS,
    ALL_CUSTOMER_FAIL,
    ALL_CUSTOMER_REQUEST,
    ALL_CUSTOMER_SUCCESS,
    LOGOUT_ADMIN_FAIL,
    LOGOUT_ADMIN_SUCCESS,
    UPDATE_RESELLER_FAIL,
    UPDATE_RESELLER_REQUEST,
    UPDATE_RESELLER_SUCCESS,
    UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAIL,
    TOP_RESELLERS_FAIL,
    TOP_RESELLERS_REQUEST,
    TOP_RESELLERS_SUCCESS,
    TOTAL_FAIL,
    TOTAL_REQUEST,
    TOTAL_SUCCESS,
    EXPITY_CUSTOMERS_FAIL,
    EXPITY_CUSTOMERS_REQUEST,
    EXPITY_CUSTOMERS_SUCCESS

} from "../constants/adminconstants"
import axios from "axios";
export const adminLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/admin/login', { email, password }, config);
        dispatch({ type: ADMIN_SUCCESS, payload: data.user })
        console.log(data);
    } catch (error) {
        dispatch({
            type: ADMIN_FAIL,
            payload: error
        })
    }
}

export const loadAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_ADMIN_REQUEST });



        const { data } = await axios.get(`/api/admin`);
        // const { total } = await axios.get(`/api/admin/total`);
        // console.log(total)
        dispatch({ type: LOAD_ADMIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOAD_ADMIN_FAIL, payload: error.response.data.message });
    }
};
export const total = () => async (dispatch) => {
    try {
        dispatch({ type: TOTAL_REQUEST })
        const { data } = await axios.get(`api/admin/total`);
        dispatch({
            type: TOTAL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ type: TOTAL_FAIL, payload: error.response.data.message })
    }
}
export const getResellers = () => async (dispatch) => {
    try {

        dispatch({
            type: ALL_RESELLER_REQUEST
        });
        const { data } = await axios.get(`/api/admin/getallresellers`)

        console.log(data)
        dispatch({
            type: ALL_RESELLER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_RESELLER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getCustomers = () => async (dispatch) => {
    try {

        dispatch({
            type: ALL_CUSTOMER_REQUEST
        });
        const { data } = await axios.get(`/api/admin/getallcustomers`)

        console.log(data)
        dispatch({
            type: ALL_CUSTOMER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_CUSTOMER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const getTopResellers = () => async (dispatch) => {
    try {
        dispatch({
            type: TOP_RESELLERS_REQUEST
        });
        const { data } = await axios.get(`/api/admin/topfivereseller`)
        // console.log(data)
        dispatch({
            type: TOP_RESELLERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TOP_RESELLERS_FAIL,
            payload: error
        })
    }
}
export const updateReseller = (reseller) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_RESELLER_REQUEST });
        const config = {
            headers: {
                "content-Type": "application/json",

            },
        };
        const { data } = await axios.post(`/api/admin/updatereseller`, reseller, config);
        dispatch({
            type: UPDATE_RESELLER_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_RESELLER_FAIL,
            payload: error.response.data.message
        })

    }
}
export const updateCustomer = (customer) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CUSTOMER_REQUEST });
        const config = {
            headers: {
                "content-Type": "application/json",

            },
        };
        const { data } = await axios.post(`/api/admin/updatecustomer`, customer, config);
        dispatch({
            type: UPDATE_CUSTOMER_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_CUSTOMER_FAIL,
            payload: error.response.data.message
        })

    }
}
export const getExpiryCustomers = (days) => async (dispatch) => {
    try {
        dispatch({ type: EXPITY_CUSTOMERS_REQUEST });
        const config = {
            headers: {
                "content-Type": "application/json",
            },
        };

        const { data } = await axios.post(`/api/admin/expiry`, days, config);
        console.log(data)
        dispatch({
            type: EXPITY_CUSTOMERS_SUCCESS, payload: data
        })
    } catch (error) {
        dispatch({
            type: EXPITY_CUSTOMERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logoutAdmin = () => async (dispatch) => {
    try {
        await axios.get(`/api/admin/logout`);

        dispatch({ type: LOGOUT_ADMIN_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_ADMIN_FAIL, payload: error.response.data.message });
    }

};
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}