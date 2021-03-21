import React, { useContext, useState } from 'react';
import "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import firebase from "firebase/app";
import { useForm } from "react-hook-form";
import { UserContext } from '../../App';
import facebook from '../../images/facebook.svg';
import google from '../../images/google.svg';
import './Login.css'
import { firebaseConfig } from './firebase.config';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })


  const handleChange = (e) => {
    let isFieldValid = true;
    if(e.target.name === 'email'){
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    };
    if(e.target.name === 'password'){
      const isPasswordValid = (e.target.value.length) > 6;
      const passWordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passWordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      }
  }
  
  
  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo)
        updateUserInfo(user.email)
        history.replace(from);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        setLoggedInUser(newUserInfo)
        console.log(user.name);
        history.replace(from);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }
    e.preventDefault();
  }

  const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    }).then(function() {
      console.log("User Name Updated Successfully");
    }).catch(function(error) {
      console.log(error);
    });
  }

  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleSocialSignIn = (e) => {
    firebase
      .auth()
      .signInWithPopup(e)
      .then((res) => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        const errorMessage = err.message;
        console.log(errorMessage);
      });
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {newUser ? <h6>Create New User</h6> : <h6>Log In</h6>}
        {
          newUser && <input onBlur={handleChange} className='main-input' type="text" name="name" placeholder='Name' id="" />
        }
        <input onBlur={handleChange} className='main-input' type="email" name="email" placeholder='Email' id=""/>

        <input onBlur={handleChange} className='main-input' type="password" name="password" placeholder='Password' id=""/>

        {
          newUser && <input  onBlur={handleChange} className='main-input' type="password" name="confirmPassword" placeholder='Confirm Password' id=""/>
        }

        {newUser || <div className='remember-forget-password'>
          <input type="checkbox" name="rememberMe" id="" />
          <label htmlFor="rememberMe">Remember Me</label>
          <a className='forget-password' href="#">Forget Password</a>
        </div>}

        <input className='submit-input' type="submit" value={newUser ? "Create an Account" : "Login"} />
        <span className='have-account'>Don't Have an Account?<a onClick={() => setNewUser(!newUser)} className='create-account' href="#">{newUser ? 'Log In' : 'Create an Account'}</a></span>
      </form>
      <span className='this'>Or</span>
      <div className='social-main'>
        <div onClick={() => handleSocialSignIn(facebookProvider)} className='loginWith-social facebook'>
          <img src={facebook} alt="" />
          <h5>Log In With Facebook</h5>
        </div>
        <div onClick={() => handleSocialSignIn(googleProvider)} className='loginWith-social google'>
          <img src={google} alt="" />
          <h5>Log In With Google</h5>
        </div>
      </div>
    </div>
  );
};

export default Login;