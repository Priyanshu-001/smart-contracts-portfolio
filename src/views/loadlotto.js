import {useParams} from 'react-router-dom';
import complied from '../contracts/lotto/lotto.json'
import {useState,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Banner from '../components/banner';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import Actions from '../components/lotto/actions.js';
import {initWeb3} from '../app/auth';
export default function LoadLotto(){

		let connected = useSelector(state=>state.auth.loggedIn )
		let web3 = useSelector(state=>state.auth.web3)

		let [contract,setContract] = useState(null)
		let [loadState, setLoadState] = useState('loading')
		let dispatch = useDispatch();
		const {id} = useParams();
		const bg = 'radial-gradient(circle, rgb(255 61 174) 0%, rgb(196 20 172) 100%)'
		function getContract()
		{	let Contract = ''
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
			console.log(connected)
			if(connected && !!web3) 
			 	getContract()
			 else{
			 	setLoadState(()=>'signin')
			 	dispatch(initWeb3())
			 }
			
		// eslint-disable-next-line react-hooks/exhaustive-deps
		},[connected && web3])
		let currentElement
		// useEffect(()=>{
		// 		selectDisplayElement()
		// 			},[loadState])



		const ifLoaded = 		<>
								<Banner bg={bg} title="lotto contract" address={id}/>
								<main className="main">
								<div style={{width: '60%', margin:'1rem'}}>
								
												<Card title="About">
													Deploy a lottery smart contract. The manager deploys the contract sets the ticket size, max_fees, min prize pool, and 
													gets compensated by min(5%, max_fees) . People can ask for a refund anytime before the lottery is drawn.
												</Card>
											</div>
											<div style={{width: '40%',margin:'1rem'}}>
											
											<Card title="Actions" >
											<Actions />

											</Card>
											</div>
								</main>
								</>
		const loading = <>
								Loading Contract at {id}
						</>
		const error = <>
							<h1>error</h1>
							<p>
								<ul>
									<li>Try reloading the page.</li>
									<li>Check if the contract exists at the given address.</li>
									<li>If all that fails, then I dunno man</li>
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

		function selectDisplayElement(){
			switch(loadState){
					case 'error':{
						currentElement = error
						break
					}
					case 'loading':{
						currentElement = loading
						break
					}
					case 'done':{
						currentElement = ifLoaded
						break
					}
					case 'signin':{
						currentElement = signin
						console.log("here")
						console.log(signin)
					}

				}
		}

		return(
			<>	

				{loadState==='error'?error:loadState==='loading'?loading:loadState=='done'?ifLoaded:signin}
			</>
		)

}