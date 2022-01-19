import React, { useState, useEffect } from "react"
import "../styles/main.css"
import coverImage from "../assets/images/album.jpg"

export default function Artwork({ search }) {
    const [images, setimages] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!search) return
        setLoading(true)
        const interval = setInterval(() => {
            fetch(
                `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${search}`,
            )
                .then(response => response.json())
                .then(setimages)
                .then(() => setLoading(false))
                .catch(setError)
        }, 30000)

        const interval2 = setInterval(() => {
            fetch(
                `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${search}`,
            )
                .then(response => response.json())
                .then(setimages)
                .then(() => setLoading(false))
                .catch(setError)
            clearInterval(interval2)
        }, 4000)

        return () => clearInterval(interval)
    }, [search])

    if (loading)
        return (
            <div className='album-container'>
                <img
                    alt={"albumCover"}
                    src={coverImage}
                    style={{ animationPlayState: "paused" }}
                />
                <div className='dot'></div>
            </div>
        )
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    if (!images) return null

    return (
        <div className='album-container'>
            <img alt={"albumsearch"} src={images.urls.full} />
            <div className='dot'></div>
        </div>
    )
}
