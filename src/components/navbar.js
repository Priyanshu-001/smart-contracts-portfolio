import { Link } from 'react-router-dom';
function Navbar(){
	return(
		 <header> 
		 <Link to="/">
		  <h1> <span > SMART</span><span className="blue">Contracts </span> </h1>
		  </Link>
		  </header>
		)
}
export default Navbar