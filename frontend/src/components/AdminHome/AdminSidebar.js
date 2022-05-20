import React from 'react'
import { Link } from 'react-router-dom'
import Styles from "./AdminSidebar.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux"
import { faArrowRightFromBracket, faCirclePlus, faHouse, faP, faPen, faPencil, faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { logoutAdmin } from '../../actions/adminaction'
const AdminSidebar  = () => {
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(logoutAdmin());
        window.location = "/";
    }

  return (
    <div className={Styles.SidebarContainer}>
    <div className={Styles.Links}>
        <div className={Styles.Avatar}>

        </div>

        <div className={Styles.Link}>
                    <Link to={'/admin'} className={`${Styles.Text}`}>         
        <FontAwesomeIcon icon={faHouse} className={Styles.Font} />
                        Home
                    </Link>
                </div>


                <div className={Styles.Link}>
                    <Link to={'/createreseller'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faCirclePlus} className={Styles.Font} />
                        Reseller
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <Link to={'/createcustomer'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faCirclePlus} className={Styles.Font} />
                        Customer
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <Link to={'/editreseller'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faPencil} className={Styles.Font} />
                        Reseller
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <Link to={'/editcustomer'} className={Styles.Text}>
                        <FontAwesomeIcon icon={faPencil} className={Styles.Font} />
                        Customer
                    </Link>
                </div>
                <div className={Styles.Link}>
                    <Link onClick={handleClick} className={Styles.Text}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className={Styles.Font} />
                        Logout
                    </Link>
                </div>
            </div>
            </div>
  )
}

export default AdminSidebar