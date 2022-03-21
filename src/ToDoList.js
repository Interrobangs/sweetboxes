import { useState, Fragment } from 'react';
import { db } from "./Firebase";
import { getDoc, doc, setDoc, arrayUnion } from "@firebase/firestore";

export const ToDoList = (params) => {
  const docRef = doc(db, "todos", params.userInfo.userId);
  const [newToDo, setNewToDo] = useState('');
  const getSingleCollectionData = async () => {
    let values = [];
    const data = await getDoc(docRef);
    if (data.exists()) {
      data.data().list.map((e) => {
        return values.push(e);
      });
      return setToDo(values.sort(sortByCount));
    } else {
      setToDo(values);
      console.log("No such document!");
    }
  };

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
  const [toDo, setToDo] = useState([]);
  const addItem = () => {
    const newCount = toDo.length !== 0 ? toDo[toDo.length - 1].count + 1 : 0;
    console.log('made counter')
    setDoc(doc(db, "todos", params.userInfo.userId), {
      list: arrayUnion({
        key: uuidv4(),
        value: newToDo,
        checked: false,
        count: newCount
      })
    }, { merge: true });
    console.log('reload items')
    getSingleCollectionData();
    console.log('reload items done')
  };
  const onChangeHandler = (e) => {
    setNewToDo(e.target.value);
  };
  function sortByCount(a, b) {
    if (a.count < b.count) {
      return -1;
    }
    if (a.count > b.count) {
      return 1;
    }
    return 0;
  }
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
    setDoc(doc(db, "todos", params.userInfo.userId), {
      list: values
    });
    getSingleCollectionData();
    return <div></div>;
  };
  const checkboxHandler = async (key, checked, value, count) => {
    setToDo([]);
    let values = [{
      key: key,
      value: value,
      checked: checked,
      count: count
    }].sort((a, b) => (a.count > b.count) ? 1 : -1);
    const data = await getDoc(docRef);
    if (data.exists()) {
      data.data().list.map((e) => {
        if (e.key !== key) {
          return values.push(e);
        }else return <></>
      });
    }
    values = values.sort(sortByCount);
    setDoc(doc(db, "todos", params.userInfo.userId), {
      list: values
    });
    getSingleCollectionData();
  };
  return <>
    <br />
    {params.userInfo.name + "'s todo-list"}
    <br />
    <button style={{ cursor: 'pointer' }} onClick={() => { setToDo([]); getSingleCollectionData(); }}>Hent ToDo</button>
    <br />
    <input
      placeholder='Ny ToDo'
      onChange={onChangeHandler} />
      {newToDo.length < 1 ? 'true' : 'false'}
    <button style={{ cursor: 'pointer' }} disabled={newToDo.length < 1 ? true : false} onClick={() => { setToDo([]); addItem(); }}>Tilføj ToDo-element</button>
    <br />
    <br />
    {"To Do's: " + toDo.length}
    <br />
    <br />
    {toDo.map((item) => {
      const text = item.checked ? <div style={{ textDecorationLine: 'line-through' }}>{item.value}</div> : <div>{item.value}</div>;
      return <Fragment key={item.key}>
        {text}
        <input style={{ cursor: 'pointer' }}
          type='checkbox'
          onChange={(e) => checkboxHandler(item.key, e.target.checked, item.value, item.count)}
          defaultChecked={item.checked} />
        <button onClick={() => { setToDo([]); removeItem(item.key); }}>Slet</button>
      </Fragment>;
    })}
  </>;
};
