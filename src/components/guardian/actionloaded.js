import {Accordion, AccordionTab} from 'primereact/accordion';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
// import {InputText} from 'primereact/inputtext';
import {useState,useEffect,useRef} from 'react';
// import Web3 from 'web3'
import {useSelector} from 'react-redux';

export default function ActionLoaded({contract})
{	
	let connected = useSelector(state=>state.auth.loggedIn)
	let web3 = useSelector(state=>state.auth.web3)
	let account = useSelector(state=>state.auth.account)

	const benifitted = <> <p className="width100" style={{backgroundColor:'var(--green-100)', color: 'var(--green-800)',padding:"1rem",marginTop:'-1rem'}}> <i className="pi pi-check"/> You are a benificary </p>  </>
	const noBenifit = <> <p className="width100" style={{backgroundColor:'var(--orange-100)', color: 'var(--orange-800)',padding:"1rem",marginTop:'-1rem'}}> <i className="pi pi-times"/> You are NOT a benificary </p>  </>
	const loadingBenifit = <> <p className="width100" style={{backgroundColor:'var(--blue-100)', color: 'var(--blue-800)',padding:"1rem",marginTop:'-1rem'}}> <i className="pi pi-spin pi-spinner"/> loading status </p>  </>

	const [isBenifit,setIsBenifit] = useState('loading')
	const [withdrawStatus,setWithdrawStatus] = useState(false)



	const toast = useRef(null)

	useEffect(()=>{
		// init()
		checkBenificary()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[connected,web3]
	)
	
	
	async function  outstandingBalance(){
		if(isBenifit === false)
			{
				toast.current.show({severity:'error',summary:'You are not a Benificary'})
				return;
			}
		else if(isBenifit === 'loading')
			{
				toast.current.show({severity:'info',summary:'Please wait for status to load'})
				return;
			}
			//isBenifit === true
			try{				
				let myBalance = await contract.methods.oustanding_withdrawls().call({from:account})
				
				// setShowBalance(true)
				toast.current.show({severity:'success',summary:`You have ${myBalance} withdrawls due`})
			}
			catch(error)
			{
				toast.current.show({severity:'error',summary:'some Error occured check console'})
			}
	}	
	async function withdraw()
	{	setWithdrawStatus(true)
		toast.current.show({severity:'info',summary:'Withdraw Initiated'})
		try{
			let reciept = await contract.methods.withdraw().send({from: account})
			console.log(reciept)
			toast.current.show({severity: 'success',summary:'Withdraw completed successfully',detail: 'check metmask'})
		}
		catch(error)
		{
			console.log(error)
			toast.current.show({severity:'error',summary:'Withdraw Unsuccessfull'})

		}

		setWithdrawStatus(false)
	}
	async function  checkBenificary(){
			let isBenifit  = await contract.methods.amIABenificary().call({from:account})
			setIsBenifit(isBenifit)
		}


	return (

		<>
		<Toast ref={toast} position="bottom-right" />
		<Accordion>
			<AccordionTab header="For Benificaries" disabled={!connected}>
		{isBenifit === true ? benifitted:isBenifit==='loading'?loadingBenifit:noBenifit}
			<Button label="Outstanding Withdrawls" 
			icon="pi pi-clock"  
			onClick={outstandingBalance}
			className="width100 p-button-text p-button-raised"
			/>

			<Button label={withdrawStatus? 'Withdraw Initiated':"Withdraw Amt "} 
			icon={"pi " + (withdrawStatus ? 'pi-spin pi-spinner' : " pi-download")}  
			onClick={withdraw}
			className={"width100 p-button-raised "+ (withdrawStatus ? '':'p-button-text')}
			disabled={withdrawStatus}
			/>

			</AccordionTab>
		</Accordion>
		</>
	)
}