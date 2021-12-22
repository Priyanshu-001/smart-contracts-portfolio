import Banner from '../components/banner';
import {Card} from 'primereact/card';
import Actions from '../components/lotto/actions.js';


export  default function lotto(){
	const bg = 'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))'
	
			return (
			<>
				<Banner bg={bg} title="lotto contract"/>
				<main className="main">
					<div className="details">
		
						<Card title="About">
							Deploy/load a lotto smart contract. The manager deploys the contract sets the ticket size, max_fees, min prize pool, and 
							gets compensated by min(5%, max_fees) . Prize pool can also be set to 0. At least 5 tickets must be sold before drawing.
							Participants can ask for a refund anytime before lotto is drawn.
							<h2>Manager</h2>
							<p>
								The manager deploys the contract makes sure prizepool reaches target prize, get rewarded  min(5%, max_fees) for gas inccured.
								The manager fees also incentivises the manager to make sure lotto is drawn.
							</p>
							<h2>Participants</h2>
							<p>
								Participants must pay ticket price set by manager. However they can ask for a refund anytime before results are out. 
								Gas inccured for buying and refund of tickets are to be paid by the players.
							</p>
						</Card>
					</div>
					<div className="actions">
					
					<Card title="Actions" >
					<Actions />

					</Card>
					</div>
				</main>
			</>
			)
}