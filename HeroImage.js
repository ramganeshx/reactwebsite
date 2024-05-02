import "./HeroImageStyles.css";
import React from 'react'


import IntroImg from "../images/home.jpeg"

import { Link } from "react-router-dom";
const HeroImg = () => {
  return (
    <div className="hero">
      <div className="mask">


        <img className="intro-image" src={IntroImg}
          alt="IntroImg"></img>

      </div>

      <div className="content">

        <h1>Welcome to <strong class = "ia">CyDash</strong></h1>
        <p>
          CyDash is a website
          designed to cater to the needs of Iowa State University students by delivering their desired Get and Go
          food items directly to them. As engineering majors ourselves, we empathize with the demands of busy
          schedules and the struggle to find time for meals. With CyDash, we aim to alleviate the inconvenience of
          having to walk to a cafe by offering a convenient delivery service, ensuring that hunger never
          compromises productivity. Thinking of ordering? Check out our menu!
  </p>
        <div>
          <Link to="/menu"
            className="btn">
            Menu
          </Link>
          <Link to="/about"
            className="btn btn-light">
            About Us
          </Link>

        </div>
      </div>
    </div>
  )
}

export default HeroImg;