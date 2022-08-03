import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

function Home({movies , tvShows , actors , setSearchFlag}) {
  useEffect(()=>{
    setSearchFlag(true);
  } ,[])
  return <>
  { movies.length > 0 && tvShows.length > 0 && actors.length > 0 ? <>

    {/* display all trending Movies */}
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <div className="sec-heading">
            <h3>Trending <br/> Movies <br/> To Watch Now</h3>
            <p className='text-muted'>Most Watched Movies By Weeks</p>
          </div>
        </div>
        { movies.length ? movies.map((movie , index) => <div key={index} className='col-md-2'>
          <Link to={`/movieDetails/${movie.id}`}>
            <div className="movie">
              <div className="img position-relative">
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster_img" className='w-100' />
                <span className='position-absolute d-block badg py-2 bg-primary text-white '>
                  <span className='ms-1 fw-bold fs-6'> {Math.round(movie.vote_average)} </span>
                  <i className="fa-solid fa-star me-1 fs-6"></i>
                </span>
                <div className='overlay justify-content-center align-items-center'>
                  {/* {movie.overview.substring(0,120)+"..."} */}
                  <span className='bg-primary p-1' role="button">Show More</span>
                </div>
              </div>
              <p>{movie.title}</p>
              
            </div>
          </Link>
        </div>) : <div className="display-2">Loading ....</div>}
      </div>
    </div> 
    {/* display all trending TV Shows */}
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <div className="sec-heading">
            <h3>Trending <br/> tvShows <br/> To Watch Now</h3>
            <p className='text-muted'>Most Watched tvShows By Weeks</p>
          </div>
        </div>
        {
          tvShows.length ? tvShows.map((tvShow , index) => <div key={index} className='col-md-2'>
            <Link to={`/similarTVShows/${tvShow.id}`}>
              <div className="movie">
                <div className="img position-relative">
                  <img src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`} alt="poster_img" className='w-100' />
                  <span className='position-absolute d-block badg p-2 bg-primary text-white '>
                    <span className='ms-1 fw-bold fs-6'> {Math.round(tvShow.vote_average)}  </span>
                  </span>
                  <div className='overlay justify-content-center align-items-center'>
                    <span className='bg-primary p-1' role="button">Show Similar</span>
                  </div>
                </div>
                <p>{tvShow.name}</p>
              </div>
            </Link>
          </div>) : <div className="display-2">Loading ....</div>
        }
      </div>
    </div>
    
    {actors.length ? <>
      {/* display all trending Actors & Actress */}
      <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <div className="sec-heading">
            <h3>Trending <br/> Actors <br/> To Watch Now</h3>
            <p className='text-muted'>Most Watched Actors By Weeks</p>
          </div>
        </div>
        {
          actors.length ? actors.map((actor , index) => <>
          {actor.profile_path ? 
          <div key={index} className='col-md-2'>
            
            <div className="movie">
              <img src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt="poster_img" className='w-100' />
              <p>{actor.name}</p>
            </div> 
          </div> : "" }
          </>) : <div className="display-2">Loading ....</div>
        }
      </div>
    </div>
    </> : <>
      {/* Loading Screen */}
      <div className="all-height d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-spinner fa-5x fa-spin text-white"></i>
      </div>
    </>}
  

    </> : <>
    <div className="all-height d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-5x fa-spin text-white"></i>
    </div>
    </>
  }
  </>
}

export default Home