import {Card} from 'primereact/card';

export default function LottoAbout(){
	return (
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
	)
}