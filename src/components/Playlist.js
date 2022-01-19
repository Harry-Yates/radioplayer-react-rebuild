import React, { useState, useEffect } from "react"
import "../styles/main.css"
import "../styles/Playlist.css"

export default function Playlist({ id3 }) {
    const [channelData, setChannelData] = useState(null)

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(
                `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id3}&format=json`,
            )
                .then(response => response.json())
                .then(setChannelData)
        }, 1000)
        return () => clearInterval(interval)
    }, [id3])

    if (!channelData) return null
    if (channelData) {
        return (
            <div className='playlist'>
                <div className='playlistItemContainer'>
                    <div className='playlistItem'>
                        <span>1</span>
                        <div className='playlistItem-detail'>
                            <span>Song: </span>
                            {channelData.song[0].title}
                        </div>
                        <div className='playlistItem-detail'>
                            <span>Artist: </span>
                            {channelData.song[0].artist}
                        </div>
                        <hr className='hr'></hr>
                    </div>
                    <div className='playlistItem'>
                        <span>2</span>
                        <div className='playlistItem-detail'>
                            <span>Song: </span>
                            {channelData.song[1].title}
                        </div>
                        <div className='playlistItem-detail'>
                            <span>Artist: </span>
                            {channelData.song[1].artist}
                        </div>
                        <hr className='hr'></hr>
                    </div>
                    <div className='playlistItem'>
                        <span>3</span>
                        <div className='playlistItem-detail'>
                            <span>Song: </span>
                            {channelData.song[2].title}
                        </div>
                        <div className='playlistItem-detail'>
                            <span>Artist: </span>
                            {channelData.song[2].artist}
                        </div>
                        <hr className='hr'></hr>
                    </div>
                    <div className='playlistItem'>
                        <span>4</span>
                        <div className='playlistItem-detail'>
                            <span>Song: </span>
                            {channelData.song[3].title}
                        </div>
                        <div className='playlistItem-detail'>
                            <span>Artist: </span>
                            {channelData.song[3].artist}
                        </div>
                        <hr className='hr'></hr>
                    </div>
                </div>
            </div>
        )
    }
    return <div></div>
}

// export default function Playlist({ id3 }) {
//     const [channelData, setChannelData] = useState(null)

//     useEffect(() => {
//         const interval = setInterval(() => {
//             fetch(
//                 `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=${id3}&format=json`,
//             )
//                 .then(response => response.json())
//                 .then(setChannelData)
//         }, 1000)
//         return () => clearInterval(interval)
//     }, [id3])

//     if (channelData) {
//         return (
//             <div className='playlist'>
//                 {this.state.channelData.map(channel => (
//                     <div>
//                         <div>{channel.song.title}</div>
//                         <div>{channel.song.artist}</div>
//                     </div>
//                 ))}
//                 <div>{JSON.stringify(channelData)}</div>
//             </div>
//         )
//     }
//     return <div>hello</div>
// }
