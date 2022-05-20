import React,{useEffect} from 'react'
import Styles from "./customercomponent.module.css"
export const Customer = ({customers}) => {
    useEffect(()=>{
        console.log((Date.parse(customers[1].Expiry)-Date.parse((customers[1].purchasedate)))/(1000*60*60*24))
    },[])
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
                   Date of Purchase
                </th>
        
                <th>
                     Date of Expiry
                </th>

                <th>
                    validity
                </th>
            </tr>
        
        {(customers) &&
        customers.map((cust, index) => 
        
                <tr>
                <td>
                    {index + 1}
                </td>
        
                
                <td>
                    {cust.username}
                </td>
        
                
                <td>
                    {cust.purchasedate}
                </td>
        
                <td>
                    {cust.Expiry}
                </td>


                <td>
                    {(Date.parse(cust.Expiry)-Date.parse((cust.purchasedate)))/(1000*60*60*24)}
                </td>
                </tr>
        
        )}
        </table>
                </>
    )
}
