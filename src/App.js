import React, { useState } from "react"
import "./styles/main.css"
import Switch from "./components/Switch"

function App() {
    const [isToggled, setIsToggled] = useState(false)
    return (
        <div className='App'>
            <body className={isToggled ? "dark" : "light"}>
                <main>
                    <div className='container'>
                        <div ClassName={isToggled ? "dark" : "light"}>
                            <Switch
                                isToggled={isToggled}
                                onToggle={() =>
                                    setIsToggled(!isToggled)
                                }
                            />
                        </div>
                    </div>
                </main>
            </body>
        </div>
    )
}

export default App
