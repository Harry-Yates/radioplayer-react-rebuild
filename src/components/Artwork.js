import React, { useState, useEffect } from "react"
import "../styles/main.css"
import coverImage from "../assets/images/album.jpg"

export default function Artwork({ search, isPlaying, currentSong }) {
    const [images, setimages] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [lastSearch, setLastSearch] = useState(search)

    useEffect(() => {
        if (!search) return
        
        // Only fetch new image if search term has changed significantly
        if (search === lastSearch) return
        
        setLoading(true)
        setLastSearch(search)
        
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${encodeURIComponent(search)}`
                )
                const data = await response.json()
                
                if (data.urls) {
                    setimages(data)
                    setError(null)
                } else {
                    // If no results, try fallback search
                    const fallbackResponse = await fetch(
                        `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=music+vinyl+album`
                    )
                    const fallbackData = await fallbackResponse.json()
                    setimages(fallbackData)
                }
                
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch artwork:', err)
                setError(err)
                setLoading(false)
            }
        }

        fetchImage()
        
        // Set up interval for periodic updates (longer interval to avoid rate limiting)
        const interval = setInterval(fetchImage, 45000) // 45 seconds
        
        return () => clearInterval(interval)
    }, [search])

    const getImageClassName = () => {
        if (isPlaying) {
            return "spinning"
        }
        return "paused"
    }

    const getImageAltText = () => {
        if (currentSong && currentSong.title) {
            return `Artwork for ${currentSong.title}`
        }
        return "Album artwork"
    }

    const getImageDescription = () => {
        if (images && images.description) {
            return images.description
        }
        if (images && images.alt_description) {
            return images.alt_description
        }
        if (currentSong && currentSong.title) {
            return `${currentSong.artist || 'Unknown Artist'} - ${currentSong.title}`
        }
        return "Music Vibes"
    }

    const getPhotographerCredit = () => {
        if (images && images.user && images.user.name) {
            return `Photo by ${images.user.name}`
        }
        return ""
    }

    if (loading)
        return (
            <div className='album-container'>
                <img
                    alt={"Loading artwork..."}
                    src={coverImage}
                    className={getImageClassName()}
                />
                <div className='dot'></div>
                <div className='image-description-container'>
                    <svg className='circular-text' viewBox="0 0 200 200">
                        <path
                            id="circle-path"
                            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                            fill="none"
                        />
                        <text className='circular-text-content loading-text'>
                            <textPath href="#circle-path" startOffset="0%">
                                Loading artwork... • Loading artwork... • Loading artwork... • 
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>
        )
    
    if (error || !images) {
        return (
            <div className='album-container'>
                <img
                    alt={"Default album cover"}
                    src={coverImage}
                    className={getImageClassName()}
                />
                <div className='dot'></div>
                <div className='image-description-container'>
                    <svg className='circular-text' viewBox="0 0 200 200">
                        <path
                            id="circle-path-default"
                            d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                            fill="none"
                        />
                        <text className='circular-text-content'>
                            <textPath href="#circle-path-default" startOffset="0%">
                                Swedish Radio • Music Player • Swedish Radio • Music Player • 
                            </textPath>
                        </text>
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <div className='album-container'>
            <img 
                alt={getImageAltText()}
                src={images.urls.full} 
                className={getImageClassName()}
                title={`Search: ${search}`}
            />
            <div className='dot'></div>
            <div className='image-description-container'>
                <svg className='circular-text' viewBox="0 0 200 200">
                    <path
                        id="circle-path-image"
                        d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
                        fill="none"
                    />
                    <text className='circular-text-content'>
                        <textPath href="#circle-path-image" startOffset="0%">
                            {getImageDescription()} • {getPhotographerCredit()} • {getImageDescription()} • {getPhotographerCredit()} • 
                        </textPath>
                    </text>
                </svg>
            </div>
        </div>
    )
}
