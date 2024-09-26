import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Modal=(props)=>{
    const {store,actions}=useContext(Context);
    const removeContact= async ()=>{
		await fetch(`https://playground.4geeks.com/contact/agendas/RonZ/contacts/${props.id}`,{
			method:"DELETE"
		});
        actions.getContactList();
	}

    return(
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Delete Contact</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body fs-5">
                    Are you sure you want to delete this contact?
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" data-bs-dismiss="modal" aria-label="confirm" onClick={removeContact}>Confirm</button>
                </div>
            </div>
        </div>
    )
}