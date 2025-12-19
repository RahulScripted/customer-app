import React from 'react';
import SignUp from './components/signup';
import LogIn from './components/login';

const LogInPage = () => {
  const [isUserRegistered, setIsUserRegistered] = React.useState(false);
  
  return (
    isUserRegistered ? (
      <LogIn />
    ) : (
      <SignUp />
    )
  );
}

export default LogInPage