import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthRoute = (props) => {
    const { children } = props
    const auth = getAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        AuthCheck()
        return () => AuthCheck()
    }, [auth])
    
    const AuthCheck = onAuthStateChanged(auth, (user) => {
        if(user){
            setLoading(false)
        }else{
            console.log('unauthrized')
            navigate('/login')
        }
    })
    
    if (loading) return <p>loading ...</p>
    
    return <>{children}</>
}


export default AuthRoute