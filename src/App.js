import React, { useState } from "react"
import "./styles/main.css"
import Switch from "./components/Switch"
import Label from "./components/Label"
import Artwork from "./components/Artwork"
import Weather from "./components/Weather"
import RadioPlayerUpper from "./components/RadioPlayerUpper"
import RadioPlayerLower from "./components/RadioPlayerLower"

function App() {
    const [isToggled, setIsToggled] = useState(false)
    return (
        <div className='App'>
            <body className={isToggled ? "dark" : "light"}>
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
                        <RadioPlayerLower id='164' />
                    </div>
                </main>
            </body>
        </div>
    )
}

export default App
