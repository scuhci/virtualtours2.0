import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { MainView } from "./Main";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../css/app.css";
import "../css/landing.css";
import "../css/tour.css";

class App extends React.Component {
  componentDidMount() {
    window.addEventListener("scroll", function () {
      var header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 0);
    })
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className='container-fluid'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:id' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/tour' element={<MainView />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<Navigate replace to='/404' />} />
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
