import React, { useContext, useEffect, useState } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Modal } from "../component/Modal";

export const Home = () => {
	const {store,actions} = useContext(Context);
	const [currentID,setCurrentID] = useState('');


	const listOfImages=['https://th.bing.com/th/id/R.65a0e0c4b5ab2e3579c78afa8ab6ec78?rik=bzNLc5NB21WkAQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fPrwFrU0.jpg&ehk=5f4xOp8T3P9UpU%2fbg08fRx%2f%2fhT5IUt%2fOXJY4%2b7XZXhY%3d&risl=&pid=ImgRaw&r=0',
						'https://th.bing.com/th/id/R.b42d077f7608ecfe94a08b5d4213eb66?rik=0hx9eqp4xZnIiQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f0%2fb%2f5%2f175341.jpg&ehk=EG20ra9%2fkw8bRtQ5LCMLWYQ4lE4GJ7WoUAw3QT7CP3s%3d&risl=&pid=ImgRaw&r=0',
						'https://th.bing.com/th/id/OIP.YpBNuelwmbqd767810hHBgHaE8?rs=1&pid=ImgDetMain',
						'https://th.bing.com/th/id/OIP.wLdi0QzTK0FaGSuIZeGaggHaFj?w=246&h=185&c=7&r=0&o=5&pid=1.7',
						'https://th.bing.com/th/id/OIP.L2O6ffZs-Nuii9Pe7zfYBQHaFj?w=238&h=180&c=7&r=0&o=5&pid=1.7'

	]
	useEffect(()=>{
		actions.getContactList();
	},[])

	const addAgenda=()=>{
		fetch(`https://playground.4geeks.com/contact/agendas/RonZ`,{
			method:"POST",
			body:{},
			headers: {'content-type': "application/json"}
		});
        actions.getContactList();
	}

	useEffect(()=>{
		addAgenda();
	},[])

	const getImage=()=>{
		let random=Math.floor(Math.random()*5);
		return listOfImages[random]
	}


	return(
		<div className="container-fluid w-50">
			<div className="col justify-content-end d-flex pb-2">
				<Link to='/AddEdit/add'>
					<button className="btn btn-success" style={{fontSize:'0.7vw'}}>Add new contact</button>
				</Link>
			</div>
			<div className="modal fade" id='deleteWarning' tabIndex="-1" role="dialog">
				<Modal id={currentID}/>
			</div>
			{store.contacts.map((contactInfo)=>{
				console.log(contactInfo)
				return (
				<div className="row border shadow mb-2 bg-body-tertiary rounded" key={contactInfo.id}>
					<div className='col-4'>
						<div className="d-flex justify-content-center my-3" style={{width:'16vw',height:'16vw'}}>
							<img style={{height:'100%',width:'100%'}} className="img rounded-circle" src={getImage()}/>
						</div>
					</div>
					<div className="col row align-items-top pt-3">
						<div className="row">
							<div className="col d-flex flex-column">
								<p className="py-1" style={{fontSize:'1.4vw'}}><strong>{contactInfo.name}</strong></p>
								<p style={{fontSize:'1vw'}}>
									<i className="fa-solid fa-location-dot mx-2 py-2"></i>
									{contactInfo.address}
								</p>
								<p style={{fontSize:'0.8vw'}}>
									<i className="fa-solid fa-phone-flip mx-2 py-2"></i>
									{`(${contactInfo.phone.slice(0,3)})-${contactInfo.phone.slice(3,6)}-${contactInfo.phone.slice(6,contactInfo.phone.length)}`}
								</p>
								<p style={{fontSize:'0.7vw'}}>
									<i className="fa-solid fa-envelope mx-2 py-2"></i>
									{contactInfo.email}
								</p>
							</div>
							<div className="col d-flex justify-content-end">
								<Link to={`/AddEdit/edit/${contactInfo.id}`}>
									<button style={{height:'2vw',width:'4vw',fontSize:'0.7vw'}} type="button" className="btn btn-secondary me-2"><i className="fa-solid fa-pencil"/></button>
								</Link>
								<button style={{height:'2vw',width:'4vw',fontSize:'0.7vw'}} type="button" className="btn btn-danger" aria-hidden='true' data-bs-toggle='modal' data-bs-target='#deleteWarning' onClick={()=>{setCurrentID(contactInfo.id)}}><i className="fa-solid fa-trash"/></button>
							</div>
						</div>
					</div>
				</div>
			)})}
		</div>
	)
};
