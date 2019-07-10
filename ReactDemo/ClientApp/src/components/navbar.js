import React, { Component } from 'react';

class Navbar extends Component {

    empty = () => {
        console.log("Sss");
    }

    render() {
        const userInfo = this.props.userInfo;
        let authArea;

        if (!userInfo.loggedIn) {
            authArea = (
                <React.Fragment>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="/Signin">Sign In</a>
                    </li>
                </React.Fragment>
            );
        }
        else {
            authArea = (
                <React.Fragment>
                    <li className="nav-item">
                        <a className="nav-link text-white" onClick={this.empty} href="/ProfilePage" key='1'>{userInfo.username}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" onClick={this.props.Signout} href="/">Sign Out</a>
                    </li>
                </React.Fragment>
            );
        }

        

        return (
            <nav className="navbar navbar-expand-sm sticky-top navbar-light" style={{ backgroundColor: "#5d4f66" }}>
                <div className="container">
                    <a className="navbar-brand text-white" href="">
                        <i className="fas fa-film fa-lg m-2" />
                        Favorite Movies
                    </a>

                    <div className="justify-content-end">
                        <ul className="nav navbar-nav">
                            {authArea}
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/about">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;