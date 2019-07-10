import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    state = {
        loggedIn: false,
        userData: {
            EmailOrUsername: '',
            Password: '',
            RememberMe: false
        },
        errors: null
    };

    componentDidUpdate() {
        if (this.state.loggedIn) {
            const userInfo = {
                loggedIn: true,
                email: this.state.userData.Email,
                username: this.state.userData.Username
            };

            if (typeof this.props.updateUserInfo === 'function') {
                this.props.updateUserInfo(userInfo);
                console.log(userInfo);
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const user = this.state.userData;
        console.log(user);
        axios.post("http://localhost:55318/Account/Login", {
            ...user
        })
            .then(response => {
                this.setState(
                    {
                        loggedIn: true,
                        userData: {
                            ...this.state.userData,
                            Email: response.data.value.email,
                            Username: response.data.value.username
                        }
                    });
            })
            .catch((error) => {
                this.setState({ loggedIn: false });
                console.log(error);
                /*var errors = error.response.data;
                console.log(Object.values(errors)[0][0]);
                this.setState({ errors: errors })*/
            });

    }

    validateUser = () => {
        const { EmailOrUsername, Password } = this.state.userData;

        return EmailOrUsername.length <= 6 || Password.length <= 6;
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            userData: {
                ...this.state.userData,
                [name]: value
            }
        });
    }

    handleClick = () => {
        this.setState({
            userData: {
                ...this.state.userData,
                RememberMe: !this.state.userData.RememberMe
            }
        });
    }

    render() {
        let redirect;

        if (this.state.loggedIn) {
            const url = new URLSearchParams(window.location.search).get('ReturnUrl');
            const returnUrl = url === null ? '/' : url;
            redirect = <div><Redirect to={returnUrl} /></div>;
        }

        return (
            <React.Fragment>
                <div className='container mt-5'>
                    <div className="row">
                        <div className="col" />
                        <div className="col-lg-6 col-md-8 col-sm-10 pl-5 pr-5">
                            <div className="shadow bg-white p-3 mb-4 rounded">
                                <form className='form-group mt-3'
                                    onSubmit={this.handleSubmit}
                                >
                                    <input
                                        type='text'
                                        name='EmailOrUsername'
                                        className='form-control mt-2'
                                        value={this.state.userData.EmailOrUsername}
                                        placeholder='Email or username'
                                        onChange={this.handleChange}
                                    />
                                    <input
                                        type='password'
                                        name='Password'
                                        className='form-control mt-2'
                                        placeholder='Password'
                                        onChange={this.handleChange}
                                    />
                                    {/*<input type='text' name='confirmPassword' className='form-control mt-2' />*/}
                                    <div className="form-check mt-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name='RememberMe'
                                            value={this.state.userData.RememberMe}
                                            onClick={this.handleClick}
                                            id="rememberMeCheckbox"
                                        />
                                        <label className="form-check-label" htmlFor="rememberMeCheckbox">
                                            Remember me
                                        </label>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-block btn-primary mt-3"
                                        disabled={this.validateUser()}
                                    />
                                </form>
                                <p align="center"><a href="/">Forgot Password?</a></p>
                            </div>
                            {redirect}
                            <p align="center">Don't have an account yet? <a href="/Signup">Sign Up here</a></p>
                        </div>
                        <div className="col" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;