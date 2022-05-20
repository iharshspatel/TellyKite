import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./resellerhome.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCirclePlus, faP, faPen, faPencil } from "@fortawesome/free-solid-svg-icons"
// import { getResellers, logoutAdmin, getCustomers } from "../../actions/adminaction"
import { resellerLogout, customersOfReseller } from "../../actions/reselleraction"
import { useDispatch, useSelector } from "react-redux"
import { Customer } from './customercomponent'

export const Reseller = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    const { reseller, isAuthenticatedReseller, errorReseller, customers, loading } = useSelector(state => state.reseller);
    // if (!admin) {
    //     window.location.reload();

    // }
    useEffect(() => {

        if (isAuthenticatedReseller === false) {
            console.log("reseller home returning")
            history.push("/");
        }
        dispatch(customersOfReseller());
        // dispatch(getResellers());
        // dispatch(getCustomers());

    }, [isAuthenticatedReseller, dispatch, customersOfReseller, history]);
    // if (customers) {
    //     console.log(.length)
    // }
    var len = 0
    if (customers) {
        var len = customers.length;
    }
    function handleClick() {
        dispatch(resellerLogout());
        window.location = "/"; // THIS works

        // console.log("logged out")
        // console.log(isAuthenticatedAdmin);
        // history.push('/');
    }
    return (
        <>

            <div className={Styles.Data}>
                <h5>Total Customers: {len}</h5>
                <h5>Target Customers: {reseller.TargetCustomer}</h5>
            </div>
            <div className={Styles.Card} >
                <div className={Styles.Title}>Reseller name: {reseller.username}</div>
                <div className={Styles.Link}>
                    <button onClick={handleClick} className="btn btn-primary">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                        Logout
                    </button>
                </div>
            </div>
            <div className={Styles.List}>
                <h5>Customer:</h5>
                {(!loading && customers) && <Customer customers={customers}/>}
            </div>
            {/* <div className="card" style="width: 18rem;">
                {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
            {/* <div className="card-body">
                <h5 className="card-title">Reseller name: {reseller.username}</h5>
                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            {/* <button onClick={handleClick} className="btn btn-primary">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                    Logout
                </button> */}
            {/* </div> * /} */}
            {/* </div > */}
        </>
    )
}
