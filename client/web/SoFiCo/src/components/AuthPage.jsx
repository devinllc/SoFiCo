import React, { useState } from 'react';
import { addUser } from "../utils/axios";

function AuthPage() {
  const [addNewData, setaddData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: ""
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setaddData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addUser(addNewData);
      if (res.status === 200 || res.status === 201) {
        setMessage("Registration successful!");
        setaddData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: ""
        });
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className='bg-white p-5'>
      <h1 className='text-4xl'>Register Now</h1>
      {message && <div className="mb-2 text-green-600">{message}</div>}
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={addNewData.firstName} onChange={handleInputChange} name='firstName' placeholder='Enter First Name' required />
        <input type="text" value={addNewData.lastName} onChange={handleInputChange} name='lastName' placeholder='Enter Last Name' required />
        <input type="email" value={addNewData.email} onChange={handleInputChange} name='email' placeholder='Enter Email' required />
        <input type="password" value={addNewData.password} onChange={handleInputChange} name='password' placeholder='Enter Password' required />
        <input type="number" value={addNewData.phone} onChange={handleInputChange} name='phone' placeholder='Enter Phone Number' required />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default AuthPage;
