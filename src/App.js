import React, { useState, useEffect } from "react"
import "./styles/main.css"
import "./styles/Playlist.css"
import Switch from "./components/Switch"
import Artwork from "./components/Artwork"
import Player from "./components/Player"
import Weather from "./components/Weather"
import Playlist from "./components/Playlist"
import RadioPlayerUpper from "./components/RadioPlayerUpper"
import RadioPlayerLower from "./components/RadioPlayerLower"
import StationSelector from "./components/StationSelector"

function App() {
    const [isToggled, setIsToggled] = useState(false)
    const [isHidden, setIsHidden] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [selectedStation, setSelectedStation] = useState("164") // Default to P3
    const [currentSong, setCurrentSong] = useState(null)
    const [previousSong, setPreviousSong] = useState(null)
    const [nextSong, setNextSong] = useState(null)

    // Fetch current song data and playlist to get previous/next songs
    useEffect(() => {
        if (!selectedStation) return
        
        const fetchSongData = async () => {
            try {
                console.log('Fetching song data...', new Date().toLocaleTimeString())
                const startTime = Date.now()
                
                // Fetch both current song and playlist data
                const [currentResponse, playlistResponse] = await Promise.all([
                    fetch(`https://api.sr.se/api/v2/playlists/rightnow?format=json&channelid=${selectedStation}`),
                    fetch(`https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${selectedStation}&format=json`)
                ])
                
                const currentData = await currentResponse.json()
                const playlistData = await playlistResponse.json()
                
                const fetchTime = Date.now() - startTime
                console.log(`Song data fetch completed in ${fetchTime}ms`)
                
                // Extract current song from the rightnow API response
                if (currentData.playlist && currentData.playlist.song) {
                    setCurrentSong(currentData.playlist.song)
                    console.log('Current song updated:', currentData.playlist.song.title)
                } else {
                    setCurrentSong(null)
                    console.log('No current song data available')
                }
                
                // Extract previous and next songs from playlist
                if (playlistData.song && playlistData.song.length > 0) {
                    const songs = playlistData.song
                    
                    // Find current song in playlist (it's usually the first one)
                    let currentIndex = 0
                    if (currentData.playlist && currentData.playlist.song) {
                        const currentSongFromAPI = currentData.playlist.song
                        const foundIndex = songs.findIndex(song => 
                            song.title === currentSongFromAPI.title && 
                            song.artist === currentSongFromAPI.artist
                        )
                        if (foundIndex !== -1) {
                            currentIndex = foundIndex
                        }
                    }
                    
                    // Set previous song (next in the list, as it's reverse chronological)
                    if (currentIndex + 1 < songs.length) {
                        setPreviousSong(songs[currentIndex + 1])
                        console.log('Previous song updated:', songs[currentIndex + 1].title)
                    } else {
                        setPreviousSong(null)
                    }
                    
                    // Set next song (this is trickier for live radio, but we can show upcoming if available)
                    if (currentIndex > 0) {
                        setNextSong(songs[currentIndex - 1])
                        console.log('Next song updated:', songs[currentIndex - 1].title)
                    } else {
                        setNextSong(null)
                    }
                } else {
                    setPreviousSong(null)
                    setNextSong(null)
                }
            } catch (error) {
                console.error('Failed to fetch song data:', error)
                setCurrentSong(null)
                setPreviousSong(null)
                setNextSong(null)
            }
        }

        fetchSongData()
        const interval = setInterval(fetchSongData, 15000)
        
        return () => clearInterval(interval)
    }, [selectedStation])

    const getArtworkSearchQuery = () => {
        if (!currentSong) return 'music vinyl'
        
        const { title, artist } = currentSong
    
        const cleanQuery = (text) => {
            if (!text) return ''
            return text
                .replace(/[^\w\s]/g, ' ') 
                .replace(/\b(feat|ft|featuring|remix|edit|version|live|acoustic|radio|mix)\b/gi, '') 
                .replace(/\s+/g, ' ') 
                .trim()
        }
        
        const cleanTitle = cleanQuery(title)
        const cleanArtist = cleanQuery(artist)
        
        if (cleanArtist && cleanArtist.length > 2) {
            return cleanArtist
        } else if (cleanTitle && cleanTitle.length > 2) {
            return cleanTitle
        }
        
        return 'music album cover'
    }

    return (
        <div className='App'>
            <div className={isToggled ? "dark" : "light"}>
                <main>
                    <div className='container'>
                        <Switch
                            isToggled={isToggled}
                            onToggle={() => setIsToggled(!isToggled)}
                        />
                        <StationSelector 
                            selectedStation={selectedStation}
                            onStationChange={setSelectedStation}
                        />
                        <RadioPlayerUpper 
                            id={selectedStation} 
                            currentSong={currentSong}
                            previousSong={previousSong}
                            nextSong={nextSong}
                        />
                        <Artwork 
                            search={getArtworkSearchQuery()} 
                            isPlaying={isPlaying}
                            currentSong={currentSong}
                        />
                        <Weather location='Taby' />
                        <RadioPlayerLower 
                            id2={selectedStation}
                            currentSong={currentSong}
                            previousSong={previousSong}
                            nextSong={nextSong}
                        />
                        <Player
                            isHidden={isHidden}
                            setIsHidden={() => setIsHidden(!isHidden)}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            stationId={selectedStation}
                        />
                    </div>
                    <div className={isHidden ? "hidden" : ""}>
                        <Playlist 
                            id3={selectedStation} 
                            currentSong={currentSong}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App
