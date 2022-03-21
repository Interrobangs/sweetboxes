import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { useState } from 'react'
import Home from './Home'
import Login from './Login'
import AuthRoute from './components/AuthRoute'
import { ToDoList } from './ToDoList'
// import { auth } from './Firebase'
import { deleteUser } from 'firebase/auth'
import { auth } from './Firebase'
import DaysTo from './DaysTo'

function App(){
    const Links = ()=>{
        return (
            <>
                <Link to="/">Home</Link>
                <Link to="/todos">ToDoList</Link>
                <Link to="/daysto">DaysTo</Link>
                <Link to="/settings">Settings</Link>
            </>
        )
    }

    const [userInfo, setUserInfo] = useState({});
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path = '/'
                    element = {
                        <AuthRoute setUserInfo = { setUserInfo } >
                            <Home userInfo = { userInfo } />
                            <Links/>
                        </AuthRoute>
                    }
                />
                <Route
                    path = '/todos'
                    element = {
                        <AuthRoute setUserInfo = { setUserInfo } >
                            <Home userInfo = { userInfo } />
                            <Links/>
                            <ToDoList userInfo={userInfo} />
                        </AuthRoute>
                    }
                />
                <Route
                    path = '/settings'
                    element = {
                        <AuthRoute setUserInfo = { setUserInfo } >
                            <Home userInfo = { userInfo } />
                            <Links/>
                            <br/>
                            <button onClick={()=>{ deleteUser(auth.currentUser) }}>Log ud og slet bruger</button>
                        </AuthRoute>
                    }
                />
                <Route
                    path = '/daysto'
                    element = {
                        <AuthRoute setUserInfo = { setUserInfo } >
                            <Home userInfo = { userInfo } />
                            <Links/>
                            <br/>
                            <DaysTo userInfo = { userInfo }/>
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