import React, { useEffect, useState } from 'react'
import axios from 'axios';
import User from '../types/User'
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/authSlice';
import { RootState } from '../redux/store';

const Home = ( ) => {
  const [message, setMessage] = useState('');
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(() => {
    ( async() => {
        try {

          const res = await axios.get('user');
          const user = res.data as User;
          setMessage(`Hi, ${user.first_name} ${user.last_name}`);
          dispatch(setAuth(true));

        } catch (error) {

          setMessage('You are not login!')
          dispatch(setAuth(false));

        }
    })();     //execute directly
  }, []);

  return (
    <div className='container'>
      <h1>{auth ? message : 'You are not authenticated!'} </h1>
    </div>
  )
}

export default Home