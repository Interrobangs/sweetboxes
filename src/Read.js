import { collection } from "@firebase/firestore"
import { firestore } from "./Firebase";
import { getDocs } from "@firebase/firestore"
const Read = () => {
    const collectionRef = collection(firestore, "users");
    const getCollectionData = async () => {
        const data = await getDocs(collectionRef);
        let values = []; // place to store your collection data
        data.docs.map((doc) => {
            return values.push({ ...doc.data(), id: doc.id });
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