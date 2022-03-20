import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

const AuthRoute = (params) => {
    const { children } = params;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const AuthCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                params.setUserInfo({
                    photo: user.photoURL,
                    name: user.displayName,
                    email: user.email,
                    userId: user.uid
                })
                setLoading(false);
            } else {
                navigate('/login');
            }
        });
        return () => AuthCheck();
    // eslint-disable-next-line
    }, [auth]);
    if (loading) return <p>Indlæser fra database ...</p>
    return <>{children}</>;
};

export default AuthRoute;