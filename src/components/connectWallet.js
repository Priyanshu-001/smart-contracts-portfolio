import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {useSelector, useDispatch} from 'react-redux';
import { Dialog } from 'primereact/dialog';
import Web3 from 'web3';
import {disconnect, connected} from '../app/auth';
import { Checkbox } from 'primereact/checkbox';
import {useRef, useState} from 'react';
export default function ConnectWallet(){
	
	let toast = useRef(null)
	let isSignedIn = useSelector(state=>state.auth.loggedIn)
	let dispatch = useDispatch()

	let [accepted,setAccepted] = useState(false)
	let [cmd1,setCmd1] = useState(false)
	let [cmd2,setCmd2] = useState(false)
	let [cmd3,setCmd3] = useState(false)


	async function getMetaMask()
	{	let web3 = null
		let accounts = null
		let currentAccount=null
		try{
			if(window.ethereum)
				{	web3 = new Web3(window.ethereum)
				    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
					currentAccount = accounts[0]

				}
			else if(window.web3)
				{
					web3 = new Web3(window.web3.currentProvider)
				    accounts = await web3.eth.getAccounts()
			 		currentAccount = accounts[0]

				}
			else{
				toast.current.show({severity: 'error', summary: 'MetaMask not found', 
					detail: 'Install Metamask and check if browser is not in incognito/private mode',
					life: 5000})
			}

			return {currentAccount,web3}
			
		}
		catch(error)
		{	toast.current.show({severity:'error',summary: 'Login not Succesfull', 
			detail:'The login prompt was rejected or try reloading',life:5000})
			console.log(error)

			return {currentAccount,web3}
		}
		
	}
	async function  toggle(){
		if(isSignedIn)
			{
				dispatch(disconnect())
				toast.current.show({severity:'success',summary:'Account disconnected successfully'})
			}
		else
			{
				
				let {currentAccount, web3} =  await getMetaMask();
				if(!currentAccount || !web3) //no metamask detected exit
					return
				//Check against mainet deployment
				let netId = await web3.eth.getChainId();
				
				if(netId === 1)
					{ 
						toast.current.show({severity:'error', 
							sticky: true,
							summary:'PLease change to network to testnet',
							detail:'You are on ethereum mainnet switch to testnets like ROPSTEN/RINKEBY/Local Ganache etc'})
					}
				else if(!!web3 && !!currentAccount)
					{
						toast.current.show({severity:'success', summary: 'Login successfull', 
							detail:`Connected with account ${currentAccount}`, life:5000})
						dispatch(connected({currentAccount: currentAccount, web3: web3}))
					}
				else if(!!web3 ^ !!currentAccount){
					toast.current.show({severity: 'error', summary:'Something went wrong', 
						detail:'try reloading and reconnecting'})
				}
				
			}
			
	}
	function accept(val=true){
		setAccepted(()=>{
			return cmd1 &&cmd2 && cmd3 && val
		})
		if(!(cmd1 &&cmd2 && cmd3 && val))
			toast.current.show({severity:'error',summary:'Heyy do not try to sneak out of this.'})
		else
			toast.current.show({severity:'success',summary:'Thanks for viewing this portfolio.'})

	}
	const footer = (
		<>
				<Button label="I accept" onClick={accept}> </Button>
		</>
		)
	return(
		<>
		<Dialog visible={!accepted} 
		maximizable modal header="I promise to " 
		className="diag" 
		style={{width: '60vw', fontSize: '1.3rem'}} 
		footer={footer}
		onHide={()=>accept(false)}
		>
		<span>
		<Checkbox onChange={e=>setCmd1(()=>e.checked)} checked={cmd1} style={{margin:'0 1rem', marginBottom: '0.3rem'}} />
		 Deploy and load contracts only from testnets like ROPSTEN/RINKEBY or local Ganache Server, etc. </span>
		<br></br>
		<br></br>
		<span>
		<Checkbox onChange={e=>setCmd2(()=>e.checked)} checked={cmd2} style={{margin:'0 1rem', marginBottom: '0.3rem'}} />
		 Accept that this is for learning purpose only.</span>
		<br></br>
		<br></br>
		<span>
		<Checkbox onChange={e=>setCmd3(()=>e.checked)} checked={cmd3}  style={{margin:'0 1rem', marginBottom: '0.3rem'}}/>
		  Never ever deploy on MAINNET.   </span>
		<br></br>

		</Dialog>
		<Toast ref={toast} position="bottom-right" />
		<span>
			<Button label={isSignedIn? "Disconnect " :"Connect Wallet"} 
			icon={ isSignedIn ? "pi pi-ban":"pi pi-wallet"} 
			className="p-button-raised p-button-error" onClick={toggle}/>
		</span> 
		</>
		)
}
