import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import  Bookmarks from './bookmark.js';

function PlayGround()
{	const action = <Link to="/lotto">
							 <Button label="Deploy / Load" style={{'right': '0px'}} 
							className="p-button-raised p-button-text"  icon="pi pi-play" />
							</Link>;
	return(
		<div className="main" >
		 <div className="contractList">
		 	<h2>  <i className= "pi pi-list"> </i> Contract List  </h2>
		 	<Card  width="100%"   > 
		 	<div className="contractItem">
		 		<Image src = "lotto.png" object-fit="cover" width="auto" height="150px" />
		 		<div style={{'marginLeft': '2rem' }}> 
		 			<h2> Lotto Smart Contract </h2>
		 			<p className="subtitle"> Deploy a lottery smart contract. 
		 			The manager deploys the contract sets the ticket size, max_fees, min prize pool, and
		 			gets compensated by <code> min(5%, max_fees) </code>. People can ask 
		 			for a refund anytime before lottery is drawn.  </p>
		 			<br/>
		 			{action}	
		 		
		 		</div>

		 		</div>
		 	</Card>

		 </div>
			<Bookmarks />	
		</div>
		)
}
export default PlayGround;