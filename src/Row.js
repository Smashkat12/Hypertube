import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/"; /* base url for sourcing images */

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // a snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // if [empty], run useEffect once and dont run again, else run once on component load and everysingle time [dependency] changes.

  const opts = {
	  height: "390",
	  width: "100%",
	  playerVars: {
		  autoplay: 1,
	  }
  }

  const handleClick = (movie) => {
	if(trailerUrl) {
		setTrailerUrl("");
	}else {
		movieTrailer(movie?.name || "")
		.then(url => {
			// https://www.youtube.com/watch?v=XtMThy8QKqU
			const urlParams = new URLSearchParams(new URL(url).search); /* allows for accessing individual url ?parameters */
			setTrailerUrl(urlParams.get("v")); 
		}).catch(error => console.log(error))
	}
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
			key={movie.id}
			onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`} /* if isLargeRow then add additional styling */
            src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
	  {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
}

export default Row;
