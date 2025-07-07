import React, { useState } from "react"
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
                        <Artwork search='band' isPlaying={isPlaying} />
                        <Weather location='Bagarmossen' />
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
