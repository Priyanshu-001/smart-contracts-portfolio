import { Link } from 'react-router-dom';
import ConnectWallet from './connectWallet'
function Navbar(){
	return(
		 <header> 
		 <Link to="/">
		  <h1>
		  	<code>
		  	 <span> SMART</span><span className="blue">CONTRACTS </span> 
		  	</code>
		  </h1>
		  </Link>
		  <ConnectWallet />
		  </header>
		)
}
export default Navbar