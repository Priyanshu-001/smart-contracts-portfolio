import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
function TitleCard(){
	return(
		<div className="title">
		<div>
		<h2>
		<code>
		<span>Trustless</span>
		<span className="blue">Agreements</span>
		</code>
		</h2> 

		<p>
			Smart Contracts are the corner stone of programmable money. 
			Once deployed the contract will inevitabley execute and cannot be altered by any party.
			This removes the need of a trustworthy authority. 
			<br/>
			In theory corruption, fraud, and other malpractices can be prevented. 
			The colllection of smart contracts here are meant to be resume projects 
			and should <b> NOT </b> be deployed on mainet.
			The instances here are deployed on <b> ropsten test net</b> no real ether are used.

		</p>
		<span>
		<Button label="Connect Wallet" icon="pi pi-wallet" />
		{/* <Button label = "Tutorial" icon="pi pi-play" class="p-button-raised  p-button-rounded" ></Button> */}
		</span>
		</div>
		<Image src="contract.jpg" alt="Illustration" />
		</div>
	)
}
export default TitleCard;