// import  Picker from 'emoji-picker-react'
import { signOut } from 'firebase/auth'
import { auth } from './Firebase'
import { DateNow } from './DateNow'
import { Container } from './Container'

const Home = params => {
  return (
    <>              
      <img src={params.userInfo.photo} aria-hidden alt='Profile Picture' />
      <DateNow date={new Date()}/>
      <br/>
      Brugernavn: {params.userInfo.name}
      <br/>
      <button onClick={()=>{ signOut(auth) }}>Log ud</button>
      <br/>
      {/* <Read userInfo={params.userInfo.userId} /> */}
      <Container>
      </Container>
    </>
  )
}

export default Home