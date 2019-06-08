import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/mainStyles.css";
import Main from './App/mainPage/MainPage.jsx';
import Auth1 from './App/authPage/auth.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';


ReactDOM.render((
    <Router>
        <Route path='/' component={Auth1} />
        <Route path='/field' component={Main} />
    </Router>
), document.getElementById('root'));