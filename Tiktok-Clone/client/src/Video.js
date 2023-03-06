import React, { useRef, useState } from 'react'
import './Video.css'
import VideoFooter from './VideoFooter';
import VideoSidebar from './VideoSidebar'
const Video = ({ url }) => {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false)
    const handleVideoPress = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false)
        } else {
            videoRef.current.play();
            setPlaying(true)
        }
        //if video is playing
        //stop it

        //otherwise playit
    }
    return (
        <div className='video'>
            {/* <video className='video__player' loop src="https://vod-progressive.akamaized.net/exp=1615076693~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4127%2F17%2F445636626%2F1954201251.mp4~hmac=2ac59c377e1b63b58a85ce046cc2099be1065d1b4e72449faf5b5cf913895a3c/vimeo-prod-skyfire-std-us/01/4127/17/445636626/1954201251.mp4?filename=production+ID%3A5056339.mp4"></video> */}
            <video
                onClick={handleVideoPress}
                ref={videoRef}
                className='video__player'
                src={url}
            >

            </video>

            <VideoFooter />
            <VideoSidebar />
        </div>
    )
}

export default Video
