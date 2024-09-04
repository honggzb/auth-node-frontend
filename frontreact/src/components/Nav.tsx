
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setAuth } from '../redux/authSlice';

const Nav = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const dispatch = useDispatch();

  const logout = async () => {
    await axios.post('logout', {}, { withCredentials: true });
    axios.defaults.headers.common['Authorization'] = '';
    dispatch(setAuth(false));
  }

  let links;
  if(auth) {
    links = (
      <ul className="nav">
        <li className="nav-item"><Link to="/" className="nav-link px-2 text-white" onClick={logout}>Logout</Link></li>
      </ul>
    );
  } else {
    links = (
      <ul className="nav">
        <li className="nav-item"><Link to="/login" className="nav-link px-2 text-white">Login</Link></li>
        <li className="nav-item"><Link to="/register" className="nav-link px-2 text-white">Register</Link></li>
      </ul>
    );
  }

  return (
    <nav className="py-2 border-bottom bg-dark">
      <div className="container d-flex flex-wrap">
        <ul className="nav me-auto">
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-white">Home</Link></li>
        </ul>
        {links}
      </div>
    </nav>
  )

}

export default Nav