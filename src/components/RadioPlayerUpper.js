import React, { useState, useEffect } from "react"
import "../styles/main.css"

export default function RadioPlayerUpper({ id }) {
    const [audioData, setAudioData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        const interval = setInterval(() => {
            fetch(
                `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id}&format=json`,
            )
                .then(response => response.json())
                .then(setAudioData)
                .then(() => setLoading(false))
                .catch(setError)
            // console.log("Quick little check for Artist data")
        }, 4000)
        return () => clearInterval(interval)
    }, [id])

    if (loading)
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
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    if (!id) return null

    if (!audioData) return null
    if (audioData) {
        return (
            <div className='songDetails'>
                <br></br>
                <span className='currently-playing-artist-previous'>
                    {audioData.song[1].artist}
                </span>
                <span className='currently-playing-artist'>
                    {audioData.song[0].artist}
                </span>
                <span className='currently-playing-artist-next'>
                    {audioData.song[2].artist}
                </span>
            </div>
        )
    }
    return <div></div>
}
