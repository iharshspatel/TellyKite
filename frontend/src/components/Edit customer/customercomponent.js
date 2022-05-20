import React from 'react'
import Styles from "./customer.module.css"
import { useHistory } from 'react-router-dom';

const CustomerComponent = (props) => {
    const history = useHistory();

    function handleClick() {
        history.push("/editcustomerform")
        // e.preventDefalut();
    }
    return (
        <>
            <div className={Styles.Component}>
                <h4 className={Styles.Name}>Name: {props.name}</h4>
                <h5 className={Styles.Username}>Username: {props.username}</h5>
                <button className={Styles.Edit} onClick={handleClick}>Edit</button>
            </div>
        </>
    )
}

export default CustomerComponent;