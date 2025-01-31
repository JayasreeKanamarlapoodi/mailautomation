import React, { useState } from 'react';

const TraineeNew = () => {
  const [traineeDetails, setTraineeDetails] = useState({
    traineeName: '',
    mobileNumber: '',
    mail: '',
  });
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send data as multipart/form-data
    const formData = new FormData();
    formData.append('tobj',JSON.stringify({traineeName: traineeDetails.traineeName,
      mobileNumber: traineeDetails.mobileNumber,
      mail: traineeDetails.mail}));
    formData.append('file', file); // Add file
    formData.append('img', img);   // Add image
    console.log("FormData values:");
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
    try {
      const response = await fetch('http://localhost:8080/trainee/fulldetails', {
        method: 'POST',
        body: formData, // Use FormData directly
      });

      if (response.ok) {
        console.log('Success:', await response.json());
      } else {
        console.error('Error:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            onChange={(e) =>
              setTraineeDetails({ ...traineeDetails, traineeName: e.target.value })
            }
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={traineeDetails.mobileNumber}
            onChange={(e) =>
              setTraineeDetails({ ...traineeDetails, mobileNumber: e.target.value })
            }
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <div>
          <label>Mail:</label>
          <input
            type="email"
            value={traineeDetails.mail}
            onChange={(e) =>
              setTraineeDetails({ ...traineeDetails, mail: e.target.value })
            }
            placeholder="Enter your mail id"
            required
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            onChange={(e) => setImg(e.target.files[0])}
            accept="image/*"
            required
          />
        </div>
        <div>
          <label>Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TraineeNew;
