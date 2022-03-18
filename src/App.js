import "./App.css"
import LandingPage from './LandingPage'
import { StyledWhatIsYourNameText } from './StyledWhatIsYourNameText';
import styled from 'styled-components'
import {useState} from 'react'
import Home from './Home'
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

const StyledFrontpageButton = styled.button`
    color: white;
    background-color: black ;
`
function App(){
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState(false)
    return (
        confirm ? (
        <>
            <div>Account: {name}</div>
            <div onClick={()=>{
                setConfirm(false)
                setName('')
            }
            }>Sign out</div>
            <Home/>
        </>
    ) : name 
    ? (
        <StyledWhatIsYourNameText>
            {'Hi ' + name}
            <br/>
            <StyledFrontpageButton onClick={()=>{setName('')}}>Go back</StyledFrontpageButton>
            <StyledFrontpageButton onClick={()=>{setConfirm(true)}}>Continue</StyledFrontpageButton>
        </StyledWhatIsYourNameText>
     )
    : <LandingPage name={name} setName={setName}/> 

    )
}

export default App