import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Movies() {
  const [movies, setMovies] = useState([]);

  const movieAPI = async () =>{
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1aaaaf17b3327df1383412379c3a3e53');
    console.log("movies",data.results);
    setMovies(data.results);
  }

  useEffect(() => {
    //componentDidMount
    movieAPI();
  }, [])

  return <>

    {movies.length ? <>
      {/* display all trending movies */}
      <div className="container">
          <div className="row align-items-center">
          <div className="col-md-4">
              <div className="sec-heading">
              <h3>Trending <br/> Movies <br/> To Watch Now</h3>
              <p className='text-muted'>Most Watched Movies By Weeks</p>
              </div>
          </div>
          {
              movies.length ? movies.map((movie , index) => <div key={index} className='col-md-2'>
              <div className="movie">
                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster_img" className='w-100' />
                  <p>{movie.title}</p>
              </div>
              </div>) : <div className="display-2">Loading ....</div>
          }
          </div>
      </div>
    </> : <>
      {/* Loading Screen */}
      <div className="all-height d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-spinner fa-5x fa-spin text-white"></i>
      </div>
    </>}
  </>
}

export default Movies