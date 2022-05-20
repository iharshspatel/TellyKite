import React from 'react'
import Styles from './StatBar.module.css'
const StatBar = ({r,d,c,n}) => {
  return (
    <div className={Styles.Row}>
        <h5  className={Styles.TopResellerItem}>Total Resellers <br/> <span> {r}</span></h5>
        <h5 className={Styles.TopResellerItem}>Direct Customers <br/>  <span> {d}</span></h5>
        <h5 className={Styles.TopResellerItem}>Non-Direct Customers <br/> <span> {n}</span></h5>
        <h5 className={Styles.TopResellerItem}>Total Customers <br/>  <span> {c}</span></h5>
    </div>


  )
}

export default StatBar