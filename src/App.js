import { useState } from "react";
import  Picker from 'emoji-picker-react'
import "./App.css";
import styled from 'styled-components'


const Container = styled.div`
  display: grid;
  gap: 3vh;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  margin: 10px;
`

function Box({ children, k, disableCounter, ...props }) {
  const [counter, setCount] = useState([]);
  return (
    <div onClick={() => setCount((c) => [...c, new Date()])}
      {...props}
      style={{
        ...(props.style ?? {}),
        display: "grid",
        placeItems: "center",
        color: "#fff"
      }}
    >
      {children}
      {!disableCounter && (
        <>
          <div>
            {counter.length}
          </div>
          <button onClick={() => alert(counter.join("\n"))}>...</button>
        </>
      )}
    </div>
  );
}

const StyledBox = styled(Box)`
  outline: solid black 1px;
  color: white;
  font-weight: bold;
  padding: 1vh ;
  background: lightslategrey ;
  font-size: 5vh ;
  display: grid;
  gap: 1vh;
`

export default function App() {
  const onEmojiClick = (e, emojiObject) => {
    setBoxes([...boxes, { content: emojiObject.emoji }])
    showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(true)
  };
  const [boxes, setBoxes] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  return (
    <Container>
      {boxes.map(({ content }, i) => (
        <StyledBox key={i}>
          {content}
        </StyledBox>
      ))}
      { showEmojiPicker 
        ? <Picker onEmojiClick={onEmojiClick}/> 
        : <StyledBox disableCounter={true} onClick={() => { setShowEmojiPicker(true) }
      }
      > + </StyledBox> }
    </Container>
  );



}
