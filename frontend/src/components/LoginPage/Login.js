import React, { useEffect, useState } from "react"
import { toast } from 'react-toastify';

import { Redirect, useNavigate } from 'react-router-dom'
import Styles from './Login.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons"
import store from "../../store";
import { useDispatch, useSelector, Provider } from "react-redux"
import { adminLogin, clearErrors, getResellers, getTopResellers, total } from "../../actions/adminaction"
import { resellerLogin, resellerLogout } from "../../actions/reselleraction"
import { customerLogin, customerLogout } from "../../actions/customeraction"

import logo from '../../assets/loginScreen/Logo.png'
import "../../App.css";
function Login({ history }) {

    let initialValue = {
        email: '',
        password: ''
    }
    const [val, setVal] = useState(initialValue)
    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }
    const dispatch = useDispatch();
    const { admin, isAuthenticatedAdmin, role, loadingAdmin } = useSelector(state => state.admin);
    const { reseller, isAuthenticatedReseller,  } = useSelector(state => state.reseller);
    const { customer, isAuthenticatedCustomer } = useSelector(state => state.customer);
    
    
  let errorAdmin = useSelector(state => state.admin.error);
  let errorReseller = useSelector(state => state.reseller.error);
  let errorCustomer = useSelector(state => state.customer.error);

    useEffect(() => {
        dispatch(getTopResellers());
        dispatch(total());
        if (errorAdmin) {
            toast.error("Invalid Email or Password")
            dispatch(clearErrors())
        }
        if ((isAuthenticatedAdmin === true)) {
            history.push("/admin")
        }
        if ((isAuthenticatedReseller === true)) {
            history.push("/reseller")
            console.log("reseller success");
        }
        if ((isAuthenticatedCustomer === true)) {
            history.push("/customer")
            console.log("reseller success");
        }
    }, [isAuthenticatedAdmin, isAuthenticatedCustomer, isAuthenticatedReseller, history, admin, reseller, customer, errorAdmin, dispatch, clearErrors])

    useEffect(()=>{
        if(isAuthenticatedAdmin || isAuthenticatedCustomer || isAuthenticatedReseller){
            toast("Login Successful")
        }
    },[isAuthenticatedAdmin,isAuthenticatedCustomer,isAuthenticatedReseller])

    useEffect(()=>{
        if(errorAdmin && errorCustomer && errorReseller){
            toast("Try Again")
        }
    },[errorAdmin,errorCustomer,errorReseller])
    const handleClick = async (e) => {
        e.preventDefault();
        if (!val.email || !val.password) {

            return <Redirect to={'/'} />
        }
        dispatch(adminLogin(val.email, val.password));
        dispatch(resellerLogin(val.email, val.password));
        dispatch(customerLogin(val.email, val.password));

    }



    return (<>
    <div className={Styles.LoginpageContainer}>
        <div className={Styles.InputBox}>
            <div className={Styles.logoContainer}>
                <img className={Styles.logo} src={logo}/>
            </div>
                <h1 className={Styles.Heading}>
                    Login
                </h1>
                <form className={Styles.Container}>


                    <input className={Styles.Input} type="email" placeholder="Email" name="email" value={val.email} onChange={handleChange} />


                    <input className={Styles.Input} type="password" autoComplete="true" placeholder="Password" name="password" value={val.password} onChange={handleChange} />

                    <div className={Styles.links}>
                        <p>Forgot Password?</p>

                        <p>Don't have Credentials?</p>
                    </div>

                    <button onClick={handleClick} className={Styles.submitbtn} type="submit">Login   <FontAwesomeIcon icon={faArrowRightLong} /></button>


                </form>
        </div>
        <div className={Styles.Image}>

        </div>
        </div>

    </>)
}

export default Login;
