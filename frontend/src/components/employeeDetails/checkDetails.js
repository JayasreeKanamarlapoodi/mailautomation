import { Box, Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postingTraineeDetails } from "../../redux/trainee/traineeAction";


const CheckingDetails = () => {
    const navigate=useNavigate();
     const dispatch=useDispatch();
    const location = useLocation();
    const traineeDetails = location.state;
    const [trainee,setTrainee]=useState({
        traineeName:traineeDetails.traineeName,
    mobileNumber:traineeDetails.mobileNumber,
    mail: traineeDetails.mail
})
const status=useSelector((state)=>state.trainee.status)
const message=useSelector((state)=>state.trainee.message)
    useEffect(()=>{
        if(status)
        navigate("/successMsg");
    },[status,message])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("trainee", trainee);
        dispatch(postingTraineeDetails(trainee));
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