import React from "react";
import Styles from "./ExpiringCustomer.module.css"
export const ExpiringCustomer = ({expiringCustomers}) => {
    return (
        <>
<table>

    <tr>
        <th>
            S. No
        </th>


        <th>
            Customer Name
        </th>

        <th>
            Reseller Name
        </th>

        <th>
             Expiry
        </th>
    </tr>

{(expiringCustomers) &&
expiringCustomers.map((cust, index) => 

        <tr>
        <td>
            {index + 1}
        </td>

        
        <td>
            {cust.username}
        </td>

        
        <td>
            {cust.resellername}
        </td>

        <td>
            {cust.Expiry}
        </td>
        </tr>

)}
</table>
        </>
    )
}