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
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = data => {
    if (newUser && data.password !== data.confirmPassword) {
      alert("Passwords don't match");
      const newUserInfo = { ...data };
      newUserInfo.passwordMatch = true;
      setUser(newUserInfo);
    } else {
      if (newUser) {
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
          .then(res => {
            const newUserInfo = { ...data };
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.isSignedIn = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            updateUserInfo(data.name);
            history.replace(from);
          })
          .catch((error) => {
            const newUserInfo = { ...data };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            newUserInfo.isSignedIn = false;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo)
          });
      }
      if (!newUser) {
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
          .then((res) => {
            const newUserInfo = { ...data };
            newUserInfo.error = '';
            newUserInfo.success = true;
            newUserInfo.isSignedIn = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo)
            console.log('signed in user info', res);
            history.replace(from);
          })
          .catch((error) => {
            const newUserInfo = { ...data };
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            newUserInfo.isSignedIn = false;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo)
          });
      }
    }
  }

  const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    }).then(function () {
      console.log("User Name Updated Successfully");
    }).catch(function (error) {
      console.log(error);
    })
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
        history.replace(from);
      })
      .catch((err) => {
        const errorMessage = err.message;
        console.log(errorMessage);
      });
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then((res) => {
        const user = {
          isSignedIn: false,
          name: '',
          email: '',
          password: '',
          photo: '',
          error: '',
          success: false,
        }
        setUser(user);
      })
      .catch((error) => {
      });
  }
 console.log(loggedInUser.isSignedIn);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {newUser ? <h6>Create New User</h6> : <h6>Log In</h6>}
        {
          newUser && <div>
            <input className='main-input' type="text" name="name" placeholder='Name' id="" ref={register({ required: true })} />
            {errors.name && <span style={{ color: 'red' }} className='error'>Name is required</span>}
          </div>
        }
        <input className='main-input' type="email" name="email" placeholder='Email' id="" ref={register({ required: true, pattern: /^[^\s@]+@[^\s@]+$/ })} />
        {errors.email && <span style={{ color: 'red' }} className='error'>Email is required</span>}

        <input className='main-input' type="password" name="password" placeholder='Password' id="" ref={register({ required: true, pattern: /\d{1}/ })} />
        {errors.password && <span style={{ color: 'red' }} className='error'>Password is required</span>}

        {
          newUser && <div>
            <input className='main-input' type="password" name="confirmPassword" placeholder='Confirm Password' id="" ref={register({ required: user.passwordMatch })} />
            {errors.confirmPassword && <span style={{ color: 'red' }} className='error'>Password isn't Match</span>}
          </div>
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
      <div onClick={() => handleSocialSignIn(facebookProvider)} className='loginWith-social google'>
        <img src={facebook} alt="" />
        <h5>Log In With Facebook</h5>
      </div>
      <div onClick={() => handleSocialSignIn(googleProvider)} className='loginWith-social facebook'>
        <img src={google} alt="" />
        <h5>Log In With Facebook</h5>
      </div>
    </div>
  );
};

export default Login;