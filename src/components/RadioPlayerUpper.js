import React from "react"
import "../styles/main.css"

export default function RadioPlayerUpper({ id, currentSong, previousSong, nextSong }) {
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
                {previousSong ? (previousSong.artist || "PREVIOUS") : "LIVE"}
            </span>
            <span className='currently-playing-artist'>
                {currentSong.artist || "SVENSKA RADIO"}
            </span>
            <span className='currently-playing-artist-next'>
                {nextSong ? (nextSong.artist || "NEXT") : "RADIO"}
            </span>
        </div>
    )
}
