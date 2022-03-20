import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Login from './Login'
import AuthRoute from './components/AuthRoute'

function App(){
    const [userInfo, setUserInfo] = useState({});
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path = '/'
                    element = {
                        <AuthRoute>
                            <Home userInfo = { userInfo } />
                        </AuthRoute>
                    }
                />
                <Route
                    path = '/login'
                    element = {
                        <Login userInfo = { userInfo } setUserInfo = { setUserInfo }/>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App