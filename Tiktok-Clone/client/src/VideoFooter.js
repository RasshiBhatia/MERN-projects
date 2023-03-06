import React from 'react'
import './VideoFooter.css'
import Ticker from 'react-ticker'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
const VideoFooter = () => {
    return (
        <div className='videoFooter'>
            <div className="videoFooter__text">
                <h3>@nikhilsingh</h3>
                <p>This is some description</p>
                <div className="videoFooter__ticker">
                    <MusicNoteIcon className='videoFooter__icon' />
                    <Ticker className='ticker' mode='smooth'>
                        {({ index }) => (
                            <>
                                <p>I am a song</p>
                            </>
                        )}
                    </Ticker>
                </div>
            </div>
            <img src="https://static.thenounproject.com/png/934821-200.png" alt="" className="videoFooter__record" />
        </div>
    )
}

export default VideoFooter
