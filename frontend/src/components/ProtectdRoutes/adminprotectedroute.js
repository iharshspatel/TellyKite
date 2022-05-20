// import { is } from 'express/lib/request';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Redirect } from 'react-router-dom';

const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {
    const { loadingAdmin, isAuthenticatedAdmin, admin } = useSelector((state) => state.admin);
    // console.log("protected route running")
    return (
        <Fragment>
            {loadingAdmin === false && (

                < Route
                    {...rest}
                    render={(props) => {
                        if (!isAuthenticatedAdmin) {
                            { console.log("not authenticated") }
                            return <Redirect to="/" />
                        }
                        return <Component {...props} />;
                    }}
                />

            )}
        </Fragment>
    )
}

export default ProtectedRouteAdmin