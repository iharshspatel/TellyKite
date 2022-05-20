import React, { useEffect, useState } from 'react'
import { getResellers } from "../../actions/adminaction"
import { useDispatch, useSelector } from "react-redux";
import ResellerComponent from './resellercomponent';

const Allreseller = ({ history }) => {
    const dispatch = useDispatch();
    const { resellers, loading } = useSelector(state => state.resellers);
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
            dispatch(getResellers());
            // setTimeout(
            //     console.log(resellers)
            //     , 2000)
            // got();
            // setArray(resellers)
            // setTimeout(setArray(resellers), 2000)
        }



    })


    return (

        <>
            <div>Resellers</div>

            {resellers.map(reseller => <ResellerComponent name={reseller.name} username={reseller.username} />)}

        </>
    )

}

export default Allreseller