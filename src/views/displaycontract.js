import Banner from '../components/banner';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Card} from 'primereact/card';
import NoContract from '../components/noContract';
export  default function Lotto(){
	const bg = 'linear-gradient(280deg,rgb(93 130 190), rgb(120 20 196))'
	let {contractName} = useParams()
	let isThere = useSelector(state=>state.contract.info[contractName])
	
	if(!!isThere)
		{		
			 const About = require(`../components/${contractName}/about.js`).default;
			 const Actions = require(`../components/${contractName}/actions.js`).default;
		
			return (
			<>
				<Banner bg={bg} title={isThere.displayName}/>
				<main className="main">
					<div className="details">
								<About />
					
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
	else{
		return (
			<NoContract contractName={contractName} />
			
			)
	}
}