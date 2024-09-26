import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts:[]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getContactList: ()=>{
				const store=getStore();
				store.contacts===undefined?null:
				fetch(`https://playground.4geeks.com/contact/agendas/RonZ`).then((response)=>{
					return response.ok?response.json():null;
				}).then((jsonData)=>{
					getActions().setContacts(jsonData.contacts);
					console.log(jsonData.contacts)
				}).catch((e)=>{console.log(e)})
			},
			setContacts:(contactList)=>{
				setStore({contacts:contactList})
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
