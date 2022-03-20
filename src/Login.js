import { signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { collection } from "firebase/firestore"; 
// import { addDoc } from "firebase/firestore"; 
import { auth, provider} from "./Firebase";

const Login = () => {
    const navigate = useNavigate()
    const [authing, setAuthing] = useState(false)
    // const userInfoColRef = collection(db, 'users')
    const signInWithGoogle = async () => {
        setAuthing(true)
        signInWithPopup(auth, provider)
        .then(() => {
            // auth.currentUser.getIdToken().then((idToken) => {  // <------ Check this line
            //     console.log(1)
            //     params.setUserInfo({
            //         token: idToken
            //     })
            //     return undefined
            // });
            // params.setUserInfo({
            //     photo: response.user.photoURL,
            //     name: response.user.displayName,
            //     email: response.user.email,
            //     userId: response.user.uid
            // })
        // addDoc(userInfoColRef, {
        //     user: [{ 
        //         photo: response.user.photoURL,
        //         name: response.user.displayName,
        //         email: response.user.email,
        //         userId: response.user.uid,
        //         date: new Date()
        //     }]
        // });
        
        navigate('/')
        })
        .catch(error => {
            console.log(error)
            setAuthing(false)
        })
    }
    return <>
        <p>Loginside</p>
        <button onClick={() => 
            signInWithGoogle()
        } disabled={authing}>Log ind med Google</button>
    </>
}

export default Login