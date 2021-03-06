/* global BigInt */
import { Accordion, AccordionTab } from 'primereact/accordion';
import Web3 from 'web3';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useState,useEffect, useRef } from 'react';
import { InputMask } from 'primereact/inputmask';
import {InputNumber} from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import {Toast} from 'primereact/toast';
import { Button } from 'primereact/button';
import complied from '../../contracts/lotto/lotto.json'
export default function Actions(){
	
	const navigate = useNavigate()
	const [add,setAdd] = useState('')
	const [prizePool,setPrizePool] = useState('0')
	const [minTickets, setMinTickets] = useState(5)
	const [cost, setCost] = useState(0)
	const [fees, setFees] = useState(0)
	const [deploying,setDeploying] = useState(false)

	let web3 = useSelector(state=>state.auth.web3)
	let account = useSelector(state=>state.auth.account)
	let connected = useSelector(state=>state.auth.loggedIn)

	let toast = useRef()

	useEffect(()=>{
		let tenE12 = BigInt(1e12)
		let Cost = BigInt(cost*1e6)
		Cost = Cost*tenE12
		let Tickets = BigInt(minTickets)
		setPrizePool(()=>(String(Tickets*Cost)))
	},[cost,minTickets])
	

	function loadContract()
	{
		navigate(add)
	}
	async function  deployContract()
	{	setDeploying(()=>true)
		if(!connected || !web3)
			{
				toast.current.show({severity: 'error' , summary:'Please Connect metamask'})
			}
		else{
			let netId = await web3.eth.getChainId();
			if(netId === 1)
				{
					toast.current.show({severity:'error', 
						summary:'DO NOT DEPLOY TO MAINNET',
						detail: 'These are intended for educational and testing purpose only, Deploy to Test networks like ROPSTEN and RINKEBY only',
						sticky: true
						
					})
				}
			else {	
				let tenE12 = BigInt(1e12)

				let Cost = BigInt(cost*1e6)
				Cost = Cost*tenE12

				let Fees = BigInt(fees*1e6)
				Fees = Fees*tenE12

				let Tickets = BigInt(minTickets)
				let bytecode =  complied.hexByteCode
	
				toast.current.show({severity:'info', summary:'This may take several minutes',
					sticky:true, 
					detail:'Check with metamask for the status fo the transaction'})
				try{
					
					const instance = await new web3.eth.Contract(complied.abi).deploy({
						data:bytecode, 
						arguments: [String(Cost),String(Tickets),String(Fees)]
					}).send({from: account})
					
					toast.current.show({severity:'success',summary:'Great Success', detail:'Contract Mined Successfully redirecting you there'})
					setTimeout(()=>navigate(instance._address),3000)
				}
				catch(error)
				{	
						if(error.code === 4001)
						{
							toast.current.show({severity:'error',summary:'Cancelled by user'})
						} else if(error.code === -32603) {
							toast.current.show({severity:'error', summary:'Most Prolly you are offline'})
						}  else {
						toast.current.show({severity: 'error',summary:'Unkown Error could not Deploy ',detail: 'check in the console', life:5000})
						}
						console.log(error)


				}

			}
		}
		setDeploying(()=>false)


	}


	const deploy = <><i className="pi pi-bolt" /> Deploy </>
	const load = <> <i className="pi pi-download" /> Load </>

	return(
		<>
		<Accordion >
								<AccordionTab header={deploy}>
							<div className="infoWrapper">
								<div className="info">
								
									<h2>Min Prize Pool</h2>
									{/* <code>min_ticket * ticket_prize</code> */}
									<code>
									<h2>{Web3.utils.fromWei(prizePool,'ether')} ether</h2>
									</code>
								</div>
								<label htmlFor="cost" className="fixedLabel" >Ticket Price</label>
								 <div className="p-inputgroup">
								<InputMask
								id="cost"
								unmask={false}
								mask="99.999999"
								slotChar='0'
								placeholder="00.000000"
								value={cost}
								className="width100"
								onChange={(e) => setCost(e.value)}/>
								<span className="p-inputgroup-addon">Ether</span>
								</div>

								{/* Manager fees */}
								<label htmlFor="fees" className="fixedLabel">Max Manager Fees </label>
								 <div className="p-inputgroup">
								<InputMask
								id="fees"
								value={fees}
								unmask={false}
								mask="99.999999"
								slotChar='0'
								placeholder="00.000000"
								className="width100"
								onChange={(e) => setFees(e.target.value)}
								/>
								<span className="p-inputgroup-addon">Ether</span>
								</div>
							</div>
								<label htmlFor="ticket" className="fixedLabel" style={{marginLeft:'6ch'}}> Min Tickets</label>
								<InputNumber 
								id="ticket"
								placeholder="Min Tickets to be sold before drawing"
								value={minTickets} 
								onValueChange={(e) => setMinTickets(e.value)} showButtons 
								buttonLayout="horizontal"
								className="width100"
								inputClassName="counterExculsive"
    							decrementButtonClassName="p-button-text p-button" 
    							incrementButtonClassName="p-button-text p-button " 
    							step={1}
    							min={5}
    							incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" 
    							suffix=" Tickets"/>
    							
									<Button icon="pi pi-bolt" 
									disabled={deploying}
									className={"p-button-raised width100 "+ ( deploying? " ": "p-button-text") }
									label={deploying ?  <><i className="pi pi-spin pi-spinner"/> Deploying</> :"Deploy Contract"}
									onClick={deployContract}
										/>
									
								</AccordionTab>
								<AccordionTab header={load}>
									<div  className="p-float-label" style={{marginTop: '1rem', width: '100%'}} width="100%">
									  <InputText id="address" className="width100" label="Addresss" value={add} 
									  onChange={(e) => setAdd(e.target.value)} width="100%" />
									   <label htmlFor="address">Address</label>
									</div>
									  <Button  className="p-button-raised p-button-text" 
									  style={{width:'100%'}}
									  label="Load from address"
									  icon="pi pi-download" 
									  onClick={loadContract}
									  > 

									  </Button>
								</AccordionTab>
							</Accordion>
							<Toast ref={toast} position="bottom-right" />
							</>
		)
}