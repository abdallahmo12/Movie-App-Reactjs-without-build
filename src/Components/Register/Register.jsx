import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setSearchFlag }) {

  useEffect(()=>{
    setSearchFlag(false);
  } ,[])

  const navigate = useNavigate();
  const [user , setUser] = useState({
    first_name: '',
    last_name: '',
    age: 0,
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
      first_name: Joi.string().alphanum().min(3).max(10).required() ,
      last_name: Joi.string().alphanum().min(3).max(15).required(),
      age: Joi.number().min(16).max(60).required(),
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
      let { data } = await axios.post( 'https://route-egypt-api.herokuapp.com/signup' , user );

      // console.log(res);
      if(data.errors){
        setErrMessage(data.message);
      }else{
        setErrMessage('');
        // console.log('Successeded Registeration !! Congrates');
        navigate('/login');
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
      <div className="w-50">
        <h2 className='my-3 py-2'>Registeration Form</h2>
        <form onSubmit={submitForm} >
          <label htmlFor="first_name">first_name</label>
          <input onChange={ getUser } type="text" className='form-control my-2' placeholder='first_name' id='first_name' aria-label='first_name'/>

          <label htmlFor="last_name">last_name</label>
          <input onChange={ getUser } type="text" className='form-control my-2' placeholder='last_name' id='last_name' aria-label='last_name'/>

          <label htmlFor="age">age</label>
          <input onChange={ getUser } type="number" className='form-control my-2' placeholder='age' id='age' aria-label='age'/>

          <label htmlFor="email">email</label>
          <input onChange={ getUser } type="email" className='form-control my-2' placeholder='email' id='email' aria-label='email'/>

          <label htmlFor="password">password</label>
          <input onChange={ getUser } type="password" className='form-control my-2 mb-3' placeholder='password' id='password' aria-label='password'/>

          <button className='btn btn-outline-primary'>Register</button>
        </form>
      </div>
    </div>
  </>
}

export default Register