import React from "react";
import "../styles/footer.css";
import { SiSwiggy } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer-container">
      <div id="footer-item1">
        <div id="info">For better experience , download the Swiggy app now</div>
        <div id="playstore-container">
          <div className="playstore-items">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
              alt="playstore-android"
            />
          </div>
          <div className="playstore-items">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/800px-Download_on_the_App_Store_Badge.svg.png"
              alt="playstore-mac"
            />
          </div>
        </div>
      </div>
      <div id="footer-item2">
       <div className="about-company">
        <div className="header">Company</div>
        <span>About</span>
        <span>Careers</span>
        <span>Team</span>
        <span>Swiggy one</span>
        <span>Swiggy Instamart</span>
        <span>Swiggy Genie</span>
       </div>
       <div className="about-company">
        <div className="header">Contact us</div>
        <span>Help & support</span>
        <span>Partner with us</span>
        <span>Ride with us</span>
        <div>Legal</div>
        <span>Terms & Conditions</span>
        <span>Cookie Policy</span>
       </div>
       <div className="about-company">
        <div className="header">We deliver to:</div>
        <span>Hyderabad</span>
        <span>Bangalore</span>
        <span>Mumbai</span>
        <span>Kolkata</span>
        <span>Harayana</span>
        <span>Delhi</span>
       </div>
       <div className="Swiggy-icon123">
       <SiSwiggy  className="swiggy-icon" />
       <span className="sw-span">Swiggy-Clone</span>
       <hr className="hrtag"></hr>
       <div className="copyright">© Madan_Agula</div>
       </div> 
       <div className="social">
       <Link to='https://github.com/Madan-Agula/Swiggy-Clone' target="_blank"> <div className="clon-img"><FaGithub /></div></Link>  
        <Link to="https://www.instagram.com/spangula.madhan/" target="_blank"><div className="clon-img"><FaInstagram /></div></Link>
          <div className="clon-img"><FaLinkedin /></div>
          <div className="clon-img"><FaTwitter /></div>
       </div>
      </div>
    </div>
  );
};

export default Footer;
