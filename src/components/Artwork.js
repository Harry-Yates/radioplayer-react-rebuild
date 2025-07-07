import React, { useState, useEffect, useRef } from "react"
import "../styles/main.css"
import coverImage from "../assets/images/album.jpg"

export default function Artwork({ search, isPlaying, currentSong }) {
    const [images, setimages] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [lastSearch, setLastSearch] = useState(search)
    const [textStyle, setTextStyle] = useState({ fill: '#6d5dfc', stroke: 'rgba(255,255,255,0.8)', strokeWidth: '1px' })
    const imageRef = useRef(null)

    // Function to analyze image brightness and set text style
    const analyzeImageAndSetTextStyle = (imageUrl) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = img.width
                canvas.height = img.height
                
                ctx.drawImage(img, 0, 0, img.width, img.height)
                
                // Sample pixels around the edge where text will be
                const edgePixels = []
                const sampleCount = 20
                
                // Sample around the circular edge
                for (let i = 0; i < sampleCount; i++) {
                    const angle = (i / sampleCount) * 2 * Math.PI
                    const radius = Math.min(img.width, img.height) * 0.4 // Sample at 80% radius
                    const x = (img.width / 2) + Math.cos(angle) * radius
                    const y = (img.height / 2) + Math.sin(angle) * radius
                    
                    const imageData = ctx.getImageData(x, y, 1, 1)
                    const [r, g, b] = imageData.data
                    edgePixels.push({ r, g, b })
                }
                
                // Calculate average brightness
                const avgBrightness = edgePixels.reduce((sum, pixel) => {
                    return sum + (pixel.r * 0.299 + pixel.g * 0.587 + pixel.b * 0.114)
                }, 0) / edgePixels.length
                
                // Determine text style based on brightness
                if (avgBrightness > 128) {
                    // Light background - use dark text with light stroke
                    setTextStyle({
                        fill: '#2d3748',
                        stroke: 'rgba(255,255,255,0.9)',
                        strokeWidth: '1.5px'
                    })
                } else {
                    // Dark background - use light text with dark stroke
                    setTextStyle({
                        fill: '#ffffff',
                        stroke: 'rgba(0,0,0,0.9)',
                        strokeWidth: '1.5px'
                    })
                }
            } catch (error) {
                console.log('Could not analyze image, using default styling')
                // Fallback to default
                setTextStyle({
                    fill: '#6d5dfc',
                    stroke: 'rgba(0,0,0,0.7)',
                    strokeWidth: '1px'
                })
            }
        }
        
        img.onerror = () => {
            // Fallback styling
            setTextStyle({
                fill: '#6d5dfc',
                stroke: 'rgba(0,0,0,0.7)',
                strokeWidth: '1px'
            })
        }
        
        img.src = imageUrl
    }

    useEffect(() => {
        if (!search) return
        
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
                    
                    // Analyze the image for dynamic text styling
                    analyzeImageAndSetTextStyle(data.urls.regular)
                } else {
                    const fallbackResponse = await fetch(
                        `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=music+vinyl+album`
                    )
                    const fallbackData = await fallbackResponse.json()
                    setimages(fallbackData)
                    analyzeImageAndSetTextStyle(fallbackData.urls.regular)
                }
                
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch artwork:', err)
                setError(err)
                setLoading(false)
            }
        }

        fetchImage()
        
        const interval = setInterval(fetchImage, 45000)
        
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
                        <text className='circular-text-content' style={{ fill: '#9baacf', stroke: 'rgba(0,0,0,0.5)', strokeWidth: '1px' }}>
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
                        <text className='circular-text-content' style={{ fill: '#6d5dfc', stroke: 'rgba(0,0,0,0.7)', strokeWidth: '1px' }}>
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
                ref={imageRef}
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
                    <text 
                        className='circular-text-content' 
                        style={{
                            fill: textStyle.fill,
                            stroke: textStyle.stroke,
                            strokeWidth: textStyle.strokeWidth,
                            paintOrder: 'stroke fill'
                        }}
                    >
                        <textPath href="#circle-path-image" startOffset="0%">
                            {getImageDescription()} • {getPhotographerCredit()} • {getImageDescription()} • {getPhotographerCredit()} • 
                        </textPath>
                    </text>
                </svg>
            </div>
        </div>
    )
}
