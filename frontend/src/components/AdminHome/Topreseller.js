import React from "react";
export const Topreseller = (props) => {
    return (
        <>

            <div>
                <p>{props.num + 1}. {props.name} : {props.customerCount}</p>
            </div>
        </>
    )
}