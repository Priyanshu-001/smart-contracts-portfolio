// import { Card } from 'primereact/card';
// import { Image } from 'primereact/image';
// import { Link } from 'react-router-dom';
// import { Button } from 'primereact/button';
import {useSelector} from 'react-redux';
import  ContractItem from './contractitem';
import  Bookmarks from './bookmark.js';


function PlayGround()
{	let contracts = useSelector(state=>Object.values(state.contract.info))
	console.log(contracts)
	return(
		<div className="main" >
		 <div className="contractList">
		 	<h2>  <i className= "pi pi-list"> </i> Contract List  </h2>
		 	<div className="resposiveWrapper">
		 	
		 	{contracts.map((contract,id)=>(<ContractItem 
		 				img={contract.image}
		 				link={contract.link}
		 				heading={contract.displayName}
		 				info={contract.information}
		 				key={id}
		 				code={contract.code}
		 			 	 />))}
		 				}
		 				
		 	</div>

		 </div>
			<Bookmarks />	
		</div>
		)
}
export default PlayGround;