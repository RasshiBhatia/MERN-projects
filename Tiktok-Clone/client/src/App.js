import React,{ useEffect, useState } from 'react'
import Video from './Video'
import './App.css'
import Axios from './axios'
const App = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        async function fetchPost() {
            const response = await Axios.get('/v2/posts');
            setVideos(response.data);
            return response;
        }
        fetchPost();
        console.log(videos);
    }, [])
    return (
        <div className="app">
            <div className="app__videos">
        {videos.map(({url}) => (
            <Video url={url}/>
        ))}
            </div>

        </div>
    )

}


export default App;
