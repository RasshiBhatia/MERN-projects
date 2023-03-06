import React,{ useState} from 'react'
import { Button, Input } from '@material-ui/core'
import './ImageUpload.css'
import firebase from 'firebase'
import { db, storage } from './firebase';
const ImageUpload = ({username}) => {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('')

    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                alert(error.message);
            },
            () => {
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    setUrl(url);
                    db.collection('posts').add({
                        imageUrl: url,
                        caption: caption,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        username: username,
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null)
                })
            }
        )
    }
    return ( 
        <div className='imageUpload'>
            {/* Caption Input*/}
            {/* File Picker */}
            {/* Post button */}
            <progress className='imageUpload__progress' value={progress} max="100"/>
            <Input onChange={(e) => setCaption(e.target.value)} type="text" placeholder='Enter a caption...' value={caption}/>
            <Input type="file" onChange={handleChange}/>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
