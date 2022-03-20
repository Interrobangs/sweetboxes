import { useState } from 'react'
// import  Picker from 'emoji-picker-react'
import styled from 'styled-components'
import { getAuth, signOut } from 'firebase/auth'
import { useInterval } from './useInterval'
import { getDateNow } from './getDateNow'
import Read from './Read'

const Container = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 3vh;
`
function DateNow(){
  const [date, setDate] = useState([getDateNow()])
  useInterval(() => {
    setDate(getDateNow())
  }, 1000)
  return (
    <div>
      {date}
    </div>
  )
}

const Home = params => {
  const auth = getAuth()
  return (
    <>              
      <img src={params.userInfo.photo} aria-hidden alt='Profile Picture' />
      <br/>
      Account: {params.userInfo.name}
      <br/>
      <button onClick={()=>{ signOut(auth) }}>Sign Out</button>
      <DateNow/>
      <Read/>
      <Container>
      </Container>
    </>
  )
}

export default Home