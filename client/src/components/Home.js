import React, { useEffect } from "react";
import Footer from "./Footer"
import NavBar from "./NavBar";
import '../App.css'
import { useState } from "react";
import {useOnline} from "../useOnline"
import { Outlet} from "react-router-dom";

const Home = () => {
    const [show, setShow] = useState(false);
    let online = useOnline();
   useEffect(()=>{
    window.scrollTo(0, 0);
   },[show])
    return (
      <>
        {!online ? (
          <h1 className="d-flex justify-content-center ms-5 mt-5">
            You're not connected to the internet 😫😫
          </h1>
        ) : (
          <>
            <NavBar showSeachBar={() => setShow(!show)} />
            <Outlet context={{show, showSeachBar:() => setShow(!show)}}/>
            <Footer />
          </>
        )}
      </>
    );
}

export default Home