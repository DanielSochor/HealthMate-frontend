import React, { Component } from 'react';
import "./Navbar.css"
import M from "materialize-css";
import Auth from '../../utilities/authorizer';
import Pubsub from '../../utilities/pubsub';

class Navbar extends Component {
    componentDidMount() {
        M.AutoInit()
    }

    handleSignOut = (event) => {
        event.preventDefault();
        Auth.sendSignoutRequest();
        Pubsub.publish('logout', true);
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper" style={{ backgroundColor: 'rgb(70, 89, 152)' }}>
                        <a href="#!" className="brand-logo center">HealthMate</a>
                        <a href="#!" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="right hide-on-med-and-down">
                            <li><a href="...">Settings</a></li>
                        </ul>
                    </div>
                </nav>


                <ul className="sidenav" id="mobile-demo" style={{ backgroundColor: 'rgb(70, 89, 152)' }}>
                    <li className="center">
                        <div className="user-view">
                            <div className="background">
                                <img src={'https://wallpaperstream.com/wallpapers/thumbnails/minimal-hd/Minimal-HD-Geometric-Landscape-Wallpaper_thumb.jpg'} alt="backgroungImage" className="userBGI" />
                            </div>
                            <i className="account_pic material-icons">account_circle</i>
                            <br />
                            <button style={{ color: "white", fontWeight: "bold" }}>Settings</button>
                        </div>
                    </li>
                    <div className="col s12" id="logoutBtn"><li><button className="logoutBtn waves-effect waves-light btn-large sidenav-close" onClick={this.handleSignOut}>Logout</button></li></div>

                </ul>
            </div>
        );
    }
}

export default Navbar;