import React, { useState, useEffect } from "react"
import "../styles/main.css"

export default function RadioPlayerLower({ id2 }) {
    const [audioDataSong, setAudioDataSong] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(
                `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id2}&format=json`,
            )
                .then(response => response.json())
                .then(setAudioDataSong)
            console.log("Cheeky gander for Song data")
        }, 1000)
        return () => clearInterval(interval)
    }, [id2])

    if (!audioDataSong) return null
    if (audioDataSong) {
        return (
            <>
                <div
                    className='currently-playing'
                    aria-label='Currently playing'>
                    <span className='currently-playing-song-previous'>
                        {audioDataSong.song[1].title}
                    </span>
                    <span className='currently-playing-song'>
                        {audioDataSong.song[0].title
                            ? audioDataSong.song[0].title
                            : "DJ TALKING"}
                    </span>
                    <span className='currently-playing-song-next'>
                        {audioDataSong.song[2].title}
                    </span>
                </div>
            </>
        )
    }
    return <div></div>
}

// {
/* <div className='songDetails'>
<br></br>
<span className='currently-playing-artist-previous'>
	Prev
</span>
<span className='currently-playing-artist'>
	ARTIST
</span>
<span className='currently-playing-artist-next'>
	Next
</span>
</div>

<div id='album-container'>
<div className='album__holder'></div>
<div className='dot'></div>
</div>

<div className='weather-container'>
<div className='weather'>
	<div className='weather__Icon'></div>
	<p className='weather__location'></p>
	<p className='weather__temperature'></p>
</div>
</div>

<div
className='currently-playing'
aria-label='Currently playing'>
<span className='currently-playing-song-previous'>
	Prev
</span>
<span className='currently-playing-song'>
	SONG
</span>
<span className='currently-playing-song-next'>
	Next
</span>
</div>

<div className='volume-controls'>
<button
	name='mute'
	className='button mute-button'
	aria-label='Mute/unmute'>
	<i
		className='fas fa-volume-down'
		aria-hidden></i>
</button>
<input
	type='range'
	name='volume'
	className='volume'
	min='0'
	max='1'
	step='0.05'
	value='0.2'
	aria-label='Volume'
/>
</div>

<div className='circle-container'>
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
// }
