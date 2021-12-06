import logo from './logo.svg';
import './App.css';
import MainPage from  './views/MainPage';
import Navbar from './components/navbar';

import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
        <Navbar />
        <MainPage/>
    </div>
    </Router>
  );
}

export default App;
