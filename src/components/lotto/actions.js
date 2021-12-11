/* global BigInt */
import { Accordion, AccordionTab } from 'primereact/accordion';
import Web3 from 'web3';
import { useState,useEffect } from 'react';
import { InputMask } from 'primereact/inputmask';
import {InputNumber} from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
export default function Actions(){


	let [add,setAdd] = useState('Address')
	let [prizePool,setPrizePool] = useState(0n)
	let [minTickets, setMinTickets] = useState(5)
	let [cost, setCost] = useState(0)
	let [fees, setFees] = useState(0)
	useEffect(()=>{
		let tenE12 = BigInt(1e12)
		let Cost = BigInt(cost*1e6)
		Cost = Cost*tenE12
		let Tickets = BigInt(minTickets)
		setPrizePool(()=>(Tickets*Cost))
	},[cost,minTickets])
	const deploy = <><i className="pi pi-bolt" /> Deploy </>
	const load = <> <i className="pi pi-download" /> Load </>
	
	return(
		<Accordion >
								<AccordionTab header={deploy}>
							<div style={{padding: '0 2.8rem'}}>
								<div className="info">
								
									<h2>Min Prize Pool</h2>
									{/* <code>min_ticket * ticket_prize</code> */}
									<code>
									<h2>{(prizePool).toString().slice(0,(prizePool).toString().length-18)|| 0}.{prizePool.toString().slice(prizePool.toString().length-18,prizePool.toString().length-11)||0} ether</h2>
									</code>
								</div>
								<label htmlFor="cost" className="fixedLabel" >Ticket Price</label>
								 <div className="p-inputgroup">
								<InputMask
								id="cost"
								unmask={false}
								mask="9.999999"
								slotChar='0'
								placeholder="0.000000"
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
								mask="9.999999"
								slotChar='0'
								placeholder="0.000000"
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
    							decrementButtonClassName="p-button-text p-button" 
    							incrementButtonClassName="p-button-text p-button" 
    							step={1}
    							min={5}
    							incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" 
    							suffix=" Tickets"/>
    							
									<Button icon="pi pi-bolt" className="p-button-raised p-button-text" 
									style={{width:'100%'}}
									label="Deploy Contract">  </Button>
								</AccordionTab>
								<AccordionTab header={load}>
									<div  className="p-float-label" style={{marginTop: '1rem', width: '100%'}} width="100%">
									  <InputText id="address" className="width100" label="Addresss" value={add} 
									  onChange={(e) => setAdd(e.target.value)} width="100%" />
									   <label htmlFor="address">Address</label>
									</div>
									  <Button  className="p-button-raised p-button-text" style={{width:'100%'}}
									  label="Load from address"
									  icon="pi pi-download" > 

									  </Button>
								</AccordionTab>
							</Accordion>
		)
}