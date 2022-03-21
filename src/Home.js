// import  Picker from 'emoji-picker-react'
import { deleteUser, signOut } from 'firebase/auth'
import { auth } from './Firebase'
import { DateNow } from './DateNow'
import { Container } from './Container'
import { ToDoList } from './ToDoList'

const Home = params => {
  return (
    <>              
      <img src={params.userInfo.photo} aria-hidden alt='Profile Picture' />
      <DateNow/>
      <br/>
      Brugernavn: {params.userInfo.name}
      <br/>
      <button onClick={()=>{ signOut(auth) }}>Log ud</button>
      <button onClick={()=>{ deleteUser(auth.currentUser) }}>Log ud og slet bruger</button>
      <br/>
      <ToDoList userInfo={params.userInfo} />
      {/* <Read userInfo={params.userInfo.userId} /> */}
      <Container>
      </Container>
    </>
  )
}

export default Home