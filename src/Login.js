import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const [authing, setAuthing] = useState(false)
    const signInWithGoogle = async () => {
        setAuthing(true)
        signInWithPopup(auth, new GoogleAuthProvider())
        .then(response => {
            console.log(response.user.uid)
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