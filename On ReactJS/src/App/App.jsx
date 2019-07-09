import Main from '../App/mainPage/MainPage.jsx';
import Auth1 from '../App/authPage/auth.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegistrationForm1 from '../App/authPage/reg.jsx';
import React from 'react';
import "../styles/mainStyles.css";

class App extends React.Component {
    render() {
        return (
            <Router >
                <React.Fragment>
                    <Route path='/' exact component={Auth1} />
                    <Route path='/auth' exact component={Auth1} />
                    <Route path='/reg' component={RegistrationForm1} />
                    <Route path='/field' component={Main} />
                </React.Fragment>
            </Router >
        );
    }
}

export default App;