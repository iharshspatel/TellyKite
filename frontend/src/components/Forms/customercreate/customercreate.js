import React, { useEffect, useState, useRef } from 'react'
import Styles from "./customercreate.module.css"
// import Form from '../form'
import { useDispatch, useSelector } from "react-redux"
import { createCustomer } from "../../../actions/customeraction"
import { getResellers } from '../../../actions/adminaction'
import Select from 'react-select'

export const CustomerCreate = ({ history }) => {
    const dispatch = useDispatch()
    const ref = useRef();
    const ref1 = useRef();
    const [option, setOption] = useState();
    const [TellyAccounts, setTellyAccounts] = useState([{tellyUsername:"", tellyPassword:"", tellySerial:""}]);

    const { admin, isAuthenticatedAdmin, errorAdmin, role } = useSelector(state => state.admin);
    const {resellers} = useSelector(state => state.resellers);
    
    useEffect(()=>{
        if(resellers){
            let options = resellers.map((item)=>{
              return  {id:item._id, label:item.username}
            })
            setOption(options)
        }
    },[resellers])

    
    useEffect(() => {
        if (isAuthenticatedAdmin === false) {
            console.log("create form returning")
            history.push("/");
        }
    }, [isAuthenticatedAdmin]);

    useEffect(()=>{
        dispatch(getResellers())
    },[dispatch])

    const customStyles = {
        option : (provided, state) => ({
            ...provided,
            // border: "2px solid red"
            backgroundColor:"white",
            padding:"20px",
            color:"#6B8FEA"
        }),

        container : (provided,state) => ({
            ...provided,
            // border:"2px solid green",
            width:"70%",
            margin:"20px auto",
            color:"black"
        }),

        input: (provided,state) => ({
            ...provided,
            // color: "#6B8FEA"
            color:"white"
        })

        
    }
    let initialValue = {
        username: "",
        password: "",
        email: "",
        reseller_id:"",
        company: "",
        address: "",
        website: "",
        location: "",
        cellno: "",
        telephone: "",
        plan_type: "",
        Telly_version: "",
        mode: "direct",
        Expiry:"",
        purchasedate:"",
        TellyAccounts:TellyAccounts
    }
    const [val, setVal] = useState(initialValue)


    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
        console.log(val)
    }

    function handleClick(e) {
        e.preventDefault();
        console.log(val)
        dispatch(createCustomer(val));
        // alert.success("Reseller Created")
        history.push("/admin");

    }

    const resellerSelectHandler = (value) => {
        console.log(value)
        setVal({...val, reseller_id:value.id})
    }

    const handleTallyChange = (e, i) => {
        let newFormValues = [...TellyAccounts];
        newFormValues[i][e.target.name] = e.target.value;
        setTellyAccounts(newFormValues);

        setVal({...val, TellyAccounts:TellyAccounts})
        console.log(val)
    };

    let addFormFields = (e) => {
        e.preventDefault()
        setTellyAccounts([...TellyAccounts, { tellyUsername: "", tellyPassword: "", tellySerial:"" }])
     }
    

    return (
        <>
            <div className={Styles.Container}>
                <form className={Styles.Form}>
                    <input onChange={handleChange} name="username" autoFocus value={val.username} placeholder='Username' className={Styles.Input} />
                    <input onChange={handleChange} name="password" type="password" value={val.password} placeholder='Password' className={Styles.Input} />
                    <input onChange={handleChange} name="email" value={val.email} placeholder='Email' className={Styles.Input} />
                    <input onChange={handleChange} name="company" value={val.company} placeholder='Company Name' className={Styles.Input} />
                    <input onChange={handleChange} name="address" value={val.address} placeholder='Address' className={Styles.Input} />
                    <input onChange={handleChange} name="website" value={val.website} placeholder='Website' className={Styles.Input} />
                    <input onChange={handleChange} name="location" value={val.location} placeholder='Location' className={Styles.Input} />
                    <input onChange={handleChange} name="cellno" value={val.cellno} placeholder='Cell No' className={Styles.Input} />
                    <input onChange={handleChange} name="telephone" value={val.telephone} placeholder='Telephone Number' className={Styles.Input} />
                    <input onChange={handleChange} name="plan_type" value={val.plan_type} placeholder='Plan Type' className={Styles.Input} />
                    <input onChange={handleChange} name="Telly_version" value={val.Telly_version} placeholder='Telly Version' className={Styles.Input} />
                    
                    
                    <input onChange={handleChange} type="text"
                    ref={ref1}
                    onFocus={()=>{
                        ref1.current.type="date"
                    }}
                    onBlur={()=>{
                        ref1.current.type="text"
                    }}
                    pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])-(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])-(?:30))|(?:(?:0\[13578\]|1\[02\])-31))" 
                     name="Expiry" value={val.Expiry} placeholder='Expiry' className={Styles.Input} />


                    <input onChange={handleChange} type="text"
                    ref={ref}
                    onFocus={()=>{
                        ref.current.type="date"
                    }}
                    onBlur={()=>{
                        ref.current.type="text"
                    }}
                    pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])-(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])-(?:30))|(?:(?:0\[13578\]|1\[02\])-31))" 
                     name="purchasedate" value={val.purchasedate} placeholder='Date of Purchase' className={Styles.Input} />
                    
                    
                    <Select styles={customStyles} options={option} onChange={resellerSelectHandler}/>

                    {
                        TellyAccounts.map((element,index)=>(
                            <div className={Styles.TellyAccountInput}>
                                <input placeholder='Telly Account Username' className={Styles.Input} name='tellyUsername' value={element.tellyUsername || ''} onChange={(e)=> {handleTallyChange(e,index)}}/>
                                <input placeholder='Telly Account Password' className={Styles.Input} name='tellyPassword' value={element.tellyPassword || ''} onChange={(e)=> {handleTallyChange(e,index)}}/>
                                <input placeholder='Telly Account Serial Number' className={Styles.Input} name='tellySerial' value={element.tellySerial || ''} onChange={(e)=> {handleTallyChange(e,index)}}/>
                            </div>
                        ))
                    }
                    <button type="submit" onClick={handleClick} className={Styles.Button} >Submit</button>
                    <button className={Styles.Add} onClick={(e)=>{addFormFields(e)}}>Add</button>
                </form>
            </div>
        </>
    )
}
