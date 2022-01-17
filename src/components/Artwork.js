import React, { useState, useEffect } from "react"
import "../styles/main.css"

export default function Artwork({ search }) {
    const [images, setimages] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!search) return
        setLoading(true)
        fetch(
            `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${search}`,
        )
            .then(res => res.json())
            .then(setimages)
            .then(() => setLoading(false))
            .catch(setError)
    }, [search])

    if (loading) return <h3>Loading...</h3>
    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
    if (!images) return null

    return (
        <div className='album-container'>
            <img alt={"albumsearch"} src={images.urls.full} />
            <div className='dot'></div>
        </div>
    )
}