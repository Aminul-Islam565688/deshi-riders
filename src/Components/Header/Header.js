import React, { useContext } from 'react';
import logo from '../../images/deshiriders.png'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './Header.css';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleLogOut = () => {
        const logout = {...loggedInUser};
        logout.isSignedIn = false;
    }
    return (
            <Router className='nav-header'>
                <Link className='d-inline p-2' href='/home'><img style={{width:'200px'}} src={logo} alt=""/></Link>
                <nav className='nav-link d-inline p-2'>
                    <a href='/home'>Home</a>
                    <a href='/destination'>Destination</a>
                    <a href='/blog'>Blog</a>
                    <a href='/contact'>Contact</a>
                    {loggedInUser.isSignedIn?<a onClick={() => setLoggedInUser({})} href="#">LogOut</a>:<a href='/login'>Login</a>}
                </nav>
            </Router>
    );
};

export default Header;