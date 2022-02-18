import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
export default function contractItem({img,heading,info,link,code})
{	const action = !!link ? <Link to={`/${link}`}>
							 <Button label="Deploy / Load" style={{'right': '0px'}} 
							className="p-button-raised p-button-text"  icon="pi pi-play" />
							</Link>: '';
	const codeButton = !!code?  <a href={`${code}`}>
							 <Button label="Github" style={{'right': '0px'}} 
							className="p-button-raised mr-2"  icon="pi pi-github" />
							</a>: '';
	console.log(code)
	return(
			<Card  width="100%" > 
		 	<div className="contractItem">
		 		<Image src = {`${img}` } object-fit="cover" width="auto" height="150px" />
		 		<div style={{'marginLeft': '2rem', width: '90%'}}> 
		 			<h2> {heading} </h2>
		 			<p className="subtitle"> {info} </p>
		 			<br/>
		 			<div style={{  marginTop: 'auto'}}>
		 			{codeButton} {action} 
		 			</div>	
		 		
		 		</div>

		 		</div>
		 	</Card>
		)
}