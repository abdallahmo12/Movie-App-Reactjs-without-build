import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../imgs/logo-dark.webp';


function Navbar({crrUser , clearUser , search , searchFlag}) {


  return <>
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark bg-light d-flex justify-content-center align-items-center">
        <Link className="navbar-brand ms-2 mb-2" to='home'>
            <img src={logo} className='w-100' alt="img" />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
            {crrUser ? <ul className="navbar-nav mr-auto d-flex">
                <li className="nav-item active">
                    <Link className="nav-link" to='home'>Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='movies'>Movies</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='tvShows'>Tv Shows</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='actors'>Actors</Link>
                </li>
            </ul>: ''}
            <ul className="navbar-nav ms-auto d-flex align-items-center pe-2">
                {
                    searchFlag ? <li className="nav-item me-5">
                        <input onChange={search} className="form-control me-2" type="search" placeholder="Search By Movie Title" aria-label="Search" />
                    </li> : ""
                }
                <li className="nav-item">
                    <i className="fa-brands fa-facebook-f me-3"></i>
                    <i className="fa-brands fa-spotify me-3"></i>
                    <i className="fa-brands fa-instagram me-3"></i>
                    <i className="fa-brands fa-twitter me-3"></i>
                </li>
                {crrUser ? <li className="nav-item">
                    <span onClick={clearUser} className="nav-link" role="button">Logout</span>
                </li>: <>
                <li className="nav-item active">
                <Link className="nav-link fw-bold" to='register'>Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fw-bold" to='login'>Login</Link>
                </li>
                </>}
            </ul>
        </div>
    </nav>
  </>
}

export default Navbar