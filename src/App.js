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

function App() {
    const [isToggled, setIsToggled] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    return (
        <div className='App'>
            <div className={isToggled ? "dark" : "light"}>
                <main>
                    <div className='container'>
                        <Switch
                            isToggled={isToggled}
                            onToggle={() => setIsToggled(!isToggled)}
                        />
                        <Label id='164' />
                        <RadioPlayerUpper id='164' />
                        <Artwork search='band' />
                        <Weather location='Bagarmossen' />
                        <RadioPlayerLower id2='164' />
                        <Player
                            isHidden={isHidden}
                            setIsHidden={() => setIsHidden(!isHidden)}
                        />
                    </div>
                    <div className={isHidden ? "hidden" : ""}>
                        <Playlist id3='164' />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default App
