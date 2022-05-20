import React, { useEffect, useState } from 'react'
import { getResellers, getCustomers, getTopResellers, getExpiryCustomers, total } from "../../actions/adminaction"
import { ExpiringCustomer } from './ExpiringCustomer'
import { useDispatch, useSelector } from "react-redux"
import { Topreseller } from './Topreseller'
import Styles from "./adminhome.module.css"
import AdminSidebar from './AdminSidebar'
import StatBar from './StatBar'


export const Admin = ({ history }) => {
    const dispatch = useDispatch()
    const { admin, isAuthenticatedAdmin, errorAdmin }
        // customerCount,
        // directCustomerCount,
        // nonDirectCustomerCount } 
        = useSelector(state => state.admin);
    const { resellerCount, nonDirectCustomerCount, directCustomerCount, customerCount } = useSelector(state => state.total)
    // if (!admin) {
    //     window.location.reload();

    // }

    const { topResellers } = useSelector(state => state.topResellers);
    // const { resellerCount, nonDirectCustomerCount, directCustomerCount, customerCount } = total.total;
    const { expiringCustomers, loading } = useSelector(state => state.expiry)
    useEffect(() => {
        dispatch(total())
        dispatch(getTopResellers())
        if (isAuthenticatedAdmin === false) {
            console.log("admin home returning")
            history.push("/");
        }
        dispatch(getResellers());
        dispatch(getCustomers());
        
    }, [isAuthenticatedAdmin, getCustomers, getResellers, dispatch]);


    const initialval = {
        day: 0
    }
    const [val, setVal] = useState(initialval);
    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
        
    }
    function handleExpiry(e) {
        console.log(`User clicked in Value Day`)
        const num = parseInt(val.day)
        const data = {
            days: num
        }
        dispatch(getExpiryCustomers(data));
        console.log(expiringCustomers)
    }
    // const [arr, setarr] = useState([]);

    const r = resellerCount
    const c = customerCount
    const d = directCustomerCount
    const n = nonDirectCustomerCount
    return (
        <>
        <div className={Styles.AdminContainer}>
        <AdminSidebar/>
        <div className={Styles.VContainer}>
        <StatBar r={r} c={c} d={d} n={n}/>
        <div className={Styles.HContainer}>
                <div className={Styles.Renews}>

                    <div className={Styles.RenewFilter}>
                    <p>Renewal in:</p>
                    <div>
                    <input placeholder='Enter Renewals days' name='day' value={val.day} onChange={handleChange} />
                    <button type='submit' onClick={handleExpiry}>Find</button>
                    </div>
                    </div>
                    <div>
                        {/* <h3>Customers:</h3> */}
                        
                        {(!loading && expiringCustomers) &&
                            <ExpiringCustomer expiringCustomers={expiringCustomers}  />
                        }  
                    </div>
                </div>
                            
                <div className={Styles.Topreseller}>
                            <h6 className={Styles.TopresellerHeading}>Top Resellers</h6>
                            <br/>
                        {
                            topResellers && topResellers.map((item,index)=>(
                                <div key={item._id}>
                                   <h6 className={Styles.Topresellername}>
                                      {`${index+1}.  ${item.username}`}
                                   </h6>
                                </div>
                            ))
                        }
                </div>

            </div>
        
            </div>
            </div>

        </>
    )
}
