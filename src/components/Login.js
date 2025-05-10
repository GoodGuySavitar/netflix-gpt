import React, { useRef } from 'react'
import Header from './Header'
import {useState} from "react"
import {checkValidForm, checkValidFormSignUp} from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'


const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formValidateMessage, setFormValidateMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  
  const loginFormValidation = () => {
    const message = isSignIn ? setFormValidateMessage(checkValidForm(email.current.value, password.current.value)) : 
    setFormValidateMessage(checkValidFormSignUp(email.current.value, password.current.value, name.current.value))
    if(message) return;
    
    if(!isSignIn)
    {
      //Sign Up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: "https://avatars.githubusercontent.com/u/111289318?v=4",
        }).then(() => {
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid : uid, email: email, displayName: displayName, photoURL: photoURL}));
          navigate("/browse")
        }).catch((error) => {
          setFormValidateMessage(error.message)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFormValidateMessage(errorCode + " " + errorMessage);
      })
    }
    else
    {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/browse")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setFormValidateMessage(errorCode + " " + errorMessage);
      });
        }
  }

  const isSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Header/>
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_large.jpg'></img>
      </div>
      <form onSubmit={ (e) => e.preventDefault()} className='absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
        <h1 
        className='my-4 text-3xl font-bold'> {isSignIn ? "Sign In" : "Sign Up"} 
        </h1>

        {!isSignIn && <input ref={name} type='text' placeholder='Full Name' className='p-2 my-4 w-full rounded-sm bg-gray-700'/>}

        <input ref={email} type='text' placeholder='Email' className='p-2 my-4 w-full rounded-sm bg-gray-700'/>

        <input ref={password} type='password' placeholder='Password' className='p-2 my-4 w-full rounded-sm bg-gray-700'/>

        <p className='font-semibold text-[#e50914]'>{formValidateMessage}</p>
        
        <button onClick={loginFormValidation} 
        className='bg-[#e50914] p-2 my-4 w-full rounded-md'>{isSignIn ? "Sign In" : "Sign Up"} 
        </button>

        <p className='p-2 cursor-pointer' onClick={isSignInForm}>
        {isSignIn ? "New to Netflix? Sign Up Now" : "Have an Account? Sign In Now"}</p>

      </form>
    </div>
  )
}

export default Login;