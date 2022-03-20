import { collection } from "@firebase/firestore"
import { db, firestore } from "./Firebase";
import { getDocs, getDoc, doc } from "@firebase/firestore"

const Read = (params) => {
    const collectionRef = collection(firestore, "users");
    const getAllCollectionData = async () => {
        const data = await getDocs(collectionRef);
        let values = []; // place to store your collection data
        data.docs.map((doc) => {
            values.push({ ...doc.data(), id: doc.id });
        })
    }

    const docRef = doc(db, "users", params.userInfo.userId);
    const getSingleCollectionData = async () => {
        const data = await getDoc(docRef);
    }
    return <>
        <button onClick={()=>{
            getAllCollectionData()
        }}>Read All</button>
        <button onClick={()=>{
            getSingleCollectionData(params.userInfo.userId)
        }}>Read Single</button>
    </>
}

export default Read