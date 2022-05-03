import {useState,useRef,useEffect} from 'react'
import {useSelector} from 'react-redux';
import { Accordion, AccordionTab } from 'primereact/accordion';
import {Toast} from 'primereact/toast';
import {Button} from 'primereact/button';
import {Image} from 'primereact/image';
import {InputText} from 'primereact/inputtext';


export default function ActionLoaded({contract}){
	let toast = useRef()
	const [link,setLink] = useState('')
	const [minting, setMinting] = useState(false)
	const [transfering, settransfering] = useState(false)
	const [viewing, setviewing] = useState(false)
	const [currentOwner,setCurrentOwner] = useState('')
	const [add,setAdd] = useState('')
	const [tokenId, setTokenId] = useState('')
	const [tokenUrl, setTokenUrl] = useState('')




	let connected = useSelector(state=>state.auth.loggedIn)
	let web3 = useSelector(state=>state.auth.web3)
	let account = useSelector(state=>state.auth.account)
	useEffect(()=>{
	 setCurrentOwner('')
	 setTokenUrl('')
	},[tokenId])
	async function view(){
		try{
			setviewing(true)
			const currentOwner = await contract.methods.ownerOf(tokenId).call()
			const tokenUrl = await contract.methods.tokenURI(tokenId).call()
			setTokenUrl(tokenUrl)
			setCurrentOwner(currentOwner)
			toast.current.show({severity:'success','summary':'Successfully laoded token'})
		}
		catch(error){
			toast.current.show({'severity':'error',summary:'cant load the token', detail:'Check if your id is correct'})
			console.log(error)
		}
		finally{
			setviewing(false)
		}

	}
	async function mint(){
		try{
			setMinting(true)
			const {events} = await contract.methods.safeMint(account,link).send({from: account})
			const id = events.Transfer.returnValues.tokenId
			toast.current.show({severity:'success',summary:'Great Success', detail:`Minted with id ${id}`})
			setTokenId(id)
		}
		catch(err){
			toast.current.show({severity:'error',summary:'Error occured'})
			console.log(err)

		}
		finally{
			setMinting(false)
		}

	}
	async function transfer(){
		try{
			settransfering(true)
			await contract.methods.safeTransferFrom(account,add,tokenId).send({from: account})
			toast.current.show({severity:'success',summary:'Successfully transferred'})
		}
		catch(error){
			console.log(error)
			toast.current.show({severity:'error',summary:'Error'})
		}
		finally{
			settransfering(false)
		}

	}
	const viewingArea = <center>
							<p> Viewing details for Token {tokenId} </p>
							<br></br>
							<code> <h3>Owner: </h3>  {currentOwner} </code>
							 <h3>Assest </h3>
							 <Image src = {`${tokenUrl}` } alt="Image Preview" preview={true} object-fit="cover" width="auto" height="250px" onError={()=>toast.current.show({severity:'error',summary:'Not a valid Image'})}/>
							 <br/>
							<a href={tokenUrl} style={{color:'blue', fontSize:'1.2rem'}} target="_blank"> View Link   <i className="pi pi-external-link"></i> </a>

						</center>
	return (
				<>
						<Accordion>
							<AccordionTab header="Mint  via URL" disabled={!connected}>
									<div  className="p-float-label" style={{marginTop: '1rem', width: '100%'}} width="100%">
									  <InputText id="link" className="width100" label="link" value={link} 
									  onChange={(e) => setLink(e.target.value)} width="100%" />
									   <label htmlFor="link">Link</label>
									</div>
										 <Button className={"width100 p-button-raised " + (minting ? "":"p-button-text")}
    						label={minting ? "minting" :"mint"}
    						style={{marginTop:'1rem'}}
    						icon={"pi " +( minting ?   "pi-spin pi-spinner": " pi-link")}
    						onClick={mint}
    						disabled={minting}
    						/>
									
							</AccordionTab>
							<AccordionTab header="Transfer" disabled={!connected}>
								<div  className="p-float-label" style={{marginTop: '1rem', width: '100%'}} width="100%">
									  <InputText id="Add" className="width100" label="Add" value={add} 
									  onChange={(e) => setAdd(e.target.value)} width="100%" />
									   <label htmlFor="Add">Address</label>
								</div>
								<div  className="p-float-label" style={{marginTop: '1.5rem', width: '100%'}} width="100%">
									  <InputText id="TokenId" className="width100" label="TokenId" value={tokenId} 
									  onChange={(e) => setTokenId(e.target.value)} width="100%" />
									   <label htmlFor="TokenId">TokenId</label>
								</div>
							<Button className={"width100 p-button-raised " + (transfering ? "":"p-button-text")}
    						label={transfering ? "transfering" :"transfer"}
    						style={{marginTop:'1rem'}}
    						icon={"pi " +( transfering ?   "pi-spin pi-spinner": " pi-send")}
    						onClick={transfer}
    						disabled={transfering}
    						/>
							</AccordionTab> 
							<AccordionTab header="View Assests">

							<div  className="p-float-label" style={{marginTop: '1.5rem', width: '100%'}} width="100%">
									  <InputText id="TokenId" className="width100" label="TokenId" value={tokenId} 
									  onChange={(e) => setTokenId(e.target.value)} width="100%" />
									   <label htmlFor="TokenId">TokenId</label>
							</div>
							<Button className={"width100 p-button-raised " + (viewing ? "":"p-button-text")}
    						label={viewing ? "viewing" :"view"}
    						style={{marginTop:'1rem'}}
    						icon={"pi " +( viewing ?   "pi-spin pi-spinner": " pi-eye")}
    						onClick={view}
    						disabled={viewing}
    						/>

    						{currentOwner && tokenUrl ? viewingArea : ''}
								
							</AccordionTab>
						</Accordion>
						<Toast ref={toast} position="bottom-right"/>
				</>
		)
}