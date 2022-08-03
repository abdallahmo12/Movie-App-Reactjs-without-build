import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Actors() {

  const [actors, setActors] = useState([]);

  const actoersAPI = async () =>{
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/person/week?api_key=1aaaaf17b3327df1383412379c3a3e53');
    // console.log("actors",data.results);
    setActors(data.results);
  }

  useEffect(() => {
    actoersAPI();
  } , [])
  return <>
  
  {actors.length ? <>
      {/* display all trending actors */}
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
  
  </>
}

export default Actors