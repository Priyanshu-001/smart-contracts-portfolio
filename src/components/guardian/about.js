import {Card} from 'primereact/card'
export default function About(){
		
		return (
			<Card title="About">
				Deploy a smart contract which will take custody of your ether forever.
				The smart contract will start releasing eth only after a cuttoff date set by the owner.
				You get to decide the amount of eth to the benificaries recieve at once after a set interval.
				If the cuttoff date is set in past or benificaries didn;t claimed when released, they will be entitled to all the pending amount at once.
				<h2>Note</h2>
				When the contract is deployed details cannot be edited,  your eth will be held by contract and released only to the benificaries according to schedule st by you.
			</Card>
			)

}