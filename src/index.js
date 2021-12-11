import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LoadLotto from './views/loadlotto';
import './index.css';
import App from './App';
import MainPage from  './views/MainPage';
import reportWebVitals from './reportWebVitals';
import Lotto from './views/lotto'

import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <React.StrictMode>
 <Provider store={store}>
  <BrowserRouter>
  <Routes>
    <Route path='/' element = {<App/>} >
      <Route path="lotto/:id" element = {<LoadLotto/>} />
      <Route path="/" element = {<MainPage/>} />
      <Route path="lotto" element = {<Lotto/>} />
    </Route>

  </Routes>
  </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
