import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase'
import {addUser, removeUser} from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();

  
  const appRouter = createBrowserRouter([
      {
        path: "/",
        element:<Login/>
      },
      {
        path: "/browse",
        element:<Browse/>
      }
    ])


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("SIGNED IN SIUUUU")
      const {uid, email, displayName, photoURL} = user;
      dispatch(addUser({uid : uid, email: email, displayName: displayName, photoURL: photoURL}));
    } else {
      dispatch(removeUser());
    }
    });
  },[])

  return (
    <div>
        <RouterProvider router = {appRouter}/>
    </div>
  )
}

export default Body