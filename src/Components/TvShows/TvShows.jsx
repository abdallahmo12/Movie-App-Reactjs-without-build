import axios from 'axios';
import React, { useEffect, useState } from 'react'

function TvShows() {

  const [tvShows, setTvShows] = useState([]);

  const tvShowsAPI = async () =>{
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=1aaaaf17b3327df1383412379c3a3e53');
    console.log("tvShows",data.results);
    setTvShows(data.results);
  }
  useEffect(() => {
    //componentDidMount
    tvShowsAPI();
  }, [])
  return <>

{tvShows.length ? <>
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
              <div className="movie">
                <img src={`https://image.tmdb.org/t/p/original/${tvShow.poster_path}`} alt="poster_img" className='w-100' />
                <p>{tvShow.name}</p>
              </div>
            </div>) : <div className="display-2">Loading ....</div>
          }
        </div>
      </div>
    </> : <>
      <div className="all-height d-flex justify-content-center align-items-center">
          <i className='fa-solid fa-spinner fa-5x fa-spin text-white'></i>
      </div>
    </>}
  
  
  </>
}

export default TvShows