import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/mainStyles.css";
import Main from './App/mainPage/MainPage.jsx';
import Auth1 from './App/authPage/auth.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'antd/dist/antd.css';
import RegistrationForm1 from './App/authPage/reg.jsx';

class App extends React.Component {
    render() {
        return (
            <Router >
                <React.Fragment>
                    <Route path='/' exact component={RegistrationForm1} />
                    <Route path='/reg' exact component={RegistrationForm1} />
                    <Route path='/auth' component={Auth1} />
                    <Route path='/field' component={Main} />
                </React.Fragment>
            </Router >
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));