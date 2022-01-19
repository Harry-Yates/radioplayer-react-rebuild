import React, { useState, useRef, useEffect } from "react"
import "../styles/main.css"
import "../styles/player.css"
import "../styles/Playlist.css"
import "../components/Artwork"
import { SiTimescale } from "react-icons/si"
import { BsFillMusicPlayerFill } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

const Player = ({ isHidden, setIsHidden }) => {
    // state
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    // references
    const player = useRef() // reference our audio component
    const progressBar = useRef() // reference our progress bar
    const animationRef = useRef() // reference the animation

    useEffect(() => {
        const seconds = Math.floor(player.current.duration)
        setDuration(seconds)
        progressBar.current.max = seconds
    }, [player?.current?.loadedmetadata, player?.current?.readyState])

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
        progressBar.current.value = player.current.currentTime
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
    }

    const changeRange = () => {
        player.current.currentTime = progressBar.current.value
        changePlayerCurrentTime()
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty(
            "--seek-before-width",
            `${(progressBar.current.value / duration) * 90}%`,
        )
        setCurrentTime(progressBar.current.value)
    }

    const backThirty = () => {
        progressBar.current.value = Number(
            progressBar.current.value - 10,
        )
        changeRange()
    }

    return (
        <div className={"player"}>
            <audio
                ref={player}
                src='https://sverigesradio.se/topsy/direkt/srapi/164.mp3'
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
                <div className={"duration"}>Infinity:🚀</div>
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

/* <div className='circle-container'>
<button className='button play-pause-button'></button>
<div className='circle'>
	<span className='circle__btn shadow'>
		<audio
			src='http://sverigesradio.se/topsy/direkt/srapi/164.mp3'
			id='stream'></audio>
		<ion-icon
			className='pause visibility'
			name='pause'></ion-icon>
		<ion-icon
			className='play visibility'
			name='play'></ion-icon>
	</span>
	<span className='circle__back-1 paused'></span>
	<span className='circle__back-2 paused'></span>
</div>
</div> */
// } */}
