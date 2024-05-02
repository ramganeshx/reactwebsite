import "./aboutP.css";

import React from "react";
import { Link } from "react-router-dom";
import Ram from "/Users/ramganesh/Desktop/COMS319/Team139_Final/frontend/src/images/ram.png"
import Chi from "/Users/ramganesh/Desktop/COMS319/Team139_Final/frontend/src/images/chi.png"
import backImg from "/Users/ramganesh/Desktop/COMS319/Team139_Final/frontend/src/images/iowa.webp"
const AboutContent = () => {


    return (
      <div className="hero">
        <img className="intro-image" src={backImg}
          alt="backImg"></img>
        <div className="float-parent-element">
            <h1 className="h1a">
            <bold />
            About Us: SE319 Spring 2024
            </h1>
            
            <div className="float-child-element">
                <div className="black">
                <p className="a1">
                    
                    My name is Ram Ganesh, I am a sophomore majoring in Software
                    Engineering. I enjoy watching and playing sports, and love coding. 
                </p>
                
                    <img src={Ram} className="img" alt="ram" />
                </div>
            </div>

            <div className="float-child-element">
                <div className="black">
                    <p className="a2">
                        
                        My name is Chilana Amaratunga. I'm a sophmore majoring in Software
                        Enginering at the Iowa State Univerity. I love working on exciting
                        projects and getting things done.
                    </p>
                    
                        <img src={Chi} className="img" alt="chi" />
                </div>
                
            </div>
            </div>
        </div>
      
      /*
        
        */
       
    );

};

export default AboutContent