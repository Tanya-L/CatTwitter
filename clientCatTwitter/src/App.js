import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import {Provider} from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'
import Main from './components/Layout/Main'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import Search from './components/Search/UserNotFound'

import setAuthHeader from './utils/setAuthHeader'
import {getCurrentUser, logoutUser} from './actions/authActions'

if (localStorage.getItem('jwtToken')) {
    const currentTime = Date.now() / 1000
    const decode = jwt_decode(localStorage.getItem('jwtToken'))

    if (currentTime > decode.exp) {
        store.dispatch(logoutUser())
        window.location.href = '/'
    } else {
        setAuthHeader(localStorage.getItem('jwtToken'))
        store.dispatch(getCurrentUser())
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <BrowserRouter>
                        <Main><Switch>
                            <Route exact path="/" component={Home}/>
                            {/*<Route path="/login" component={Login}/>*/}
                            {/*<Route path="/register" component={Register}/>*/}
                            {/*<Route path="/profile/:userId" component={Profile}/>*/}
                            <Route path="/search" component={Search}/>
                            <Route component={PageNotFound}/>
                        </Switch></Main>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
