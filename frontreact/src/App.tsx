
import {  BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import './App.css';
import React, { useEffect, useState } from 'react'
import Login from './pages/Login';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import axios from 'axios';
import User from "./types/User";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";

function App() {
  // const [user, setUser] = useState({} as User);
  // const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   ( async() => {
  //       try {
  //         const res = await axios.get('user');
  //         const user = res.data  as User;
  //         setUser(user);
  //       } catch (error) {
  //         setUser({} as User);
  //       }
  //   })();
  // }, [login]);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}> </Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/forgot" element={<Forgot />}></Route>
            <Route path="/reset/:token" element={ <Reset /> }></Route>
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;
