import {  useState } from 'react'
// import  Picker from 'emoji-picker-react'
import styled from 'styled-components'
import { signOut } from 'firebase/auth'
import { useInterval } from './useInterval'
import { getDateNow } from './getDateNow'
import { auth } from './Firebase'

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
  return (
    <>              
      <img src={params.userInfo.photo} aria-hidden alt='Profile Picture' />
      <br/>
      Account: {params.userInfo.name}
      <br/>
      <button onClick={()=>{ signOut(auth) }}>Sign Out</button>
      <DateNow/>
      {/* <Read userInfo={params.userInfo.userId} /> */}
      <Container>
      </Container>
    </>
  )
}

export default Home