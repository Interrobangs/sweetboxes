import "./App.css"
// import LandingPage from './LandingPage'
// import { StyledWhatIsYourNameText } from './StyledWhatIsYourNameText';
// import styled from 'styled-components'
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
                            <img src={userInfo.photo} aria-hidden alt='Profile Picture' />
                            <br/>
                            Account: {userInfo.name}
                            <br/>
                            <Home/>
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
    // 
    // const [confirm, setConfirm] = useState(false)
    // return (
    //     confirm ? (
    //     <>
    //         <div>Account: {name}</div>
    //         <div onClick={()=>{
    //             setConfirm(false)
    //             setName('')
    //         }
    //         }>Sign out</div>
    //         <Home/>
    //     </>
    // ) : name 
    // ? (
    //     <StyledWhatIsYourNameText>
    //         {'Hi ' + name}
    //         <br/>
    //         <StyledFrontpageButton onClick={()=>{setName('')}}>Go back</StyledFrontpageButton>
    //         <StyledFrontpageButton onClick={()=>{setConfirm(true)}}>Continue</StyledFrontpageButton>
    //     </StyledWhatIsYourNameText>
    //  )
    // : <LandingPage name={name} setName={setName}/> 
    // )
}

export default App