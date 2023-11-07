import React from 'react'
import { useContext } from 'react';
import AuthContext from './AuthContext';

function Home() {
  const { user, authTokens, setAuthTokens, logoutUser } = useContext(AuthContext);
  return (
    <div className='home'>
        <h2>Welcome to stackoverflow clone.</h2>
          {!authTokens? <><p><strong>Login or Signup</strong> to start asking and answering questions</p>
        <p>You can still view all the contents</p></> : null}
        
    </div>
  )
}

export default Home