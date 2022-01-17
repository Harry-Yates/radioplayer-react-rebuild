import React from "react"
import "../styles/main.css"

const Switch = ({ isToggled, onToggle }) => {
    return (
        <div className='dark-light'>
            <div className='dark-light__switch'>
                <div className='switch'>
                    <div className='switch__2'>
                        <input
                            id='switch-2'
                            type='checkbox'
                            checked={isToggled}
                            onChange={onToggle}
                        />
                        <label htmlFor='switch-2'></label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Switch
