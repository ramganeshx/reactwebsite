import "./NavbarStyles.css";

import React, {useState} from 'react';
import { Link } from "react-router-dom";

import {FaBars, FaTimes} from "react-icons/fa";

const Navbar = () => {


    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

  return (
    <div className = "header">
        <Link to = "/">
            <h1 class = "ia">CyDash</h1>
        </Link>
        <ul className= {click ? "nav-menu active" : "nav-menu"}>
            <li>
                <Link to ="/">Home</Link>
            </li>
            <li>
                <Link to ="/menu">Menu</Link>
            </li><li>
                <Link to ="/order">Order</Link>
            </li><li>
                <Link to ="/about">About</Link>
            </li>
        </ul>
        
        
    </div>
  )
}

export default Navbar