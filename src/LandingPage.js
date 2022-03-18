import styled from 'styled-components';
import React, { useRef, useState } from "react";
import { StyledWhatIsYourNameText } from './StyledWhatIsYourNameText';

const StyledWhatIsYourNameContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledWhatIsYourNameInput = styled.input`
    font-size: 27px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledWhatIsYourNameContinue = styled(StyledWhatIsYourNameText)`
    top: 55%;
    opacity: 1;
    color: #fff;
`;
const LandingPage = param => {
    return (
        <StyledWhatIsYourNameContainer>
            <StyledWhatIsYourNameText>
                {param.name ? 'Hi ' + param.name : ''}
            </StyledWhatIsYourNameText>
            <Child setName={param.setName} />
        </StyledWhatIsYourNameContainer>
    );
}
const Child = param => {
    function onlySpaces(str) {
        return str.trim().length !== 0;
    }
    function isValidFirstname(str) {
        if (
            typeof str !== "string" ||
            /[0-9]+/g.test(str)
        ) {
            return false; 
        }
        return true;
    }
    function hasSymbols(str){
        const format = /[ `!@#€卐$%^&§*()_+\-=[\]{};':"\\|,.<>/?~]/;
        return !format.test(str)
    }
    const ref = useRef();
    const [showContinue, setShowContinue] = useState(false);
    const [removeInput, setRemoveInput] = useState(false);
    const handleKeyContinue = (e) => {
        if ((ref.current.value !== '' && onlySpaces(ref.current.value) && isValidFirstname(ref.current.value) && hasSymbols(ref.current.value)) && (e.key === 'Enter' || e.type === 'click')) { 
            param.setName(ref.current.value);
            setShowContinue(false);
            setRemoveInput(true);
            ref.current.value = '';
        }
    };
    const onChangeHandler = (e) => {
        e.target.value === '' ? setShowContinue(false) : setShowContinue(true);
    };
    return (
        <>
            {removeInput ? '' :
                <div>
                <StyledWhatIsYourNameInput
                    placeholder='Your name'
                    ref={ref}
                    onKeyDown={handleKeyContinue}
                    onChange={onChangeHandler}
                     />
                </div>
                     }
            {showContinue ? <StyledWhatIsYourNameContinue onClick={handleKeyContinue}>Press ⎆</StyledWhatIsYourNameContinue> : ''}
        </>
    );
};
export default LandingPage;
