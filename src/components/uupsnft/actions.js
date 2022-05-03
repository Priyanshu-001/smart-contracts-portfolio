import { Accordion, AccordionTab } from 'primereact/accordion';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { useState, useRef } from 'react';
import {Toast} from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import complied from '../../contracts/uupsnft/uupsnft.json'

export default function Actions(){
	const navigate = useNavigate()
	const [add,setAdd] = useState('')
	const [deploying,setDeploying] = useState(false)

	let web3 = useSelector(state=>state.auth.web3)
	let account = useSelector(state=>state.auth.account)
	let connected = useSelector(state=>state.auth.loggedIn)

	let toast = useRef()
	function loadContract()
	{	if(!add)
			return toast.current.show({severity:'error','summary':'Please add address'})
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
				else{
					try{
					let bytecode =  complied.hexByteCode
					const instance = await new web3.eth.Contract(complied.abi).deploy({
						data:bytecode, 
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


	return (	<>
				<Accordion>
					<AccordionTab header={deploy}>
						<Button className={"width100 p-button-raised " + (deploying ? "":"p-button-text")}
    						label={deploying ? "Deploying" :"Deploy"}
    						style={{marginTop:'1rem'}}
    						icon={"pi " +( deploying ?   "pi-spin pi-spinner": " pi-bolt")}
    						onClick={deployContract}
    						disabled={deploying}
    						/>
					</AccordionTab>
			<AccordionTab header={load} >
				<div  className="p-float-label" style={{marginTop: '1rem', width: '100%'}} width="100%">

				  <InputText id="address" className="width100" label="Addresss" value={add} 
				  onChange={(e) => setAdd(e.target.value)} width="100%" />
				   <label htmlFor="address">Address</label>
				</div>
			  <Button  
			  className="p-button-raised p-button-text" 
			  style={{width:'100%'}}
			  label="Load from address"
			  icon="pi pi-download" 
			  onClick={loadContract}
			  />
			</AccordionTab>		
		</Accordion>
			<Toast ref={toast} position="bottom-right" />
			</>

		)
}