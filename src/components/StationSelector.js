import React, { useState, useEffect } from "react"
import "../styles/main.css"

export default function StationSelector({ selectedStation, onStationChange }) {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://api.sr.se/api/v2/channels?format=json&size=50')
                const data = await response.json()
                
                // Sort channels to put main channels (P1, P2, P3) first
                const sortedChannels = data.channels.sort((a, b) => {
                    const mainChannels = ['P1', 'P2', 'P3']
                    const aIsMain = mainChannels.includes(a.name)
                    const bIsMain = mainChannels.includes(b.name)
                    
                    if (aIsMain && !bIsMain) return -1
                    if (!aIsMain && bIsMain) return 1
                    return a.name.localeCompare(b.name)
                })
                
                setChannels(sortedChannels)
            } catch (err) {
                setError(err)
                console.error('Failed to fetch channels:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchChannels()
    }, [])

    if (loading) {
        return (
            <div className='station-selector-container'>
                <div className='station-selector loading'>Loading stations...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='station-selector-container'>
                <div className='station-selector error'>Failed to load stations</div>
            </div>
        )
    }


    const currentStation = channels.find(channel => channel.id.toString() === selectedStation)
    const displayName = currentStation ? currentStation.name : 'Select Station'

    return (
        <div className='station-selector-container'>
            <select 
                className='station-selector'
                value={selectedStation}
                onChange={(e) => onStationChange(e.target.value)}
                title={`Currently playing: ${displayName}`}
            >
                {channels.map(channel => (
                    <option key={channel.id} value={channel.id}>
                        {channel.name}
                    </option>
                ))}
            </select>
        </div>
    )
} 