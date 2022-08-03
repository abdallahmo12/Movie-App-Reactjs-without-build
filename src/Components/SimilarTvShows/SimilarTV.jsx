import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function SimilarTV() {

    let {id} = useParams();
    const [tvSimilar, setTvSimilar] = useState([]);

    async function getSimilarTvShows(){
        let {data} = await axios.get(`https://api.themoviedb.org/3/tv/7B${id}7D/similar?api_key=1aaaaf17b3327df1383412379c3a3e53&language=en-US&page=1`);
        // console.log(data);
        setTvSimilar(data.results);
    }

    useEffect(()=>{
        getSimilarTvShows();
    } , [])
  return <>
    {tvSimilar.length ? <>
        {/* display all trending tvSimilar */}
        <div className="container">
            <div className="row align-items-center">
            <div className="col-md-4">
                <div className="sec-heading">
                <h3>Similar <br/> TV Shows <br/> To Watch Now</h3>
                <p className='text-muted'>Most Watched tvSimilar By Weeks</p>
                </div>
            </div>
            {
                tvSimilar.length ? tvSimilar.map((tv , index) => <>
                { tv.poster_path !== null ? <div key={index} className='col-md-2'>
                    <div className="movie">
                        <img src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`} alt="poster_img" className='w-100' />
                        <p>{tv.title}</p>
                    </div>
                </div> : ""}
                </>
                ):""
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

export default SimilarTV