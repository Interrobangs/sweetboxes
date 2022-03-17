import "./App.css"
import styled from 'styled-components'
import React, { useRef, useState } from "react"

const StyledWhatIsYourNameContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const StyledWhatIsYourNameInput = styled.input`
    font-size: 27px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const StyledWhatIsYourNameText = styled.p`
    font-size: 27px;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const StyledWhatIsYourNameContinue = styled(StyledWhatIsYourNameText)`
    top: 55%;
    opacity: 1;
    transition: opacity 2s;
`

function App() {
    const [name, setName] = useState('')
    return (
        <StyledWhatIsYourNameContainer>
            <StyledWhatIsYourNameText>
                {
                    name ? 'Hi ' + name : ''
                }
            </StyledWhatIsYourNameText>
            <Child setName={setName} />
        </StyledWhatIsYourNameContainer>
    )
}
  
const Child = param => {
    const ref = useRef();
    const [showContinue, setShowContinue] = useState(false)
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            param.setName(ref.current.value)
            setShowContinue(false)
            ref.current.value = ''
        }
    }
    const onChangeHandler = (e) => {
        e.target.value === '' ? setShowContinue(false) : setShowContinue(true)
    }
    return (
        <>
            <StyledWhatIsYourNameInput 
                placeholder = 'Your name'
                ref = {ref}
                onKeyDown = {handleKeyDown}
                onChange = {onChangeHandler}
            />
            {
                showContinue ? <StyledWhatIsYourNameContinue>Please press enter...</StyledWhatIsYourNameContinue> : ''
            }
        </>
    )
}

export default App