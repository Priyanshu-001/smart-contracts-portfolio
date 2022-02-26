// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Footer from './components/Footer';


import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {
  Outlet
} from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <Navbar />
        <Outlet/>
        <Footer/>
    </div>
  );
}

export default App;
