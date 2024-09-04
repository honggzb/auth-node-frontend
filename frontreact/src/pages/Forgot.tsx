import React, { SyntheticEvent, useState } from 'react'
import axios from 'axios';

const Forgot = () => {

  const [email, setEmail] = useState('');
  const [notify, setNotify] = useState({
    show: false,
    error: false,
    message: ''
  });

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.post('forgot', { email });
      setNotify({
        show: true,
        error: false,
        message: 'Email was sent!'
      })
    } catch (error) {
      setNotify({
        show: true,
        error: true,
        message: 'Email does not exists!'
      })
    }
  }

  let info;
  if(notify.show) {
    info = (
      <div className={notify.error ? 'alert alert-danger' : 'alert alert-success'} role='alert'>
        {notify.message}
      </div>
    )
  }

  return (
    <>
      <form className="form-signin w-100 m-auto" onSubmit={submit}>
        {info}
        <h1 className="h3 mb-3 fw-normal">Please set your email</h1>
        <div className="form-floating">
          <input type="email" className="form-control"  placeholder="Email" required onChange={e => setEmail(e.target.value)}  />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Send Email</button>
    </form>
    </>
  )
}

export default Forgot