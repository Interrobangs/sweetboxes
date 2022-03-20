import { collection } from "@firebase/firestore"

import { db, firestore } from "./Firebase";
import { getDocs } from "@firebase/firestore"
const Read = () => {
    const collectionRef = collection(firestore, "users");
    const getCollectionData = async () => {
        const data = await getDocs(collectionRef);
        let values = []; // place to store your collection data
        data.docs.map((doc) => {
            values.push({ ...doc.data(), id: doc.id });
        });
        console.log(values)
    };
    return <>
        <button onClick={()=>{
            getCollectionData()
        }}>Read</button>
    </>
}
export default Read