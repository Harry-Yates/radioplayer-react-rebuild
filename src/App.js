import React, { useState } from "react"
import "./styles/main.css"
import Switch from "./components/Switch"
import Artwork from "./components/Artwork"
import Weather from "./components/Weather"

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
                        <Artwork search='band' />
                        <Weather location='Bagarmossen' />
                    </div>
                </main>
            </body>
        </div>
    )
}

export default App
