import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

export const AddEdit=()=>{
    const {store,actions} = useContext(Context);
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");

    const params=useParams();

    const handleContact=async ()=>{
        let method=params.mode==='add'?'POST':'PUT'
        let isIDValue=params.contactID?params.contactID:''
        console.log(params.contactID,' ', isIDValue)
        // console.log(`https://playground.4geeks.com/contact/agendas/RonZ/contacts/${isIDValue}`)
        await fetch(`https://playground.4geeks.com/contact/agendas/RonZ/contacts/${isIDValue}`,{
			method:method,
			body:JSON.stringify({
				name:fullName,
				phone:phone,
				email:email,
				address:address
			}),
			headers: {'content-type': "application/json"}
		});
        actions.getContactList();
	}

    useEffect(()=>{
        if(params.mode==='edit'){
            console.log(params.mode)
            store.contacts.forEach(element => {
                if(parseInt(params.contactID)===element.id){
                    console.log(element)
                    setFullName(element.name);
                    setEmail(element.email);
                    setPhone(element.phone);
                    setAddress(element.address);
                }
            });
        }
    },[])
    return(
        <div className="container-fluid">
            <form className="col-6 mx-auto" style={{fontSize:'0.7vw'}}>
                <div class="form-group mb-4">
                    <label for="fullName">Full Name</label>
                    <input required={true} value={fullName} onChange={(e)=>{setFullName(e.target.value)}} type="text" class="form-control py-3" id="fullName" placeholder="Full Name"/>
                </div>
                <div class="form-group mb-4">
                    <label for="email">Email</label>
                    <input required={true} value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" class="form-control py-3" id="email" placeholder="Email@email.email"/>
                </div>
                <div class="form-group mb-4">
                    <label for="phone">Phone</label>
                    <input required={true} value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="phone" class="form-control py-3" id="phone" placeholder="(xxx)xxxxxxx"/>
                </div>
                <div class="form-group mb-4">
                    <label for="address">Address</label>
                    <input required={true} value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" class="form-control py-3" id="address" placeholder="123 Sesame street"/>
                </div>
                <Link to='/'>
                    <button className="btn form-control btn-primary py-2" style={{fontSize:'0.5vw'}} type="submit" onClick={handleContact}>save</button>
                </Link>
                <Link to='/'>
                    <a href='#' style={{fontSize:'0.5vw'}}>Or get back to contacts</a>
                </Link>
            </form>
        </div>
    )
}