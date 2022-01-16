import React, { useState } from "react"
import "./styles/main.css"
import Switch from "./components/Switch"

function App() {
    const [isToggled, setIsToggled] = useState(false)
    return (
        <div className='App'>
            <body className=''>
                <main>
                    <div className='container'>
                        <Switch
                            isToggled={isToggled}
                            onToggle={() => setIsToggled(!isToggled)}
                        />
                    </div>
                </main>
            </body>
        </div>
    )
}

export default App
