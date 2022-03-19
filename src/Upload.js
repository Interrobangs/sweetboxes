// import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const Upload = (file) => {
    const storage = getStorage();
    // const [progress, setProgress] = useState(0);
    // const formHandler = (e) => {
    //     e.preventDefault();
    //     const file = e.target[0].files[0];
    //     uploadFiles(file);
    // };
    const uploadFiles = (file) => {
        if (!file)
            return;
        const storageRef = ref(storage, `/users/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => console.log(url));
            }
        );
    };
    // return (
    //     <div>
    //         <form onSubmit={formHandler}>
    //             <input type="file" />
    //             <button type="submit">Upload</button>
    //         </form>
    //         <p>Progress {progress} %</p>
    //     </div>
    // );
};

export default Upload