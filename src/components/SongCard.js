import React from "react"

export default function SongCard(props) {
    console.log(props)
    return (
        <div className='song-card'>
            <h3 className='song-card-title'>Song: {props.title}</h3>
            <p className='song-card-artist'>Artsit: {props.artist}</p>
            <hr />
        </div>
    )
}
