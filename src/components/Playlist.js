import React, { useState, useEffect } from "react"
import "../styles/main.css"
import "../styles/Playlist.css"

function Playlist() {
    const [channel, setChannel] = useState([])

    // STATE = How to write a variable in REACT, it's like short term memory for REACT.
    // https://disease.sh/v3/covid-19/channel

    // USEEFFECT  = Runs a piece of code based on a given conditional variable

    useEffect(() => {
        const interval = setInterval(() => {
            const getchannelData = async () => {
                await fetch(
                    `https://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=164&format=json`,
                )
                    .then(response => response.json())
                    .then(data => {
                        console.log("API data", data)
                        const channel = data.song.map(channel => ({
                            name: channel.title,
                            artist: channel.artist,
                        }))
                        console.log("Songs", channel)
                        setChannel(channel)
                    })
            }
            getchannelData()
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    if (!channel) return null
    if (channel) {
        return (
            <div className='playlist'>
                <div className='playlistItemContainer'>
                    <div variant='outlined' value='abc'>
                        <h4 class='playlist-title'>
                            PLAYLIST ({channel.length} SONGS)
                        </h4>
                        {channel.map((channel, index) => (
                            <div className='playlistItem'>
                                <span>{index + 1}</span>
                                <div className='playlistItem-detail'>
                                    <span>Song: </span>
                                    {channel.name}
                                </div>
                                <div className='playlistItem-detail'>
                                    <span>Artist: </span>
                                    {channel.artist}
                                </div>
                                <hr className='hr'></hr>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return <div></div>
}

export default Playlist

// import React, { useState, useEffect } from "react"
// import "../styles/main.css"
// import "../styles/Playlist.css"

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

//     if (!channelData) return null
//     if (channelData) {
//         return (
//             <div className='playlist'>
//                 <div className='playlistItemContainer'>
//                     <div className='playlistItem'>
//                         <span>1</span>
//                         <div className='playlistItem-detail'>
//                             <span>Song: </span>
//                             {channelData.song?.[0]?.title}
//                         </div>
//                         <div className='playlistItem-detail'>
//                             <span>Artist: </span>
//                             {channelData.song?.[0]?.artist}
//                         </div>
//                         <hr className='hr'></hr>
//                     </div>
//                     <div className='playlistItem'>
//                         <span>2</span>
//                         <div className='playlistItem-detail'>
//                             <span>Song: </span>
//                             {channelData.song?.[1]?.title}
//                         </div>
//                         <div className='playlistItem-detail'>
//                             <span>Artist: </span>
//                             {channelData.song?.[1]?.artist}
//                         </div>
//                         <hr className='hr'></hr>
//                     </div>
//                     <div className='playlistItem'>
//                         <span>3</span>
//                         <div className='playlistItem-detail'>
//                             <span>Song: </span>
//                             {channelData.song?.[2]?.title}
//                         </div>
//                         <div className='playlistItem-detail'>
//                             <span>Artist: </span>
//                             {channelData.song?.[2]?.artist}
//                         </div>
//                         <hr className='hr'></hr>
//                     </div>
//                     <div className='playlistItem'>
//                         <span>4</span>
//                         <div className='playlistItem-detail'>
//                             <span>Song: </span>
//                             {channelData.song?.[3]?.title}
//                         </div>
//                         <div className='playlistItem-detail'>
//                             <span>Artist: </span>
//                             {channelData.song?.[3]?.artist}
//                         </div>
//                         <hr className='hr'></hr>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     return <div></div>
// }
