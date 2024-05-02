import axios from 'axios';
import "./FormStyles.css";
import {useState} from "react";

function SignupForm(){

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', {name, address, cart, email})
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  return (
    <div className="form" class = "formB">

      <form onSubmit={handleSubmit}>

        <label>Your Name</label>

        <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} required/>
        <label>Address</label>

        <input type="text" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)}required />
        
        <label>Cart</label>

        <input type="text" placeholder="Enter the items you want" onChange={(e) => setCart(e.target.value)} required/>
        
        <label>Email</label>
        
        <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required/>
        
        <button className="btn">Submit</button>
     
      </form>
    </div>
  );
}

export default SignupForm;