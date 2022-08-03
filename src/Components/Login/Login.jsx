import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login( { decodeToken  , setSearchFlag}) {

  useEffect(()=>{
    setSearchFlag(false);
  } ,[])
  const navigate = useNavigate();
  const [user , setUser] = useState({
    email: '',
    password: ''
  })
  //error list from joi validation
  const [errlist, setErrlist] = useState([]);
  // error message from Api request
  const [errMessage, setErrMessage] = useState('');

  const getUser = (e) =>{
    let inputValue = e.target.value;
    let addedUser = { ...user };

    addedUser[e.target.id] = inputValue;
    console.log(addedUser);
    setUser(addedUser);
  }
  //Submit Register Form
  async function submitForm(e){
    e.preventDefault();

    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(/^[a-z0-9]{6,}$/i).required()
    });

    const joiResponse = schema.validate( user  , { abortEarly: false});
    // console.log(joiResponse);
    if(joiResponse.error){
      setErrlist(joiResponse.error.details);
    }else{
      setErrlist([]);

      //call Api 
      let { data } = await axios.post( 'https://route-egypt-api.herokuapp.com/signin' , user );

      // console.log(res);
      if(data.status === 401){
        setErrMessage(data.message);
      }else{
        setErrMessage('');
        // console.log('Successeded Registeration !! Congrates');
        // console.log(data.token);
        localStorage.setItem('token',data.token);
        decodeToken();
        navigate('/home');
      }
    }
  }
  return <>
    <div className="container">
      {
        errMessage.length ? <div className='alert alert-danger py-1'> {errMessage} </div> : ""
      }
      {
        errlist.length ? errlist.map((err,i) => <div key={i} className='alert alert-danger py-1' role="alert"> {err.message}
        </div>): ""
      }
    </div>
    <div className="all-height w-100 d-flex justify-content-center align-items-center">
      <div className=" w-50">
        <h2 className='mb-3 pb-2'>Login Form</h2>
        <form onSubmit={submitForm} >
          
          <label htmlFor="email">email</label>
          <input onChange={ getUser } type="email" className='form-control my-3' placeholder='email' id='email' aria-label='email'/>

          <label htmlFor="password">password</label>
          <input onChange={ getUser } type="password" className='form-control my-3' placeholder='password' id='password' aria-label='password'/>

          <button className='btn btn-outline-primary'>Login</button>
        </form>
      </div>
    </div>
  </>
}

export default Login