import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import Home from './Home';
import User from '../types/User';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const res: any = await axios.post('login', {
      email: email,
      password: password
    }, { withCredentials: true });
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setRedirect(true);
    // setLogin();
  }

  if(redirect) {
    return <Home />
  }

  return (
    <>
      <form className="form-signin w-100 m-auto" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input type="email" className="form-control"  placeholder="Email" required onChange={e => setEmail(e.target.value)}  />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control"  placeholder="Password" required onChange={e => setPassword(e.target.value)} />
          <label htmlFor="floatingInput">Password</label>
        </div>
        <div className="form-floating">
          <Link to="/forgot">Forgot password</Link>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    </form>
  </>
  )
}

export default Login