import {
    RESELLER_FAIL,
    RESELLER_REQUEST,
    RESELLER_SUCCESS,
    CLEAR_ERRORS,
    ADD_RESELLER_FAIL,
    ADD_RESELLER_REQUEST,
    ADD_RESELLER_SUCCESS,
    LOAD_RESELLER_FAIL,
    LOAD_RESELLER_REQUEST,
    LOAD_RESELLER_SUCCESS,
    LOGOUT_RESELLER_FAIL,
    LOGOUT_RESELLER_SUCCESS,
    ALL_CUSTOMERS_FAIL,
    ALL_CUSTOMERS_REQUEST,
    ALL_CUSTOMERS_SUCCESS,
    GET_ALL_RESELLER_REQUEST,
    GET_ALL_RESELLER_SUCCESS,
    GET_ALL_RESELLER_FAIL
} from "../constants/resellerconstants"
import axios from "axios";
export const resellerLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: RESELLER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/reseller/login', { email, password }, config);
        dispatch({ type: RESELLER_SUCCESS, payload: data.user })
        console.log(data);
    } catch (error) {
        dispatch({
            type: RESELLER_FAIL,
            payload: error
        })
    }
}

export const getAllResellers  = () => async (dispatch) => {
    try{
        dispatch({type:GET_ALL_RESELLER_REQUEST});

        const {data} = await axios.get(`/api/resellers`)
        console.log(data);

        dispatch({
            type:GET_ALL_RESELLER_SUCCESS,
            payload:data
        })


    } catch(error){
        dispatch({
            type:GET_ALL_RESELLER_FAIL,
            payload:error
        })
    }
}


export const customersOfReseller = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CUSTOMERS_REQUEST });
        const { data } = await axios.get(`/api/reseller/getcustomers`)
        console.log(data);
        dispatch({
            type: ALL_CUSTOMERS_SUCCESS,
            payload: data.customers
        })
    } catch (error) {
        dispatch({
            type: ALL_CUSTOMERS_FAIL,
            payload: error.reseller.data.message
        })
    }
}
export const loadReseller = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_RESELLER_REQUEST });



        const { data } = await axios.get(`/api/reseller`);
        console.log(data)
        dispatch({ type: LOAD_RESELLER_SUCCESS, payload: data.reseller });
    } catch (error) {
        dispatch({ type: LOAD_RESELLER_FAIL, payload: error.response.data.message });
    }
};
export const resellerLogout = () => async (dispatch) => {
    try {
        await axios.get(`/api/reseller/logout`);

        dispatch({ type: LOGOUT_RESELLER_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_RESELLER_FAIL, payload: error.response.data.message });
    }

};
export const createReseller = (reseller) => async (dispatch) => {
    try {
        dispatch({ type: ADD_RESELLER_REQUEST });
        const config = {
            headers: {
                "content-Type": "application/json",

            },
        };
        const { data } = await axios.post("/api/reseller/register", reseller, config);
        dispatch({
            type: ADD_RESELLER_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: ADD_RESELLER_FAIL,
            payload: error.response.data.message
        })

    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}