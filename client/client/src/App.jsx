import { useState } from "react";
import axios from "axios"; 
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const message = document.getElementById('message')

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post( "http://localhost:8000/api/user-login", formData);
      message.innerHTML = `
      <p>${response.data.message}</p>
      `
      message.style.color = "green"
    } catch (error) {
      message.innerHTML = `
      <p>${error.response.data.message}</p>
      `
      message.style.color = "red"
    };
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
    <h3>Log in into Speak Swift</h3>
      <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" name="email"onChange={handleChange}/>
      <input type="password" placeholder="Password"  name="password" onChange={handleChange}/>
      <button>Log In</button>
      <div id="message"></div>
      </form>
    </>
  )
}

export default App
