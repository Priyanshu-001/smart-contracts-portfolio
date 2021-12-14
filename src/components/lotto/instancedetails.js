import {useState,useEffect } from 'react';
import KeyValues from '../keyValues';
export default function Details({address,contract}){

	 let [target,setTarget] = useState(null);
	 let [manager,setManager] = useState(null);
	 let [created,setCreated] = useState(null);
	 let [ticketCost,setTicketCost] = useState(null);
	 async function readGenisis()
	 {
	 	let event = await contract.getPastEvents(
	 		'genisis',
	 		{ fromBlock: 0, toBlock: 'latest'}
	 		)
	 	event = event[0].returnValues
	 	setTarget(()=>event.targetPool)
	 	setManager(()=>event.manager)
	 	setCreated(()=>{ 
	 		let timeStamp = new	Date(event.date*1000)
	 		return timeStamp.toString()
	 	})
	 	console.log(event.date)
	 }
	async function getTicketCost() {
		let ticketCost =  await contract.methods.ticket_cost().call()
		setTicketCost(()=>(String(ticketCost)))
	}
	 useEffect(()=>{
	 	readGenisis()
	 	getTicketCost()
	 },[])
			
		return(
			<>	<KeyValues heading = {'Date Created:'} amt={created} />
				<KeyValues heading = {'Ticket Cost:'} amt={ticketCost + ' wei'} />
				<KeyValues heading = {'Target Prize Pool:'} amt={target + ' wei'} sub="120 "/>
				<KeyValues heading = {'Manager:'} amt={manager} />
				
				
			</>
			)
}