import React from 'react'
import Styles from "./form.module.css"
const Form = () => {
    return (
        <div className={Styles.Container}>
            <form className={Styles.Form}>
                <input placeholder='Username' className={Styles.Input} />
                <input placeholder='Password' className={Styles.Input} />
                <input placeholder='Email' className={Styles.Input} />
                <input placeholder='Company Name' className={Styles.Input} />
                <input placeholder='Address' className={Styles.Input} />
                <input placeholder='Location' className={Styles.Input} />
                <input placeholder='Cell No' className={Styles.Input} />
                <input placeholder='Telephone Number' className={Styles.Input} />
                <button type="submit" className={Styles.Button} >Submit</button>
            </form>
        </div>
    )
}

export default Form




