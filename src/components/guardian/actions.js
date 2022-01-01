/* global BigInt */
import Web3 from 'web3';
import {useSelector} from 'react-redux';
import { Accordion, AccordionTab } from 'primereact/accordion';
import {useNavigate} from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import {InputMask} from 'primereact/inputmask';
import {InputNumber} from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import complied from '../../contracts/guardian/guardian.json'
import {useState, useRef, useEffect} from 'react';



export default function Actions()
{	
	const connected = useSelector(state=>state.auth.loggedIn)
	const web3 = useSelector(state=>state.auth.web3)
	const account = useSelector(state=>state.auth.account)



	const [add,setAdd] = useState('')
	const [amt,setAmt] = useState('')
	const [totAmt,setTotAmt] = useState('0')
	const [times,setTimes] = useState('')
	const [dur,setDur] = useState(120)
	const [deploying,setDeploying] = useState(false)
	const [cuttoff, setCuttoff] = useState('')
	const [amtPer,setAmtPer] = useState(0)
	const [addresses,setAddresses] = useState([])
	const toast = useRef()
	const navigate = useNavigate()

	function loadContract(){
		navigate(add)
	}
	function updateBenificaries(){
		console.log('here')
		setAddresses(values=>{
			if(!!values)
				return [...values,'']
			else
				return ['']

		})

		console.log(addresses)
	}
	function newAddress(index,newValue)
	{	console.log(newValue)
		setAddresses(addresses=>addresses.map((value,id)=>{
			if(id===index)
				return newValue
			else
				return value
		}))
	}

	function addressFromClipboard(index)
	{
		window.navigator.clipboard.readText().then(
			value=>{
				newAddress(index,value)
			}
			)
		.catch(err=>{
			toast.current.show({severity:'error',
				summary:'Paste did not work this time',
				detail:'Use CTRL-V or long press + paste'
			})

		})
	}
	function removeAddress(index)
	{
		setAddresses(addresses=>addresses.filter((value,id)=>{
			return id !== index
		}))
	}
	// Refactor this boi
	async function deployContract() {
		setDeploying(true)
		if(!sanitityCheck())
			{
				setDeploying(false)
			return;
			}
		if(!connected || !web3)
			{
				toast.current.show({severity: 'error' , summary:'Please Connect metamask'})
			}
		else{
			let netId = await web3.eth.net.getChainId();
			if(netId === 1)
				{
					toast.current.show({severity:'error', 
						summary:'DO NOT DEPLOY TO MAINNET',
						detail: 'These are intended for educational and testing purpose only, Deploy to Test networks like ROPSTEN and RINKEBY only',
						sticky: true
						
					})
				}
				else {

					const weiAmt = web3.utils.toWei(amt || '0','ether')
					const timeThen = new Date(cuttoff || Date.now())
					const args = [
								addresses,
								String(weiAmt),
								String(dur),
								String(times),
								String(Math.ceil(timeThen.getTime()/1000))
					]
					console.log(args)
					try{

						var instance = await new web3.eth.Contract(complied.abi).deploy({
							data: complied.hexByteCode,
							arguments: args
						}).send({from: account, value: web3.utils.toWei(totAmt,'ether') })

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
			setDeploying(false)
	}

	function sanitityCheck()
	{	let returnValue = true
		if(addresses.length === 0 )
			{
				toast.current.show({severity:'error', summary:'Please add benificaries'})
				return false
			}
		addresses.forEach((address,id)=>{
			console.log(address,!address)
			if(!address)
				{
				toast.current.show({severity:'error', summary:`Please fill adresss no. ${id+1}`})
				returnValue = false

				return returnValue;
				}
		})
		if(!returnValue)
			return returnValue;
		if(!cuttoff)
			{
				toast.current.show({severity:'error',summary:'Please set cuttoff date'})
				returnValue = false
				return returnValue;
			}
		else{

			try{
				let d = new Date(cuttoff)
				if(d.getTime() < 0)
					{	returnValue =false
						toast.current.show({severity:'error',
							summary:`Sorry Cuttoff date cannot be less than ${new Date(0)}` })
						return false;
					}
			}
			catch(error)
			{	toast.current.show({severity:'error',summary:'Invalid cuttoff date'})
				
				return returnValue;
			}
		}

			return returnValue
		
	}
	useEffect(()=>{
		let AMT = BigInt(Web3.utils.toWei(amt || '0','ether') || 0)
		let TIMES =  BigInt(times)
		let amtPer = Web3.utils.fromWei(String(AMT*TIMES),'ether')
		setAmtPer(amtPer)
	},[amt,times])

	useEffect(()=>{
		let nB = BigInt(addresses.length)
		let indiv = BigInt(BigInt(Web3.utils.toWei(amtPer || '0','ether') || 0))
		let totAmt = indiv*nB
		totAmt = Web3.utils.fromWei(String(totAmt),'ether')
		setTotAmt(totAmt)

	},[amtPer,addresses.length])
	const load = <> <i className="pi pi-download" /> Load </>
	const deploy = <> <i className="pi pi-bolt"/> Deploy </>

	return(
	<>
		<Toast ref={toast}  position="bottom-right"/>
		<Accordion>
			<AccordionTab header={deploy}>
				<center><h2><code>Amount to be Deposited</code>
									<br/>
									{totAmt}
									<br/>
									Ether

								</h2></center>

				<center><h3><code>Amount per benificary {amtPer} Ether</code></h3></center>
				<label htmlFor="amt" className="fixedLabel" >Amount per withdrawl</label>
								<div className="p-inputgroup">
									<InputMask
									id="amt"
									unmask={false}
									mask="99.999999"
									slotChar='0'
									placeholder="00.000000"
									value={amt}
									className="width100"
									onChange={(e) => setAmt(e.value)}/>
									<span className="p-inputgroup-addon">Ether</span>
								</div>
				<div className="fixedLabel"  width="100%">
									<label htmlFor="times" className="p-float-label"> Times benificary can withdraw</label>

									<InputNumber 
									id="times"
									value={times} 
									onValueChange={(e) => setTimes(e.value)}
									className="width100"
	    							min={1}
	    							max={999999999}
	    							placeholder="Times benificary can withdraw"
	    							 />

	    		</div>
    			<div>
    				<label htmlFor="startDate" className="fixedLabel" >Start Date</label>
                     <Calendar 
                     id="startDate" 
                     value={cuttoff} 
                     mask="99/99/9999 99:99:99"
                     className="width100"
                     onChange={(e) => setCuttoff(e.value)} 
                     showTime showSeconds />
    			</div>
    			<center><h3><code>No. of Benificaries {addresses.length}</code></h3></center>
    				<Button 
    				onClick={updateBenificaries }
    				icon="pi pi-plus-circle"
    				className="p-button-outlined p-button-info width100" 
    				label="Add benificary" />	
    				
    				{
    					addresses.map((address,id)=>(
    						
    						<div style={{margin: '0.4rem 0px'}} key={id}>
    						<div className="p-inputgroup">
	    						<InputText id={`benificary${id}`}
	    									value={address}
	    									style={{"marginTop": "1rem"}}
	    									className="width100"
	    									placeholder={`Enter Address no ${id+1}` }
	    									onChange={(e)=>newAddress(id,e.target.value)}
	    									key={id}
	    						/>
	    						 <Button  className="p-button-text " 
	    						 label="Paste"
	    						 onClick={()=>addressFromClipboard(id)}
	    						 />
	    					</div>
    						<Button 
    						onClick={() => removeAddress(id) } 
    						label="Remove Addresss"
    						icon="pi pi-trash"
    						className="p-button-raised p-button-text width100 p-button-danger" >
    						</Button>
    						</div>
    						
    					))
    				}		
    				<div style={{marginTop:'1rem'}}>
    					<label htmlFor="seconds" className="fixedLabel" >Interval between next release</label>
	    				<div className="p-inputgroup">
	    						
	    					<InputNumber id="seconds" 
	    					min={0}
	    					onChange={e => setDur(e.value) }
	    					/>
	    					<span className="p-inputgroup-addon">Seconds</span>
	    				</div>
    				</div>

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
	</>
	)
}