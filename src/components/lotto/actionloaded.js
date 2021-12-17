import {useState,useRef} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import { Accordion, AccordionTab } from 'primereact/accordion';
import {Tooltip} from 'primereact/tooltip';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import Web3 from 'web3';

export default function ActionLoaded({contract}){

	let toast = useRef()
	
	let [purchasing, setPurchasing] = useState(false)
	let [refund, setRefund] = useState(false)
	let [result, setResult] = useState(false)

	let connected = useSelector(state=>state.auth.loggedIn)
	let account = useSelector(state=>state.auth.account)

	// functions
	async function buyTicket(){
		let reciept
		setPurchasing(()=>true)
		try{
			let ticketCost =  await contract.methods.ticket_cost().call()
			reciept = await contract.methods.buy_ticket().send({from: account, value: ticketCost})
			toast.current.show({severity: 'success', summary: 'Purchase Successful', life:5000})
			console.log(reciept)
		}
		catch(error)
		{	if(error.code === 4001)
			{
				toast.current.show({severity:'error',summary:'Cancelled by user'})
			} else if(error.code === -32603) {
				toast.current.show({severity:'error', summary:'Most Prolly you are offline'})
			}  else {
			toast.current.show({severity: 'error',summary:'Transaction NOT Completed', life:5000})
			}
			console.log(error)

		}
		setPurchasing(()=>false)

	}
	async function drawResults() {
		setResult(()=>true)
		try{
			let reciept = await contract.methods.draw().send({from:account})
			toast.current.show({severity: 'success', summary: 'Results Drawn Succesfully', life:5000})
		}
		catch(error)
		{

			if(error.code === 4001)
			{
				toast.current.show({severity:'error',summary:'Cancelled by user'})
			} else if(error.code === -32603) {
				toast.current.show({severity:'error', summary:'Most Prolly you are offline'})
			
			} else {
			toast.current.show({severity: 'error',summary:"Didnt't worked Not sure why?", life:5000})
			}
			console.log(error)
		}
		setResult(()=>false)
	}

	async function displayTickets()
	{	function lateTickets()
		{
			toast.current.show({severity: 'info', summary:'Check your internet connection ', detail:'Fetching no. of tickets, generally executes faster.'})
		}
		const timer = setTimeout(lateTickets,7000)
		let numberOfTickets = await contract.methods.my_tickets().call({from: account})
		toast.current.show({severity: 'info', summary: `You have ${numberOfTickets} Tickets`, 
					sticky:true})
		clearTimeout(timer)
	}
	async function getRefund(){
		setRefund(()=>true)
		try{
			let reciept = await contract.methods.ticket_refund().send({from: account})
			toast.current.show({severity: 'success', summary: 'Refund Successful', life:5000})
		}
		catch(error)
		{
			if(error.code === 4001)
			{
				toast.current.show({severity:'error',summary:'Cancelled by user'})
			} else if(error.code === -32603) {
				toast.current.show({severity:'error', summary:'Most Prolly you are offline'})
			
			} else {
			toast.current.show({severity: 'error',summary:'Refund NOT Completed', life:5000})
			}
			console.log(error)
		}
		setRefund(()=>false)
	}

	const player = <><i className="pi pi-play" /> Player Actions</>
	const manager = <><i className="pi pi-briefcase" /> Manager Actions</>
	return (
		<>
		<Accordion>
			<AccordionTab header={player} disabled={!!!connected && !!!account}
			placeholder="Top"
			tooltip={!!!connected ? 'Connect Wallet to use this tab':''}
			tooltipOptions={{position: 'top'}}
			
			>
			<div>
				
				<Button icon="pi pi-money-bill" 
				label={ purchasing?  <>  <i className="pi pi-spin pi-spinner"/> Initiated </>: "Buy Ticket"} 
				onClick ={buyTicket}
				disabled={purchasing}
				className={ purchasing ?  " width100 p-button-raised": " p-button-text width100 p-button-raised" }/>
				<br/>
				<br/>
				<span>
					<Button icon="pi pi-ticket" label="My Tickets"
					onClick={displayTickets}
					className="p-button-raised p-button-text width100"/>
				</span>
				<br/>
				<br/>
				<Button icon="pi pi-reply" 
				onClick={getRefund}
				disabled={refund}
				label={ refund ?  <>  <i className="pi pi-spin pi-spinner"/> Initiated </>: "Refund A Ticket"}
				className={ refund ?  " width100 p-button-raised p-button-danger": " p-button-text width100 p-button-danger p-button-raised" }/> 
 
				
			</div>
			</AccordionTab>
			<AccordionTab header={manager} disabled={!!!connected && !!!account}
			placeholder="Top"
			tooltip={!!!connected ? 'Connect Wallet to use this tab':''}
			tooltipOptions={{position: 'top'}}
			>
			<Button icon = "pi pi-file" 
			onClick={drawResults}
			disabled={result}
			label={result ? <> <i className="pi pi-spin pi-spinner"/> Initiated </> :"Draw Results"} 
			className={result ?"p-button-raised width100": "p-button-raised p-button-text width100"}
			/>
			</AccordionTab>
		</Accordion>
		<Toast ref={toast} position="bottom-right"/>
		</>
		)
}