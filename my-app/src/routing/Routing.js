import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home/Home"
import About from "../pages/about/About"
import Contact from "../pages/contact/Contact"
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";

const router = createBrowserRouter([
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
          path: "/signup",
          element: <Signup />
      },
        {
          path: "/login",
          element: <Login />
        },

      ],
 );
  
  export default function App() {
    return <RouterProvider router={router} />;
  }





