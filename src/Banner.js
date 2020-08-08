import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

const baseUrl = "https://image.tmdb.org/t/p/original/"; /* base url for sourcing images */


function Banner() {
  const [movie, setMovie] = useState(
    []
  ); /* hold data about random movie shown on Banner */

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchHypertubeOriginals);
      setMovie(
        request.data.results[
          Math.floor(
            Math.random() * request.data.results.length - 1
          ) /* select random movie*/
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);

  /* help to truncate text/description */
  function truncate(str, n) {
	  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
      </div>
	  <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
