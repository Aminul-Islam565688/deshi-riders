import './App.css';
import { createContext, useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import logo from './images/deshiriders.png'
import Home from './Components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Destination from './Components/Destination/Destination';
import Blog from './Components/Blog/Blog';
import Contact from './Components/Contact/Contact';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        
        <Link className='d-inline p-2' to='/home'><img style={{width:'200px'}} src={logo} alt=""/></Link>
        <nav className='nav-link d-inline p-2'>
            <Link to='/home'>Home</Link>
            <Link to='/destination'>Destination</Link>
            <Link to='/blog'>Blog</Link>
            <Link to='/contact'>Contact</Link>
            {loggedInUser.email?<a onClick={() => setLoggedInUser({})} href="#">LogOut</a>:<Link to='/login'>Login</Link>}
        </nav>

        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          
          <Route path='/blog'>
            <Blog></Blog>
          </Route>
          <PrivateRoute path='/destination'>
            <Destination></Destination>
          </PrivateRoute>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route path='/contact'>
            <Contact></Contact>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
