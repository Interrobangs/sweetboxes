import { useState, Fragment } from 'react';
import { db } from "./Firebase";
import { doc, getDoc, setDoc, arrayUnion } from "@firebase/firestore";
import { createGuid } from './createGuid';

import { useInterval } from './useInterval';



const DaysTo = (params) => {

    const [eventCollection, setEventCollection] = useState([])
    
    const docRef = doc(db, "daysto", params.userInfo.userId);
    const getSingleCollectionData = async () => {
        let values = [];
        const data = await getDoc(docRef);
        if (data.exists()) {
          data.data().list.map((e) => {
            return values.push(e);
          });
          return setEventCollection(values)
        } else {
            console.log("No such document!");
            return setEventCollection(values)
        }
      };

      useInterval(() => {
        getSingleCollectionData()
      }, 1000);

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
        setDoc(doc(db, "daysto", params.userInfo.userId), {
          list: values
        });
        getSingleCollectionData();
        return <div></div>;
      };

    const [event, setEvent] = useState(
        {
            key: '',
            date: '',
            text: ''
        }
    )
    return <>
        <input type='datetime-local' step="1" onChange={(e)=>{
            setEvent({...event, date: e.target.value})}
        }/>
        <input placeholder='Ny tidsforskydning' type='text' onChange={(e)=>{
            setEvent({...event, text: e.target.value})}
        }/>
        <button onClick={
            ()=>{
                console.table(event)
                const obj = {
                    key: createGuid(),
                    date: event.date,
                    text: event.text
                }
                setDoc(doc(db, "daysto", params.userInfo.userId), {
                  list: arrayUnion({
                    key: obj.key,
                    date: obj.date,
                    text: obj.text
                  })
                }, { merge: true });
                getSingleCollectionData()
            }
        }>Add</button>
        {             
                eventCollection.map((e)=> {
                    var date1 = new Date();
                    var date2 = new Date(e.date);
                    
                    var diff = date2.getTime() - date1.getTime();
                    
                    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    diff -=  days * (1000 * 60 * 60 * 24);
                    
                    var hours = Math.floor(diff / (1000 * 60 * 60));
                    diff -= hours * (1000 * 60 * 60);
                    
                    var mins = Math.floor(diff / (1000 * 60));
                    diff -= mins * (1000 * 60);
                    
                    var seconds = Math.floor(diff / (1000));
                    diff -= seconds * (1000);
                    return (
                        <Fragment key={e.key}>
                            <div>{e.text}</div>
                            <div>{e.date} </div>
                            <div>{days + " days, " + hours + " hours, " + mins + " minutes, " + seconds + " seconds"}</div>
                            <button onClick={() => { removeItem(e.key); }}>Slet</button>
                        </Fragment>
                    )
                })
            }
    </>;
};

export default DaysTo