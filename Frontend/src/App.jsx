import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/pages/Landingpage";
import CensorAudio from "./components/pages/CensorPage";
import CensorVideo from "./components/pages/CensorVideo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>404 Not Found</div>  
  },
   {
    path: "/censor",
    element: <CensorAudio />
  },{
    path: '/video',
    element: <CensorVideo/>
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
