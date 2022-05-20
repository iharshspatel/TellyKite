import React from 'react'
import Styles from "./reseller.module.css"
import { useDispatch, useSelector } from "react-redux"
import EditReseller from "../Forms/edit reseller form/edirresellerfomr";
import { useHistory } from 'react-router-dom';

const ResellerComponent = (props) => {
    const history = useHistory();

    function handleClick() {
        history.push("/editresellerform")
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

export default ResellerComponent;