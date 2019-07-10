import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
    state = {
        loggedIn: false,
        userData: {
            Username: '',
            Email: '',
            Password: ''
        },
        errors: {
            Username: '',
            Email: '',
            Password: ''
        }
    };

    componentDidUpdate() {
        if (this.state.loggedIn) {
            const userInfo = {
                loggedIn: true,
                username: this.state.userData.Email
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

        axios.post("http://localhost:55318/Account/Register", {
            ...user
        })
            .then(response => {
                this.setState(
                    {
                        loggedIn: true,
                        userData: {
                            ...this.state.userData,
                            Username: response.data.value.username,
                            Email: response.data.value.email
                        }
                    });
            })
            .catch((error) => {
                this.setState({ loggedIn: false });
                const responseErrors = error.response.data;
                this.setState({ errors: responseErrors });
            });

    }

    validateUser = () => {
        const { Username, Email, Password } = this.state.userData;
        console.log(this.state.userData);

        return Username.length <= 6 || Email.length <= 6 || Password.length <= 6;
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

    render() {
        let redirect;
        const { errors, userData, loggedIn } = this.state;
        const inputStyle = 'form-control mt-2 ';

        if (loggedIn) {
            redirect = <div><Redirect to='/' /></div>;
        }

        return (
            <React.Fragment>
                <div className='container mt-5'>
                    <div className="row">
                        <div className="col" />
                        <div className="col-lg-6 col-md-8 col-sm-10 pl-5 pr-5">
                            <div className="shadow bg-white p-3 mb-5 rounded">
                                <form className='form-group mt-3'
                                    onSubmit={this.handleSubmit}
                                >
                                    <input
                                        type='text'
                                        name='Username'
                                        className={!errors.Username ? inputStyle : inputStyle + 'is-invalid'}
                                        value={userData.Username}
                                        placeholder='Username'
                                        onChange={this.handleChange}
                                    />
                                    <input
                                        type='text'
                                        name='Email'
                                        className={!errors.Email ? inputStyle : inputStyle + 'is-invalid'}
                                        value={userData.Email}
                                        placeholder='Email'
                                        onChange={this.handleChange}
                                    />
                                    <input
                                        type='password'
                                        name='Password'
                                        className={!errors.Password ? inputStyle : inputStyle + 'is-invalid'}
                                        placeholder='Password'
                                        onChange={this.handleChange}
                                    />
                                    <div className="form-check mt-3">
                                        <input type="checkbox" className="form-check-input" id="termsCheckbox" />
                                        <label className="form-check-label" htmlFor="termsCheckbox">
                                            I agree with the <a href='/terms'>terms</a> and <a href='/conditions'>conditions</a>
                                        </label>
                                    </div>
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="btn btn-block btn-primary mt-3"
                                        disabled={this.validateUser()}
                                    />
                                </form>
                            </div>
                        </div>
                        <div className="col" />
                    </div>

                </div>



                {redirect}
                {//<div className="alert alert-danger" role="alert">
                //    <p>{errors.Password}</p>
                //    <p>{errors.Email}</p>
                //    <p>{errors.Username}</p>
                    //</div>
                }
            </React.Fragment>
        );
    }
}

export default Register;