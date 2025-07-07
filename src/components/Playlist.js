import React, { useState, useEffect } from "react"
import "../styles/main.css"
import "../styles/Playlist.css"

function Playlist({ id3 }) {
    const [channel, setChannel] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id3) return
        
        setLoading(true)
        const interval = setInterval(() => {
            const fetchPlaylistData = async () => {
                try {
                    const response = await fetch(
                        `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id3}&format=json`
                    )
                    const data = await response.json()
                    
                    if (data.song) {
                        const formattedSongs = data.song.map(song => ({
                            name: song.title || "Unknown Song",
                            artist: song.artist || "Unknown Artist",
                            description: song.description || "",
                            albumname: song.albumname || "",
                        }))
                        setChannel(formattedSongs)
                    }
                    setLoading(false)
                } catch (err) {
                    console.error("Failed to fetch playlist:", err)
                    setError(err)
                    setLoading(false)
                }
            }
            fetchPlaylistData()
        }, 5000) // Update every 5 seconds

   
        const fetchPlaylistData = async () => {
            try {
                const response = await fetch(
                    `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id3}&format=json`
                )
                const data = await response.json()
                
                if (data.song) {
                    const formattedSongs = data.song.map(song => ({
                        name: song.title || "Unknown Song",
                        artist: song.artist || "Unknown Artist",
                        description: song.description || "",
                        albumname: song.albumname || "",
                    }))
                    setChannel(formattedSongs)
                }
                setLoading(false)
            } catch (err) {
                console.error("Failed to fetch playlist:", err)
                setError(err)
                setLoading(false)
            }
        }
        fetchPlaylistData()

        return () => clearInterval(interval)
    }, [id3])

    if (loading) {
        return (
            <div className='playlist'>
                <div className='playlistItemContainer'>
                    <h4 className='playlist-title'>LOADING PLAYLIST...</h4>
                    <div className='playlistItem'>
                        <div className='playlistItem-detail'>
                            Fetching latest tracks...
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='playlist'>
                <div className='playlistItemContainer'>
                    <h4 className='playlist-title'>ERROR LOADING PLAYLIST</h4>
                    <div className='playlistItem'>
                        <div className='playlistItem-detail'>
                            Failed to load playlist data
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!channel || channel.length === 0) {
        return (
            <div className='playlist'>
                <div className='playlistItemContainer'>
                    <h4 className='playlist-title'>NO TRACKS AVAILABLE</h4>
                </div>
            </div>
        )
    }

    return (
        <div className='playlist'>
            <div className='playlistItemContainer'>
                <h4 className='playlist-title'>
                    PLAYLIST ({channel.length} SONGS)
                </h4>
                {channel.map((song, index) => (
                    <div key={index} className='playlistItem'>
                        <span className='track-number'>{index + 1}</span>
                        <div className='playlistItem-detail'>
                            <span className='track-label'>Song: </span>
                            <span className='track-name'>{song.name}</span>
                        </div>
                        <div className='playlistItem-detail'>
                            <span className='track-label'>Artist: </span>
                            <span className='track-artist'>{song.artist}</span>
                        </div>
                        {song.albumname && (
                            <div className='playlistItem-detail'>
                                <span className='track-label'>Album: </span>
                                <span className='track-album'>{song.albumname}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Playlist
