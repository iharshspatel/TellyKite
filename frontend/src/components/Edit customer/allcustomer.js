import React, { useEffect, useState } from 'react'
import { getCustomers } from "../../actions/adminaction"
import { useDispatch, useSelector } from "react-redux";
import CustomerComponent from './customercomponent';

const Allcustomer = ({ history }) => {
    const dispatch = useDispatch();
    const { customers, loading } = useSelector(state => state.customers);
    const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    // const [array, setArray] = useState([]);


    useEffect(() => {
        // dispatch(getResellers());
        // console.log("using effect")
        if (!isAuthenticatedAdmin) {
            console.log("admin home returning")
            history.push("/");
        }

        if (loading) {
            dispatch(getCustomers());
        }



    })


    return (

        <>
            <div>Customers</div>

            {customers.map(customer => <CustomerComponent name={customer.name} username={customer.username} />)}

        </>
    )

}

export default Allcustomer;