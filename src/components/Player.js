import React, { useState, useRef, useEffect } from "react"
import "../styles/main.css"
import "../styles/player.css"
import "../styles/Playlist.css"
import "../components/Artwork"
import { SiTimescale } from "react-icons/si"
import { BsFillMusicPlayerFill } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

const Player = ({ isHidden, setIsHidden, isPlaying, setIsPlaying, stationId }) => {
    // state
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    // references
    const player = useRef() // reference our audio component
    const progressBar = useRef() // reference our progress bar
    const animationRef = useRef() // reference the animation

    useEffect(() => {
        if (player.current && !isNaN(player.current.duration)) {
            const seconds = Math.floor(player.current.duration)
            setDuration(seconds)
            if (progressBar.current) {
                progressBar.current.max = seconds
            }
        }
    }, [player?.current?.loadedmetadata, player?.current?.readyState])

    useEffect(() => {
        if (player.current && stationId) {
            const wasPlaying = isPlaying
            
        
            if (wasPlaying) {
                player.current.pause()
                cancelAnimationFrame(animationRef.current)
            }
            
            player.current.src = `https://sverigesradio.se/topsy/direkt/srapi/${stationId}.mp3`
            player.current.load()
            
    
            if (progressBar.current) {
                progressBar.current.value = 0
                setCurrentTime(0)
            }
            

            if (wasPlaying) {
               
                setTimeout(() => {
                    player.current.play().then(() => {
                        animationRef.current = requestAnimationFrame(whilePlaying)
                    }).catch(error => {
                        console.log("Playback failed:", error)
                        setIsPlaying(false)
                    })
                }, 100)
            }
        }
    }, [stationId])

    const calculateTime = secs => {
        const minutes = Math.floor(secs / 60)
        const returnedMinutes =
            minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60)
        const returnedSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying
        setIsPlaying(!prevValue)
        if (!prevValue) {
            player.current.play()
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else {
            player.current.pause()
            cancelAnimationFrame(animationRef.current)
        }
    }

    const whilePlaying = () => {
        if (progressBar.current && player.current) {
            progressBar.current.value = player.current.currentTime
            changePlayerCurrentTime()
            animationRef.current = requestAnimationFrame(whilePlaying)
        }
    }

    const changeRange = () => {
        if (player.current && progressBar.current) {
            player.current.currentTime = progressBar.current.value
            changePlayerCurrentTime()
        }
    }

    const changePlayerCurrentTime = () => {
        if (progressBar.current && duration > 0) {
            progressBar.current.style.setProperty(
                "--seek-before-width",
                `${(progressBar.current.value / duration) * 90}%`,
            )
            setCurrentTime(progressBar.current.value)
        }
    }

    const backThirty = () => {
        if (progressBar.current) {
            progressBar.current.value = Number(
                progressBar.current.value - 10,
            )
            changeRange()
        }
    }

    return (
        <div className={"player"}>
            <audio
                ref={player}
                src={`https://sverigesradio.se/topsy/direkt/srapi/${stationId}.mp3`}
                preload='metadata'></audio>

            <div className={"playerContainer"}>
                {/* current time */}
                <div className={"currentTime"}>
                    {calculateTime(currentTime)}
                </div>

                {/* progress bar */}
                <div>
                    <input
                        type='range'
                        className={"progressBar"}
                        defaultValue='0'
                        ref={progressBar}
                        onChange={changeRange}
                    />
                </div>

                {/* duration */}
                <div className={"duration"}>Live 📻</div>
            </div>

            <div className={"buttonContainer"}>
                <button
                    className={"forwardBackward"}
                    onClick={backThirty}>
                    <SiTimescale />
                </button>
                <button
                    onClick={togglePlayPause}
                    className={"playPause"}>
                    {isPlaying ? (
                        <FaPause />
                    ) : (
                        <FaPlay className={"play"} />
                    )}
                </button>
                <button
                    className={"forwardBackward"}
                    onClick={setIsHidden}>
                    <BsFillMusicPlayerFill />
                </button>
            </div>
        </div>
    )
}

export default Player
