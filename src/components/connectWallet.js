import {Button} from 'primereact/button';
import {Toast} from 'primereact/toast';
import {useSelector, useDispatch} from 'react-redux';
import Web3 from 'web3';
import {disconnect, connected} from '../app/auth';
import {useRef} from 'react';
export default function ConnectWallet(){
	
	let toast = useRef(null)
	let isSignedIn = useSelector(state=>state.auth.loggedIn)
	let dispatch = useDispatch()

	async function getMetaMask()
	{	let web3 = null
		let accounts = null
		let currentAccount=null
		try{
			if(window.ethereum)
				{	web3 = new Web3(window.ethereum)
				    accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
				}
			else if(window.web3)
				{
					web3 = new Web3(window.web3.currentProvider)
				    accounts = await web3.eth.getAccounts()[0]
				}
			else{
				toast.current.show({severity: 'error', summary: 'MetaMask not found', 
					detail: 'Install Metamask and check if browser is not in incognito/private mode',
					life: 5000})
			}
			let currentAccount = accounts[0]
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
				// let obj = await getMetaMask();
				// console.log(obj)
				let {currentAccount, web3} =  await getMetaMask();
				console.log(currentAccount)
				if(!!web3 && !!currentAccount)
					{
						toast.current.show({severity:'success', summary: 'Login successfull', 
							detail:`Connected with account ${currentAccount}`, life:5000})
						dispatch(connected({account: currentAccount, web3: web3}))
					}
				else if(!!web3 ^ !!currentAccount){
					toast.current.show({severity: 'error', summary:'Something went wrong', 
						detail:'try reloading and reconnecting'})
				}
				
			}
			
	}
	console.log(isSignedIn)
	return(
		<>
		<Toast ref={toast} position="bottom-right" />
		<span>
			<Button label={isSignedIn? "Disconnect " :"Connect Wallet"} 
			icon={ isSignedIn ? "pi pi-ban":"pi pi-wallet"} 
			className="p-button-raised p-button-error" onClick={toggle}/>
		</span> 
		</>
		)
}
