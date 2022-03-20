import { signInWithPopup} from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"; 
import { auth, db, provider} from "./Firebase";

const Login = params => {
    const navigate = useNavigate()
    const [authing, setAuthing] = useState(false)
    const userInfoColRef = collection(db, 'users')
    const signInWithGoogle = async () => {
        setAuthing(true)
        signInWithPopup(auth, provider)
        .then(response => {
            params.setUserInfo({
                photo: response.user.photoURL,
                name: response.user.displayName,
                email: response.user.email,
                userId: response.user.uid
            })
        addDoc(userInfoColRef, {
            user: [{ 
                photo: response.user.photoURL,
                name: response.user.displayName,
                email: response.user.email,
                userId: response.user.uid,
                date: new Date()
            }]
        });
        navigate('/')
        })
        .catch(error => {
            console.log(error)
            setAuthing(false)
        })
    }
    return <>
        <p>Login Page</p>
        <button onClick={() => 
            signInWithGoogle()
        } disabled={authing}>Sign in with Google</button>
    </>
}

export default Login