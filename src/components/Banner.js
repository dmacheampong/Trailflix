import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube';
import './Banner.css';
import {fetchRandomShow, fetchVideo} from '..';

function Banner() {
    const [show, setShow] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        fetchRandomShow(setShow);
    }, []);
    
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    };

    const handleClick = (show) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
           fetchVideo(show, setTrailerUrl);
        }
    };
    
    const removeVideo = () => {
        if (trailerUrl) {
            setTrailerUrl("");
        }
    };

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${show?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }} onClick={() => removeVideo()}>
            <div className="banner__video">
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
            <div className="banner__contents">
                <h1 className="banner__title">{show?.title || show?.name || show?.original_name}</h1>
                <div className="banner__buttons">
                    <button onClick={() => handleClick(show)} className="banner__button">Play Trailer</button>
                </div>
            <h1 className="banner__description">{truncate(show?.overview, 475)}</h1>

            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner
