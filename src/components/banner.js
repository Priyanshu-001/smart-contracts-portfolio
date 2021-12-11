import { Card } from 'primereact/card';
export default function banner({bg, title, address, isInstance=false}){
	 bg = bg || 'radial-gradient(circle, rgb(255 61 174) 0%, rgb(196 20 172) 100%)';
	 const strip = isInstance ? <div width="100%" style={{width: '100%',background: 'white'}}> Hello </div> : '';
	return(
	<div width="100%" style={{background: `${bg}`,boxShadow: '2px 9px 14px -3px rgba(0,0,0,0.75)'}}>
		<div className="banner" width="100%" style={{  height: '15rem', 
		display: 'flex', 'alignItems': 'flex-end',
		'justifyContents': 'space-around',padding: '2.5rem',	
			}} position="relative" >
			<div style={{textAlign:'left'}}>
			<h1 style={{ color:'white', fontSize:'3.2rem' }}> {title}  </h1>
			<code style={{color: 'white',fontSize:'1.5rem' }}> <b>At</b> {address}</code>
			</div>
		</div>
		
	</div>
	)
}