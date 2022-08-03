import Navbar from "./Components/Navbar/Navbar";
import { Routes , Route, Navigate } from 'react-router-dom';
import Home from "./Components/Home/Home";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Movies from "./Components/Movies/Movies";
import TvShows from "./Components/TvShows/TvShows";
import MovieDetails from "./Components/MovieDetailes/MovieDetails";
import jwtDecode from "jwt-decode";
import React , { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import Actors from "./Components/Actors/Actors";
import SimilarTV from "./Components/SimilarTvShows/SimilarTV";

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [actors, setActors] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  
  let movieAPI = async () =>{
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1aaaaf17b3327df1383412379c3a3e53');
    console.log("movies",data.results);
    setMovies(data.results);
  }
  const tvShowsAPI = async () =>{
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=1aaaaf17b3327df1383412379c3a3e53');
    console.log("tvShows",data.results);
    setTvShows(data.results);
  }
  const actoersAPI = async () =>{
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/person/week?api_key=1aaaaf17b3327df1383412379c3a3e53');
    console.log("actors",data.results);
    setActors(data.results);
  }
  // protected Route
  function ProtectedComp(props){
    if(localStorage.getItem('token')) 
    {return <> {props.children} </> }
    else{ 
      return <> <Navigate to="/login" /> 
    </>}
  }

  const [currentUser, setCurrentUser] = useState(null);
  let navigate = useNavigate();

  // console.log(localStorage.getItem('token'));
  function decodeToken(){
    let user = jwtDecode(localStorage.getItem('token'));
    // console.log(user);
    setCurrentUser(user);
  }

  function clearUserData(){
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  }

  //Search by movie title
  async function search(e){
    var searchVal = e.target.value;
    var {data} = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=1aaaaf17b3327df1383412379c3a3e53');
    var filtered = data.results.filter( movie =>   movie.title.toLowerCase() .includes( searchVal.toLowerCase() ) );
    console.log(filtered);
    setMovies(filtered);
  }

  useEffect(()=>{
    //componentDidMount
    actoersAPI();
    tvShowsAPI();
    movieAPI();
  (localStorage.getItem('token') && decodeToken())
  },[])

  return <>

  <Navbar crrUser={currentUser} clearUser={clearUserData}  search={search} searchFlag={searchFlag}/>

  <Routes>
    <Route path='' element={<Home  movies={movies} tvShows={tvShows} actors={actors} setSearchFlag={setSearchFlag}/>} />
    <Route path='home' element={<Home movies={movies} tvShows={tvShows} actors={actors}  setSearchFlag={setSearchFlag}/>} />
    <Route path='movies' element={<ProtectedComp> <Movies  setSearchFlag={setSearchFlag}/> </ProtectedComp>} />

    <Route path='movieDetails/:id' element={<ProtectedComp> <MovieDetails /> </ProtectedComp>} />
    <Route path='similarTVShows' element={<SimilarTV />}>
      <Route path=':id' element={<SimilarTV />} />
    </Route>

    <Route path='tvShows' element={<ProtectedComp> <TvShows  setSearchFlag={setSearchFlag}/> </ProtectedComp>} />
    <Route path='actors' element={<ProtectedComp> <Actors  setSearchFlag={setSearchFlag}/> </ProtectedComp>} />

    <Route path='register' element={<Register setSearchFlag={setSearchFlag}/>} />
    <Route path='login' element={<Login decodeToken={ decodeToken } setSearchFlag={setSearchFlag}/>} />
    <Route path='*' element={<NotFound />} />
  </Routes>
  
  </>
}

export default App;
