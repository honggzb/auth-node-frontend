import React, { SyntheticEvent, useState } from 'react';
import axios from 'axios';
import Login from './Login';

const Register = ( ) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e: SyntheticEvent) => {

    e.preventDefault();
    const res = await axios.post('register', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      password_confirm: passwordConfirm
    });
    setRedirect(true);
  }

  if(redirect) {
    return <Login />
  }

  return (
    <>
      <form className="form-signin w-100 m-auto" onSubmit={submit}>
        <div className="form-floating">
          <input type="text" className="form-control" placeholder="First name" required  onChange={e => setFirstName(e.target.value)}/>
          <label htmlFor="floatingInput">First Name</label>
        </div>
        <div className="form-floating">
          <input type="text" className="form-control"  placeholder="Last name" required onChange={e => setLastName(e.target.value)} />
          <label htmlFor="floatingInput">Last Name</label>
        </div>
        <div className="form-floating">
          <input type="email" className="form-control"  placeholder="Email" required onChange={e => setEmail(e.target.value)} />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control"  placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
          <label htmlFor="floatingInput">Password</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control"  placeholder="Password confirm" required onChange={e => setPasswordConfirm(e.target.value)}/>
          <label htmlFor="floatingInput">Password confirm</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
    </form>
  </>
  )
}

export default Register