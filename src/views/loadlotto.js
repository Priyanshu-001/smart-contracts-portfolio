import {useParams} from 'react-router-dom';
import complied from '../contracts/lotto/lotto.json';
import Details from '../components/lotto/instancedetails'; 
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Banner from '../components/banner';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import Actions from '../components/lotto/actionloaded.js';
import {initWeb3} from '../app/auth';
export default function LoadLotto(){

		let connected = useSelector(state=>state.auth.loggedIn )
		let web3 = useSelector(state=>state.auth.web3)

		let [contract,setContract] = useState(null)
		let [loadState, setLoadState] = useState('loading')
		// let [victory, setVictory] = useState(false)

		let dispatch = useDispatch();
		const {id} = useParams();
		const bg = 'radial-gradient(circle, rgb(255 61 174) 0%, rgb(196 20 172) 100%)'
		async function getContract()
		{	let Contract = ''
			let netId = await web3.eth.net.getId();
				
				if(netId === 1)
					{
						setLoadState(()=>"mainet")
						return 

					}
			try{
				Contract = new web3.eth.Contract(complied.abi,id)
				setContract(()=>(Contract))
				setLoadState(()=>"done")
			}
			catch(error)
			{	console.log(error)
				setLoadState(()=>"error")
			}
		}
		useEffect(()=>{
			if(!window.ethereum && !window.web3)
				{
					setLoadState(()=>'meta')
				}
			else if(connected && !!web3) 
			 	getContract()
			 else{
			 	setLoadState(()=>'signin')
			 	dispatch(initWeb3())
			 }
			
		// eslint-disable-next-line react-hooks/exhaustive-deps
		},[connected && web3])

	


		const ifLoaded = 		!!contract && (<>
										<Banner bg={bg} title="lotto contract" address={id}/>
										<main className="main">
										<div style={{width: '60%', margin:'1rem'}}>
										
														<Card title="About">
														<Details contract={contract}/>
														</Card>
													</div>
													<div style={{width: '40%',margin:'1rem'}}>
													
													<Card title="Actions" >
		
													<Actions contract={contract} />
		
													</Card>
													</div>
										</main>
										</>)
		const loading = <>
								Loading Contract at {id}
						</>
		const error = <>
							<h1>error</h1>
							<p>
								<ul>
									<li>Try reloading the page.</li>
									<li>Check if the contract exists at the given address.</li>
									<li>Check if metamask is configured correctly</li>
									<li>Check console for error</li>
									<li>If all that fails, then I dunno man maybe report the bug</li>
								</ul>
							</p>
					  </>
		const signin = <> 
							<main>
								<h1> You haven't connected metamask </h1>
								<h2> You can't interact without connecting</h2>
								<span>
									<Button label="continue anyway?"
									className="p-button-raised p-button-text"
									 onClick={getContract}/>
								</span>
							</main>
					   </>
		const mainnet = <>
							<main> 
								<h1> Please don't load from the main net</h1>
								<h2> Switch to Ropsten/Rinkeby Testnet using MetaMask </h2>
								<h2> This site was designed for learning/testing purpose only. </h2>
								
							</main>
						</>
		const meta = <>
						<main>
							<h1>Please install metamask extension </h1>
							<h2> Available for most major browsers </h2>
							 <a href="https://metamask.io/" target="metamask" style={{color:'blue'}} > <i className="pi pi-external-link" /> Get metamask </a>
						</main>
					</>

		return(
			<>	

				{loadState==='meta' ? meta : loadState === 'mainet'? mainnet: loadState==='error'?error:loadState==='loading'?loading:loadState==='done'?ifLoaded:signin}
			</>
		)

}