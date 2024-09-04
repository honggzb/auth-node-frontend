import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Home from './Home';

const Reset = () => {

  const params = useParams();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const token =params.token;
    await axios.post('reset', {
      token,
      password,
      password_confirm:  passwordConfirm
    });
    setRedirect(true);
  }

  if(redirect) {
    return <Home />
  }

  return (
    <>
      <form className="form-signin w-100 m-auto" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please set your email</h1>
        <div className="form-floating">
          <input type="password" className="form-control"  placeholder="Password" required onChange={e => setPassword(e.target.value)} />
          <label htmlFor="floatingInput">Password</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control"  placeholder="Password Confirm" required onChange={e => setPasswordConfirm(e.target.value)} />
          <label htmlFor="floatingInput">Password confirm</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Reset password</button>
    </form>
    </>
  )
}

export default Reset