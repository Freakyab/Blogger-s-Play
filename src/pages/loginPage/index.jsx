import React, { useState } from 'react';
// next auth and Router
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Login from '../../pages/loginPage/login';
import Signup from '../../pages/loginPage/signup';


const loginPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const { data: session } = useSession();

    const router = useRouter();
    
    if (session) {
        router.replace('/dashboard');
        return null;
    }
    return (
        <>
            {
                showLogin ?
                    <Login button={setShowLogin} showLogin={showLogin} />
                    :
                    <Signup button={setShowLogin} showLogin={showLogin} />
            }
        </>
    );
}
export default loginPage;