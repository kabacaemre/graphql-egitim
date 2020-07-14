import React from 'react';

import Header from './components/Header';

//pages
import Home from './components/Home';
import Login from './components/Login';
import Join from './components/Join';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

const Root = () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/join" component={Join} />
                <Redirect to="/" />
            </Switch>
        </>
    </Router>
);

function App() {
    return (
        <div className="App">
            <div className="container">
                <Root />
            </div>
        </div>
    );
}

export default App;
