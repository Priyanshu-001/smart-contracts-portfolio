// import Web3 from 'web3'
// import {useState} from 'react'
// import abi from '../contracts/lotto/lotto.json'
import TitleCard from '../components/titlecard';
import PlayGround from '../components/playground';

export default function MainPage()
{	
	// const address = '0xC3A8004de102053cE020B544e3E53216E35ff76B'
	// let [userAccount,setUserAccount] = useState()
	// let [ticketCost, setTicketCost] = useState()
//     let web3
//     // let [contract,setContract] = useState()
//     async function buyTicket(){
//     	try{
//     	let reciept  = await contract.methods.buy_ticket().send({from: userAccount, value:  ticketCost})
//     	console.log(reciept)
//     }
//     catch(error)
//     {
//     	console.log(error)
//     }
//     }
// 	async function getTicketCost() {
// 		let ticketCost =  await contract.methods.ticket_cost().call()
// 		setTicketCost(()=>(String(ticketCost)))
// 	}
// 	async function getManager(){
// 		let manager = await contract.methods.manager().call()
// 		console.log(manager)
// 	}
// 	async function getRefund(){
// 		try{
// 			let refund = await contract.methods.ticket_refund().send({from: userAccount})
// 			console.log(refund)
// 		}
// 		catch(error)
// 		{
// 			console.log(error)
// 		}
// 	}
// 	async function  getMetaMask()
// 	{	
// 		try{
// 			if(window.ethereum)
// 				{	web3 = new Web3(window.ethereum)
// 				    const userAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
// 					setUserAccount(()=>(userAccounts[0]))
// 				}
// 			else if(window.web3)
// 				{
// 					web3 = new Web3(window.web3.currentProvider)
// 				    const userAccounts = await web3.eth.getAccounts()
// 				    setUserAccount(()=>(userAccounts[0]))
// 				}
// 			// const contractAbi = JSON.parse(JSON.stringify(abi))
// 			 let Contract = new web3.eth.Contract(abi.abi,address)
// 			setContract(()=>(Contract))
// 			// console.log(web3.currentProvider)
// 
// 
// 		}
// 		catch(error){
// 			console.log(error)
// 		}
	// }
	return(
		<>
		<TitleCard />
		<PlayGround/>
		{/* <h1>{userAccount}</h1> */}
		{/* <h2> Ticket cost = {ticketCost} wei</h2> */}
		{/* <button id="enable" onClick={getMetaMask}> Enable</button> */}
		{/* <button id = "ticket_cost" onClick={getTicketCost}> 💸Cost</button> */}
		{/* <button id = "getManager" onClick={getManager}> manager</button> */}
		{/* <button id = "ticket_refund" onClick={getRefund}> Refund</button> */}
		{/* <button id = "buy_ticket" onClick={buyTicket}> Buy Ticket</button> */}

		
		</>
		)
	
}