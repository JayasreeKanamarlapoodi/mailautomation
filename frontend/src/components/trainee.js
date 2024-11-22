import React, { useState } from 'react';

const Trainee = () => {
  const [traineeDetails,setTraineeDetails]=useState({
    traineeName:'',
    mobileNumber:'',
    mail:''
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("trainee",traineeDetails);
    const response=await fetch("http://localhost:8080/api/trainees",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(traineeDetails),
    });
    console.log("response",response)
  };
  return (
    <div>
      <h2>Trainee Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={traineeDetails.traineeName}
            onChange={(e) => setTraineeDetails({...traineeDetails,traineeName:e.target.value})}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={traineeDetails.mobileNumber}
            onChange={(e) => setTraineeDetails({...traineeDetails,mobileNumber:e.target.value})}
            placeholder="Enter your mobile number"
          />
        </div>
        <div>
          <label>Mail:</label>
          <input
            type="mail"
            value={traineeDetails.mail}
            onChange={(e) => setTraineeDetails({...traineeDetails,mail:e.target.value})}
            placeholder="Enter your mail id"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Trainee;
