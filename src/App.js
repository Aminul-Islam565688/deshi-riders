import './App.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter 
} from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
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
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/home'>
            <Home></Home>
          </Route>
          <PrivateRoute path='/destination'>
            <Destination></Destination>
          </PrivateRoute>
          <Route path='/blog'>
            <Blog></Blog>
          </Route>
          <Route path='/contact'>
            <Contact></Contact>
          </Route>
          <Route path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route path='*'>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
