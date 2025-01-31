import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, CardHeader, TextField, Button } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy check for username and password
    console.log("username",username);
    console.log("password",password)

    if (username === 'admin' && password === 'password') {
      navigate('/trainee');
    } else {
      alert('Invalid credentials');
    }
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
