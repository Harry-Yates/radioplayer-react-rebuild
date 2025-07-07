import React from "react"
import "../styles/main.css"

export default function RadioPlayerUpper({ id, currentSong }) {
    if (!currentSong) {
        return (
            <div className='songDetails'>
                <br></br>
                <span className='currently-playing-artist-previous'>
                    PREV
                </span>
                <span className='currently-playing-artist'>
                    ARTIST
                </span>
                <span className='currently-playing-artist-next'>
                    NEXT
                </span>
            </div>
        )
    }

    return (
        <div className='songDetails'>
            <br></br>
            <span className='currently-playing-artist-previous'>
                {/* Previous artist not available in rightnow API */}
                LIVE
            </span>
            <span className='currently-playing-artist'>
                {currentSong.artist || "SVENSKA RADIO"}
            </span>
            <span className='currently-playing-artist-next'>
                {/* Next artist not available in rightnow API */}
                RADIO
            </span>
        </div>
    )
}
