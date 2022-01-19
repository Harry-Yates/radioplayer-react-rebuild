import React, { useState, useEffect } from "react"
import "../styles/main.css"

export default function Weather({ location }) {
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(
                `https://apis.scrimba.com/openweathermap/data/2.5/weather?q=${location}&units=metric`,
            )
                .then(response => response.json())
                .then(setWeatherData)
        }, 5000)
        return () => clearInterval(interval)
    }, [location])

    if (weatherData) {
        return (
            <div className='weather-container'>
                <div className='weather'>
                    <img
                        alt={"weatherIcon"}
                        className='weather__Icon'
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    />
                    <p className='weather__location'>
                        {weatherData.name}
                    </p>
                    <p className='weather__temperature'>
                        {Math.round(weatherData.main.temp)}º
                    </p>
                </div>
            </div>
        )
    }
    return <div className='intern'> Intern checking weather</div>
}
