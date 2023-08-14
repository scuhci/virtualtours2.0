import React, { useEffect } from "react";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import NotFound from "./pages/NotFound";
import { MainView } from "./Main";
import { useRoutes } from "react-router-dom";
import NavBar from "./NavBar";
import "../css/app.scss";
import "../css/landing.scss";
import "../css/tour.scss";
import "../css/auth.scss";
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
    { path: "/login", element: <Authentication /> },
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
