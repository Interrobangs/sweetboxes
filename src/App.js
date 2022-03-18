import "./App.css"
// import LandingPage from './LandingPage'
// import { StyledWhatIsYourNameText } from './StyledWhatIsYourNameText';
// import styled from 'styled-components'
import Home from './Home'
import { initializeApp } from 'firebase/app'
import { config } from './config/config'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthRoute from "./components/AuthRoute"
import Login from "./Login"


initializeApp(config.firebaseConfig)

// console.log(sql)
// async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
//         const result = await sql.query`select * from mytable where id = ${value}`
//         console.dir(result)
//     } catch (err) {
//         // ... error checks
//     }
// }

// const StyledFrontpageButton = styled.button`
//     color: white;
//     background-color: black ;
// `
function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={
                        <AuthRoute>
                            <Home/>
                        </AuthRoute>
                    }
                />
                <Route
                    path='/login'
                    element = {
                        <Login/>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
    // const [name, setName] = useState('');
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