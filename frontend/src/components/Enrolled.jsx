import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const theme = createTheme();

const Enrolled = ({ isPaid, userData }) => {
    const [daysLeft, setDaysLeft] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        var enrolledDate = new Date(userData.enrolled_at);
        var d = enrolledDate.getDate();
        enrolledDate.setMonth(enrolledDate.getMonth() + 1);
        if (enrolledDate.getDate() != d) {
            enrolledDate.setDate(0);
        }
        var prevEnrolledDate = new Date(userData.enrolled_at);
        var Difference_In_Time = enrolledDate.getTime() - prevEnrolledDate.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        setDaysLeft(Difference_In_Days);
        if (Difference_In_Days <= 0) {
            removeEnrollment()
        }
    }, [])

    const removeEnrollment = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_MIDDLEWARE_URL}/enroll/removeEnrollment`, {
            id: userData.id
        });
        window.location.reload()
    }

    const makePayment = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_MIDDLEWARE_URL}/enroll/paid`, {
            id: userData.id
        });
        window.location.reload()
    }

    if (isPaid) {
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url('/yoga-three.png')",
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{ mt: 3 }}>
                                <h3>You have enrolled and paid</h3>
                                <p>Batch {userData.batch_name}</p>
                                <p>Days left: {daysLeft}</p>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        )
    }
    else {
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url('/yoga-three.png')",
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box sx={{ mt: 3 }}>
                                <h3>You have enrolled but not paid yet</h3>
                                <p>Batch {userData.batch_name}</p>
                                <p>Days left: {daysLeft}</p>
                                <Button variant="contained" onClick={() => {
                                    makePayment()
                                }}>Pay</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        )
    }
}

export default Enrolled