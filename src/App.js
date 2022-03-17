import "./App.css"
import LandingPage from './LandingPage'
import {useState} from 'react'
import { StyledWhatIsYourNameText } from './StyledWhatIsYourNameText';
import styled from 'styled-components'

const StyledFrontpageButton = styled.button`
    color: white;
    background-color: black ;
`

function App(){
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState(false)
    return (
        confirm ? (
        <div>Account: {name}</div>
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