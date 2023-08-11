import React, { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import { MainView } from "./Main";
import { useRoutes } from "react-router-dom";
import NavBar from "./NavBar";
import "../css/app.scss";
import "../css/landing.scss";
import "../css/tour.scss";
import "../css/login.scss";
import "../css/buttonstyles.scss";

const App = () => {
  useEffect(() => {
    window.addEventListener("scroll", function () {
      var header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 0);
    })
  }, [])
  const element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/:id", element: <Home /> },
    { path: "/tour", element: <MainView /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/404", element: <NotFound /> },
  ])
  return (
    <>
      <NavBar />
      <div className='container-fluid'>{element}</div>
    </>
  );
}

export default App;
