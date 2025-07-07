import React, { useState, useEffect } from "react"
import "./styles/main.css"
import "./styles/Playlist.css"
import Switch from "./components/Switch"
import Label from "./components/Label"
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

    // Fetch current song data
    useEffect(() => {
        if (!selectedStation) return
        
        const fetchCurrentSong = async () => {
            try {
                const response = await fetch(
                    `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${selectedStation}&format=json`
                )
                const data = await response.json()
                
                if (data.song && data.song[0]) {
                    setCurrentSong(data.song[0])
                }
            } catch (error) {
                console.error('Failed to fetch current song:', error)
            }
        }

        // Initial fetch
        fetchCurrentSong()
        
        // Update every 10 seconds
        const interval = setInterval(fetchCurrentSong, 10000)
        
        return () => clearInterval(interval)
    }, [selectedStation])

    // Create search query from song data
    const getArtworkSearchQuery = () => {
        if (!currentSong) return 'music vinyl'
        
        const { title, artist } = currentSong
        
        // Clean up the search query - remove common words that might not work well
        const cleanQuery = (text) => {
            if (!text) return ''
            return text
                .replace(/[^\w\s]/g, ' ') // Remove special characters
                .replace(/\b(feat|ft|featuring|remix|edit|version|live|acoustic|radio|mix)\b/gi, '') // Remove common music terms
                .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                .trim()
        }
        
        const cleanTitle = cleanQuery(title)
        const cleanArtist = cleanQuery(artist)
        
        // Prefer artist name if available, otherwise use song title
        if (cleanArtist && cleanArtist.length > 2) {
            return cleanArtist
        } else if (cleanTitle && cleanTitle.length > 2) {
            return cleanTitle
        }
        
        // Fallback searches
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
                        <RadioPlayerUpper id={selectedStation} />
                        <Artwork 
                            search={getArtworkSearchQuery()} 
                            isPlaying={isPlaying}
                            currentSong={currentSong}
                        />
                        <Weather location='Taby' />
                        <RadioPlayerLower id2={selectedStation} />
                        <Player
                            isHidden={isHidden}
                            setIsHidden={() => setIsHidden(!isHidden)}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            stationId={selectedStation}
                        />
                    </div>
                    <div className={isHidden ? "hidden" : ""}>
                        <Playlist id3={selectedStation} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App
