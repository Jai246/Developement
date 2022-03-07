import React, { Component } from 'react';
import {movies} from './GetMovies';
export default class Banner extends Component {
  render() {
    let movie = movies.results[0];
    return (
        <>
        {  movie == ''?
            <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        :
        <div className = 'card-parent'>
            {
                <div className="card banner-card text-center">
                <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className="card-img-top banner-img"/>
               <div className="card-body">
                 <h5 className="card-title banner-title">{movie.original_title}</h5>
                 <p className="card-text banner-text text-center">{movie.overview}</p>
                 <a href="#" className="btn btn-primary">Go somewhere</a>
               </div>
           </div>
            }
        </div>
        }
    </>
    )
  }
}
