import React, { useState } from 'react';

const Trainee = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Mobile Number: ${mobile}`);
    const trainee={
        Name: name,
        Number:mobile
    }
    console.log("trainee",trainee)
  };

  return (
    <div>
      <h2>Trainee Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter your mobile number"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Trainee;
