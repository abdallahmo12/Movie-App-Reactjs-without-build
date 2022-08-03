import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

function MovieDetails() {
    let { id } = useParams();
    let [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        const getMovieDetails = async () =>{
            let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1aaaaf17b3327df1383412379c3a3e53&language=en-US`);
            console.log(data);
            setMovieDetails(data);
            console.log('Hello');
        }
        getMovieDetails();
    } ,[]);

return <>
    {movieDetails ? <>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="poster">
                        <img className='w-100' src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`} alt="img" />
                    </div>
                </div>
                <div className="col-md-8">
                    {movieDetails? 
                    <div className="details">
                        <h2 className='py-3'>{movieDetails.original_title ? movieDetails.original_title :""}</h2>
                        <h3 className='py-3 text-muted'>{movieDetails.overview}</h3>
                        <div className="py-3">
                            { movieDetails.genres ? movieDetails.genres.map((genre , i) =><span key={i} className="bg-primary p-2 me-3 rounded">
                                {genre.name}
                            </span>) : ""}
                        </div>
                        <h4 className='py-3'>Vote: {movieDetails.vote_average ? movieDetails.vote_average :""}</h4>
                        <h4 className='py-2'>Vote Count: {movieDetails.vote_count ? movieDetails.vote_count:""}</h4>
                        <h4 className='py-2'>Popularity: {movieDetails.popularity ? movieDetails.popularity:""}</h4>
                        <h4 className='py-2'>release date: {movieDetails.release_date ? movieDetails.release_date:""}</h4>
                        {/* <h3 className='py-3 text-muted'>{movieDetails.overview ? movieDetails.overview:""}</h3> */}
                    </div>:<div>Loading....</div>}
                </div>
            </div>
        </div>
    </> : <>
        <div className="all-height d-flex justify-content-center align-items-center">
            <i className='fa-solid fa-spinner fa-5x fa-spin text-white'></i>
        </div>
    </>}
</>
}

export default MovieDetails