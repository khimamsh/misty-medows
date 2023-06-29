import React, { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Routes from './Routes';
import { isEmpty } from 'lodash';
import { getSessionToken, setSessionToken } from './utils/utils';
import { BrowserRouter as Router } from 'react-router-dom';



function App() {
  useEffect(()=>{
   if(isEmpty(getSessionToken())){
    setSessionToken('himamshtg@gmail.com');
   }
  },[]);

  return (
    <GoogleOAuthProvider clientId={'470650336153-g1r3sjsascofi8fkml4sb7deln38gj3f.apps.googleusercontent.com'}>
    
     <Router>
      
       <Routes/>
       
       </Router>
    </GoogleOAuthProvider>
  
  );
}

export default App;
