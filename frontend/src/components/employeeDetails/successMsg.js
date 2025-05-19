import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";


const SuccessMsg = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex', // Toggle display
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    backgroundColor: '#f4f4f4',
                }}
            >
                <Card sx={{ width: 400, boxShadow: 3, borderRadius: 2 }}>
                    <CardHeader
                        title="Success"
                        titleTypographyProps={{ variant: 'h5', fontWeight: 'bold' }}
                        sx={{ textAlign: 'center', backgroundColor: '#007BFF', color: 'white', py: 2 }}
                    />
                    <CardContent>
                        <p style={{ textAlign: 'center', color: '#155724', fontSize: '16px' }}>
                            Trainee registration successful!
                        </p>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#007BFF',
                                '&:hover': { backgroundColor: '#0056b3' },
                            }}
                            onClick={() => navigate('/full-details')}
                        >
                            View Details
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}
export default SuccessMsg;