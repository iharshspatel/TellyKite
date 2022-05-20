import React from 'react'
import Styles from "./tally.module.css"

export const Tally = (props) => {
    return (
        <div className={Styles.Line}><p>{props.index + 1}.   Username: {props.username}  ,   Password:  {props.password}  ,  Serial Number:  {props.serial}</p></div>
    )
}
export default Tally