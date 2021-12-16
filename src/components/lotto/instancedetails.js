import {useState,useEffect } from 'react';
import KeyValues from '../keyValues';
import {Button} from 'primereact/button';
export default function Details({address,contract}){

	 let [target,setTarget] = useState(null);
	 let [manager,setManager] = useState(null);
	 let [created,setCreated] = useState(null);
	 let [ticketCost,setTicketCost] = useState(null);
	 let [current,setCurrent] = useState(null);
	 let [ticketsSold,setTicketsSold] = useState(null);
	 let [status,setStatus] = useState(false)
	 let [winner,setWinner] = useState(null)
	 let [winningAmt,setWinningAmt] = useState(0)
	 async function getWinner(){
	 	let event = await contract.getPastEvents(
	 		'drawn',
	 		{fromBLock:0, toBlock: 'latest'}
	 		)
	 	
	 	if(event.length > 0)
	 		{
	 		event = event[0].returnValues
	 		setWinner(()=>event.winner)
			setWinningAmt(()=>event.prize)}
	 }
	 async function readGenisis()
	 {
	 	let event = await contract.getPastEvents(
	 		'genisis',
	 		{ fromBlock: 0, toBlock: 'latest'}
	 		)
	 	console.log(event)
	 	if(event.length >0)
		 	{			
		 				event = event[0].returnValues
		 			 	setTarget(()=>event.targetPool)
		 			 	setManager(()=>event.manager)
		 			 	setCreated(()=>{ 
		 			 		let timeStamp = new	Date(event.date*1000)
		 			 		return timeStamp.toString()
		 			 	})
		 	}
	
	 }
	 async function getStatus(){
	 	let status = await contract.methods.current_state().call()
	 	console.log(status)
	 	setStatus(()=>!status)
	 }
	async function fnCalls() {

		let ticketCost =  await contract.methods.ticket_cost().call()
		let current = await contract.methods.balance().call()
		let ticketsSold = await contract.methods.tickets_sold().call()

		setCurrent(()=>String(current))
		setTicketCost(()=>String(ticketCost))
		setTicketsSold(()=>String(ticketsSold))



	}
	 function init()
	 {	setTarget(()=>null)
	 	setCurrent(()=>null)
	 	setManager(()=>null)
	 	setCreated(()=>null)
	 	setTicketsSold(()=>null)
	 	setStatus(()=>false)

	 	readGenisis()
	 	fnCalls()
	 	getStatus()
	 }
	 useEffect(()=>{
	 	init()
	 },[])
	 useEffect(()=>{
	 	if(status)
	 		{
	 			getWinner()
	 		}
	 },[status])

	 let targetInfo =( <span>
	 					<i className="pi " style={{'max-width': '16ch'}}>
	 						  The prize pool must grow to the above quantity before manager can draw lottery.
	 					</i>
	 	
	 					</span>)
			
		return(
			<>	
				<KeyValues heading = {'Status: '} amt={status? 'Winner Announced':'Active (Refund and sale of tickets allowed'} />				
				{!!winner ? <KeyValues heading = {'Winner '} amt={winner} /> :''}
				{!!winner ? <KeyValues heading ={'Winning Prize'}amt ={winningAmt} />: '' }
				<KeyValues heading = {'Date Created:'} amt={created} />
				<KeyValues heading = {'Ticket Cost:'} amt={ticketCost} suffix= ' wei' />
				<KeyValues heading = {'Tickets Sold:'} amt={ticketsSold} />
				<KeyValues heading = {'Current Prize Pool:'} amt = {current} suffix = ' wei'/>
				<KeyValues heading = {'Target Prize Pool:'} amt={target}  suffix =  ' wei'/>
				<KeyValues heading = {'Manager:'} amt={manager} />
				<Button className=" p-button-text p-button-raised width100"  
				onClick={init}
				label="Reload Data" 
				icon="pi pi-replay"/>
				
			</>
			)
}