import "./App.css"
import Home from './Home'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthRoute from "./components/AuthRoute"
import Login from "./Login"
import { useState } from "react"

function App(){
    const [userInfo, setUserInfo] = useState({});

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <AuthRoute>
                            <Home userInfo={userInfo} />
                        </AuthRoute>
                    }
                />
                <Route
                    path='/login'
                    element = {
                        <Login userInfo={userInfo} setUserInfo={setUserInfo}/>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App