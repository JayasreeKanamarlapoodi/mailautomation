import { Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const CheckingDetails = () => {
    const navigate=useNavigate();
    const location = useLocation();
    console.log(location)
    const traineeDetails = location.state;
    const [trainee,setTrainee]=useState({
        traineeName:traineeDetails.traineeName,
    mobileNumber:traineeDetails.mobileNumber,
    mail: traineeDetails.mail
})
console.log(trainee)
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("trainee", trainee);
        const response = await fetch("http://localhost:8080/api/traineesWithHtmlBody", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(trainee),
        });
        console.log(response.ok)
        if (response.ok) {
          console.log("hi")
          navigate("/successMsg")
        }
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
                                    value={trainee.traineeName}
                                    onChange={(e) => setTrainee({ ...trainee, traineeName: e.target.value })}
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
                                    value={trainee.mobileNumber}
                                    onChange={(e) => setTrainee({ ...trainee, mobileNumber: e.target.value })}
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
                                    value={trainee.mail}
                                    onChange={(e) => setTrainee({ ...trainee, mail: e.target.value })}
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
                                Save
                            </Button>
                        </form>
                    </CardContent>
                </Card>

            </Box>
        </>
    );
}
export default CheckingDetails;