import React, { useState, useEffect } from "react"
import "../styles/main.css"
import "../styles/Playlist.css"

function Playlist({ id3, currentSong }) {
    const [recentTracks, setRecentTracks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id3) return
        
        setLoading(true)
        const interval = setInterval(() => {
            const fetchPlaylistData = async () => {
                try {
                    console.log('Fetching playlist data (interval)...', new Date().toLocaleTimeString())
                    const startTime = Date.now()
                    
                    const response = await fetch(
                        `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id3}&format=json`
                    )
                    const data = await response.json()
                    
                    const fetchTime = Date.now() - startTime
                    console.log(`Playlist fetch (interval) completed in ${fetchTime}ms`)
                    
                    if (data.song) {
                        // Skip the first song if it matches current song to avoid duplicates
                        const filteredSongs = data.song.filter((song, index) => {
                            if (index === 0 && currentSong) {
                                // Skip if it's the same as current song
                                return !(song.title === currentSong.title && song.artist === currentSong.artist)
                            }
                            return true
                        })
                        
                        const formattedSongs = filteredSongs.map(song => ({
                            name: song.title || "Unknown Song",
                            artist: song.artist || "Unknown Artist",
                            description: song.description || "",
                            albumname: song.albumname || "",
                            isPlaying: false
                        }))
                        setRecentTracks(formattedSongs)
                        console.log(`Playlist updated (interval) with ${formattedSongs.length} tracks`)
                    }
                    setLoading(false)
                } catch (err) {
                    console.error("Failed to fetch playlist:", err)
                    setError(err)
                    setLoading(false)
                }
            }
            fetchPlaylistData()
        }, 15000) 

 
        const fetchPlaylistData = async () => {
            try {
                console.log('Fetching playlist data...', new Date().toLocaleTimeString())
                const startTime = Date.now()
                
                const response = await fetch(
                    `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id3}&format=json`
                )
                const data = await response.json()
                
                const fetchTime = Date.now() - startTime
                console.log(`Playlist fetch completed in ${fetchTime}ms`)
                
                if (data.song) {
                  
                    const filteredSongs = data.song.filter((song, index) => {
                        if (index === 0 && currentSong) {
                            return !(song.title === currentSong.title && song.artist === currentSong.artist)
                        }
                        return true
                    })
                    
                    const formattedSongs = filteredSongs.map(song => ({
                        name: song.title || "Unknown Song",
                        artist: song.artist || "Unknown Artist",
                        description: song.description || "",
                        albumname: song.albumname || "",
                        isPlaying: false
                    }))
                    setRecentTracks(formattedSongs)
                    console.log(`Playlist updated with ${formattedSongs.length} tracks`)
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

    // Combine current song with recent tracks
    const allTracks = []
    
    // Add current song at the top
    if (currentSong && currentSong.title) {
        allTracks.push({
            name: currentSong.title,
            artist: currentSong.artist || "Unknown Artist",
            description: currentSong.description || "",
            albumname: currentSong.albumname || "",
            isPlaying: true
        })
    }
    
    // Add recent tracks
    allTracks.push(...recentTracks)

    if (allTracks.length === 0) {
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
                    PLAYLIST ({allTracks.length} TRACKS)
                </h4>
                {allTracks.map((song, index) => (
                    <div key={index} className={`playlistItem ${song.isPlaying ? 'currently-playing-track' : ''}`}>
                        <span className='track-number'>
                            {song.isPlaying ? '♪' : index + 1}
                        </span>
                        <div className='playlistItem-detail'>
                            <span className='track-label'>
                                {song.isPlaying ? 'Now Playing: ' : 'Song: '}
                            </span>
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
