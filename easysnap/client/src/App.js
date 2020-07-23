import React from 'react';

//sessionWrapperHOC
import sessionWrapperHOC from './components/SessionWrapperHOC';

//Header
import Header from './components/Header';

//pages
import Home from './components/Home';
import Login from './components/Login';
import Join from './components/Join';
import Profile from './components/Profile';

//React Router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

//PrivateRoute
import PrivateRoute from './components/PrivateRoute';

const Root = ({ refetch, session }) => (
    <Router>
        <>
            <Header session={session} />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" render={() => <Login refetch={refetch} />} />
                <Route path="/join" render={() => <Join refetch={refetch} />} />
                <PrivateRoute>
                    <Route path="/profile" render={() => <Profile session={session} />} />
                </PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </>
    </Router>
);

const RootWithSessionWrapper = sessionWrapperHOC(Root);

function App() {
    return (
        <div className="App">
            <div className="container">
                <RootWithSessionWrapper />
            </div>
        </div>
    );
}

export default App;
