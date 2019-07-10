import React, { Component } from 'react';
import Register from './components/register';
import Login from './components/login';
import Navbar from './components/navbar';
import MovieSearch from './components/movieSearch';
import ProfilePage from './components/profilePage';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const initalState = {
    userInfo: {
        loggedIn: false,
        username: ""
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = initalState;
        this.getLoggedInUser();
    }

    componentWillMount() {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const username = sessionStorage.getItem('username');
        this.setState({ userInfo: { loggedIn, username } });
    }

    getLoggedInUser() {
        axios.get("http://localhost:55318/Account/GetCurrentUser")
            .then(response => {
                if (response.data !== "") {
                    const currentUser = {
                        loggedIn: true,
                        username: response.data.userName
                    };
                    this.handleUserLogin(currentUser);
                }
            });
    }

    handleUserLogin = (data) => {
        this.setState({ userInfo: data });
        sessionStorage.setItem('loggedIn', data.loggedIn);
        sessionStorage.setItem('username', data.username);
    }

    handleSignout = () => {
        axios.get("http://localhost:55318/Account/SignOut")
            .then(() => {
                sessionStorage.clear();
                this.setState(initalState);
            });
    }

    render() {
        return (
            <div>
                <Navbar userInfo={this.state.userInfo} Signout={this.handleSignout} />
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={MovieSearch} />
                        <Route path="/ProfilePage" exact component={() => <ProfilePage userInfo={this.state.userInfo} />} />
                        <Route path="/Signin" exact component={() => <Login updateUserInfo={this.handleUserLogin} />} />
                        <Route path="/Signup" exact component={() => <Register updateUserInfo={this.handleUserLogin} />} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;