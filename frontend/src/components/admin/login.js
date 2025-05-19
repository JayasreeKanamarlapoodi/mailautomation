import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardHeader, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { LoginVerification } from '../../redux/admin/adminAction';

const LoginForm = () => {
  const dispatch=useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const status=useSelector((state)=>state.admin.status);
  const message=useSelector((state)=>state.admin.message);
  const token=useSelector((state)=>state.admin.token);
  useEffect(()=>{
    if(status)
    {
      console.log("message",status, message);
      console.log("token in login",token);
      navigate('/home')
    }
    else
    {
      console.log("message",status, message);
    }
  },[status,message])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginVerification({username,password}))
  };

  return (
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
              title="Admin Login"
              titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
              sx={{ textAlign: "center", backgroundColor: "#007BFF", color: "white", py: 2 }}
            />
            <CardContent>
              <form>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    required
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
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
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      );
    };

export default LoginForm;
