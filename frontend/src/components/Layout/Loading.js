
import React from 'react'
import ReactLoading from 'react-loading'
const Loading = () => {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center'
        }}>
            <ReactLoading type='bars' color='#678983' height={'20%'} width={'20%'} />
        </div>
    )
}

export default Loading