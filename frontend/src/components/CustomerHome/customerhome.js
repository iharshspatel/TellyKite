import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Styles from "./customerhome.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCirclePlus, faP, faPen, faPencil } from "@fortawesome/free-solid-svg-icons"
import { customerLogout } from "../../actions/customeraction"
import { useDispatch, useSelector } from "react-redux"
// import Tally from "./tally"
import Tally from "./tally"
export const Customer = ({ history }) => {
    const dispatch = useDispatch()
    // const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    // const { reseller, isAuthenticatedReseller, errorReseller } = useSelector(state => state.reseller);
    const { customer, isAuthenticatedCustomer, loadingCustomer } = useSelector(state => state.customer);
    // if (!admin) {
    //     window.location.reload();

    // }
    useEffect(() => {

        if (isAuthenticatedCustomer === false) {
            console.log("customer home returning")
            history.push("/");
        }
        // dispatch(getResellers());
        // dispatch(getCustomers());


    }, [isAuthenticatedCustomer, dispatch]);
    console.log(customer.TellyAccounts)

    function handleClick() {
        dispatch(customerLogout());
        window.location = "/"; // THIS works

        // console.log("logged out")
        // console.log(isAuthenticatedAdmin);
        // history.push('/');
    }
    return (
        <>
            <div className={Styles.Card}>
                <div className={Styles.Title}>Direct Customer name:  {customer.username}</div>
                <div className={Styles.Link}>
                    <button onClick={handleClick} className="btn btn-primary">
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                        Logout
                    </button>

                </div>
            </div>
            <div className={Styles.Details}>
                <p>Plan Details</p>
                <h6>Plan type: {customer.plan_type}</h6>
                <h6>Telly Version: {customer.Telly_version}</h6>
                <h6>Expiry: {customer.Expiry}</h6>
            </div>
            <div className={Styles.Accounts}>
                <p>Telly Accounts:</p>
                {
                    customer.TellyAccounts.map((account, index) =>
                        <Tally key={index} username={account.tellyUsername} password={account.tellyPassword} serial={account.tellySerial} index={index} />
                    )
                }
            </div>
        </>
    )
}

