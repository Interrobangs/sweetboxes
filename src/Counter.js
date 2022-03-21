import { Fragment, useState } from 'react'
import  Picker from 'emoji-picker-react'
import styled from 'styled-components'
import { createGuid } from './createGuid';
import { db } from './Firebase';
import { getDoc, doc, setDoc, arrayUnion } from '@firebase/firestore';

const Container = styled.div`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 3vh;
`

const StyledBox = styled.div`
  text-align: center ;
  outline: solid black 1px;
  color: white;
  font-weight: bold;
  padding: 1vh;
  font-size: 5vh;
  display: grid;
  gap: 1vh;
`
function sortByCount(a, b) {
    if (a.count < b.count) {
      return -1;
    }
    if (a.count > b.count) {
      return 1;
    }
    return 0;
  }

const Counter = params => {
    const [newCounter, setNewCounter] = useState({
        key: '',
        emoji: 'X',
        color: '',
        count: 0,
        counterCount: 0
    })
    const [counters, setCounters] = useState([])
    const docRef = doc(db, 'counters', params.userInfo.userId);
    const getSingleCollectionData = async () => {
        let values = [];
        const data = await getDoc(docRef);
        if (data.exists()) {
            data.data().list.map((e) => {
            return values.push(e);
            });
            return setCounters(values)
        } else {
            console.log('No such document!');
            return setCounters(values)
        }
    };
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const removeItem = async (key) => {
        let values = [];
        const data = await getDoc(docRef);
        if (data.exists()) {
          data.data().list.map((e) => {
            if (e.key !== key) {
              return values.push(e);
            }else return <></>
          });
        }
        values = values.sort(sortByCount);
        setDoc(doc(db, 'counters', params.userInfo.userId), {
          list: values
        });
        getSingleCollectionData();
        return <></>;
      };
      const changeValue = async (e, v) => {
        const newCount = v ? e.counterCount + 1 : e.counterCount - 1
        let values = [{
            key: e.key,
            emoji: e.emoji,
            text: e.text,
            counterCount: newCount,
            count: e.count
        }]
        const firstKey = e.key
        const data = await getDoc(docRef);
        if (data.exists()) {
          data.data().list.map((e) => {
            if (e.key !== firstKey) {
              return values.push(e);
            }else return <></>
          });
        }
        values = values.sort(sortByCount);
        setDoc(doc(db, 'counters', params.userInfo.userId), {
          list: values
        });
        getSingleCollectionData();
      };
    return (
    <>
        <div>
            {showEmojiPicker ? <Picker onEmojiClick={(event, obj)=>{
                setNewCounter({
                    ...newCounter,
                    emoji: obj.emoji
                })
                setShowEmojiPicker(!showEmojiPicker)
            }} /> : <></>}
        </div>
        <button onClick={()=>{getSingleCollectionData()}}>Hent tidligere tællere</button>
        <Container>
            
        <>
        
        <StyledBox>
            <button onClick={()=>{
                setShowEmojiPicker(!showEmojiPicker)
            }}>Select Emoji</button>
                {newCounter.emoji}
            <input 
                placeholder='Du tæller..'
                onChange={(e)=>{
                    setNewCounter({
                        ...newCounter,
                        text: e.target.value
                    })
                }}
                
            />
            <button onClick={()=>{
                const obj = {
                    key: createGuid(),
                    emoji: newCounter.emoji,
                    text: newCounter.text,
                    count: 0,
                    counterCount: 0
                }
                setDoc(doc(db, 'counters', params.userInfo.userId), {
                list: arrayUnion({
                    key: obj.key,
                    emoji: obj.emoji,
                    text: obj.text,
                    counterCount: 0,
                    count: counters.length !== 0 ? (counters[counters.length - 1].count + 1) : 0

                })
                }, { merge: true });
                getSingleCollectionData()
            }
        }>Add</button>
        
        </StyledBox>
        {counters.map((e)=>{
                return <Fragment key={e.key}>
                <StyledBox style={{ background: e.color}}>
                    {e.emoji}
                    <p>{e.text}</p>
                    <p>{e.counterCount}</p>
                    <button onClick={()=>{
                    changeValue(e, true)
                }}>+</button>
                 <button onClick={()=>{
                    changeValue(e, false)
                }}>-</button>
                    <button onClick={()=>{
                        removeItem(e.key)
                    }}>Remove</button>
                </StyledBox>
                </Fragment>
            })}
        </>
        </Container>
    </>
  )
}

export default Counter