import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './firstpage.css'



const FirstPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Check if the necessary information is available in localStorage when the component mounts
    const userDetailsString = localStorage.getItem('userDetails');
    if (!userDetailsString) {
      // If available, redirect to the second page
      navigate('/');
    }
  }, [navigate]);


  const handleSubmit = () => {
    if (name && phoneNumber && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phoneNumber, email }));
      navigate('/second-page'); // Use navigate instead of history.push
    } else {
      alert('Please enter all details before proceeding.');
    }
  };

  return (
    <div className='maincontainer'>
    <div className='container'>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
      />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
    </div>
  );
};

export default FirstPage;


