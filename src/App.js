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

    // Fetch current song data using the "rightnow" API
    useEffect(() => {
        if (!selectedStation) return
        
        const fetchCurrentSong = async () => {
            try {
                console.log('Fetching current song...', new Date().toLocaleTimeString())
                const startTime = Date.now()
                
                const response = await fetch(
                    `https://api.sr.se/api/v2/playlists/rightnow?format=json&channelid=${selectedStation}`
                )
                const data = await response.json()
                
                const fetchTime = Date.now() - startTime
                console.log(`Current song fetch completed in ${fetchTime}ms`)
                
                // Extract current song from the rightnow API response
                if (data.playlist && data.playlist.song) {
                    setCurrentSong(data.playlist.song)
                    console.log('Current song updated:', data.playlist.song.title)
                } else {
                    setCurrentSong(null)
                    console.log('No current song data available')
                }
            } catch (error) {
                console.error('Failed to fetch current song:', error)
                setCurrentSong(null)
            }
        }

 
        fetchCurrentSong()
  
        const interval = setInterval(fetchCurrentSong, 15000)
        
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
