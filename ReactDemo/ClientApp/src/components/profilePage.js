import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
    render() {
        const userInfo = this.props.userInfo;
        if (userInfo.loggedIn === false) {
            return <Redirect to='/' />;
        }
        else {
            return (
                <div className='container mt-5'>
                    <div className="row">
                        <div className="col-3" >

                            <div className="shadow p-3 bg-white rounded">
                                <div className='text-center'>
                                    <img src="https://source.unsplash.com/random/130x130" alt="..." className="rounded-circle" />
                                    <h4 className='mt-2'>{userInfo.username}</h4>
                                </div>
                                <div>
                                    <div className='text-center'>
                                        <b>favorites</b>
                                    </div>
                                    <div className='text-center'>
                                        <span><b>movie</b> Green Mile</span>
                                        <br />
                                        <span><b>genre</b> Drama</span>
                                        <br />
                                        <span><b>actor</b> Keanu Reeves</span>
                                    </div>
                                </div>

                                <div onClick={() => { }} className='account-control text-center mt-2'>
                                    <i className="fas fa-cog" />
                                    <span className='ml-2'>Account Settings</span>
                                </div>

                            </div>
                        </div>
                        <div className="col" >
                            <div className="shadow p-3 mb-5 bg-white rounded text-center" />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;