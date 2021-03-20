// import React, { useContext } from 'react';
// import logo from '../../images/deshiriders.png'
// import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
// import './Header.css';
// import { UserContext } from '../../App';
// import Destination from '../Destination/Destination';

// const Header = () => {
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//     const handleLogOut = () => {
//         const logout = {...loggedInUser};
//         logout.isSignedIn = false;
//     }
//     return (
//             <Router className='nav-header'>
//                 <Link className='d-inline p-2' to='/home'><img style={{width:'200px'}} src={logo} alt=""/></Link>
//                 <nav className='nav-link d-inline p-2'>
//                     <Link to='/home'>Home</Link>
//                     <Link to='/destination'>Destination</Link>
//                     <Link to='/blog'>Blog</Link>
//                     <Link to='/contact'>Contact</Link>
//                     {loggedInUser.isSignedIn?<a onClick={() => setLoggedInUser({})} href="#">LogOut</a>:<Link to='/login'>Login</Link>}
//                 </nav>
//             </Router>
//     );
// };

// export default Header;