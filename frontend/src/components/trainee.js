import { Box, Button, Card, CardContent, CardHeader, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Trainee = () => {
  const [traineeDetails, setTraineeDetails] = useState({
    traineeName: '',
    mobileNumber: '',
    mail: ''
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("trainee", traineeDetails);
    navigate("/checkDetails", { state: traineeDetails })
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            title="Trainee Registration Form"
            titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
            sx={{ textAlign: "center", backgroundColor: "#007BFF", color: "white", py: 2 }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  type="text"
                  value={traineeDetails.traineeName}
                  onChange={(e) => setTraineeDetails({ ...traineeDetails, traineeName: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  type="text"
                  label="Mobile Number"
                  variant="outlined"
                  value={traineeDetails.mobileNumber}
                  onChange={(e) => setTraineeDetails({ ...traineeDetails, mobileNumber: e.target.value })}
                  placeholder="Enter your mobile number"
                  required
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Mail Id"
                  variant="outlined"
                  type="mail"
                  value={traineeDetails.mail}
                  onChange={(e) => setTraineeDetails({ ...traineeDetails, mail: e.target.value })}
                  placeholder="Enter your mail id"
                  required
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#007BFF",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}

              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
        {/* <div>
      <button type='button' onClick={()=>navigate("/full-details")}>Click to Fullfill Details</button>
    </div> */}
      </Box>
    </>
  );
};

export default Trainee;
