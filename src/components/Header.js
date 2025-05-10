import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/")
  }).catch((error) => {
    // An error happened.
  });
  }

  return (
    <div className='absolute w-full bg-gradient-to-b from-black z-10 flex justify-between'>
      <div>
        <img className='w-44' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo'></img>
      </div>
      {user && <div className='flex items-center text-white'>
        <div>
          <img className='w-12' alt='profile picture' src={user?.photoURL}/>
        </div>
        <div>
          <button onClick={handleSignOut}>(Sign Out)</button>
        </div>
      </div>}
    </div>
  )
}

export default Header