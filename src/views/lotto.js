import Banner from '../components/banner';
import {Card} from 'primereact/card';
import Actions from '../components/lotto/actions.js';


export  default function lotto(){
	const bg = 'radial-gradient(circle, rgb(255 61 174) 0%, rgb(196 20 172) 100%)'
	
			return (
			<>
				<Banner bg={bg} title="lotto contract"/>
				<main className="main">
					<div style={{width: '60%', margin:'1rem'}}>
		
						<Card title="About">
							Deploy a lottery smart contract. The manager deploys the contract sets the ticket size, max_fees, min prize pool, and 
							gets compensated by min(5%, max_fees) . People can ask for a refund anytime before lottery is drawn.
						</Card>
					</div>
					<div style={{width: '40%',margin:'1rem'}}>
					
					<Card title="Actions" >
					<Actions />

					</Card>
					</div>
				</main>
			</>
			)
}