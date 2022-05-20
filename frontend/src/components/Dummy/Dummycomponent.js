import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
const Dummycomponent = ({ history }) => {
    const dispatch = useDispatch()
    const { isAuthenticatedAdmin } = useSelector(state => state.admin)
    const { isAuthenticatedReseller} = useSelector(state => state.reseller)
    const { isAuthenticatedCustomer } = useSelector(state => state.customer)
    useEffect(() => {
        if (isAuthenticatedAdmin) {
            history.push("/admin")
        }
        if (isAuthenticatedReseller) {
            history.push("/reseller")
        }
        if (isAuthenticatedAdmin) {
            history.push("/customer")
        }
    })
    return (
        <div>Dummycomponent</div>
    )
}

export default Dummycomponent