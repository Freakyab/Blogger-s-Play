import React from 'react';
import Login from '../../pages/loginPage/login';
import Signup from '../../pages/loginPage/signup';

const loginPage = () => {
    const [showLogin, setShowLogin] = React.useState(true);
    
    return (
        <>
            {showLogin ? <Login button = {setShowLogin} showLogin = {showLogin}/> : <Signup button ={setShowLogin} showLogin = {showLogin}/>}
        </>
    );
}
export default loginPage;