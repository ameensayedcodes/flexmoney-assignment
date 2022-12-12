import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import FormHelperText from '@mui/material/FormHelperText';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.flexmoney.in/">
                FlexMoney
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const Enroll = ({ userId, username }) => {
    const [batch, setBatch] = useState('');
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();

    const handlePaidChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleChange = (event) => {
        setBatch(event.target.value);
    };

    const enroll = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_MIDDLEWARE_URL}/enroll`, {
            batchName: batch,
            id: userId,
            isPaid: checked
        });
        console.log("data", data);
        window.location.reload();
    }

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
                        backgroundImage: "url('/kike-vega-F2qh3yjz6Jk-unsplash.jpg')",
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
                        <Typography component="h1" variant="h4">
                            Enroll to Yoga Program 🧘
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Batch</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={batch}
                                    label="Batch"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="6-7AM">6-7AM</MenuItem>
                                    <MenuItem value="7-8AM">7-8AM</MenuItem>
                                    <MenuItem value="8-9AM">8-9AM</MenuItem>
                                    <MenuItem value="5-6PM">5-6PM</MenuItem>
                                </Select>
                                <FormHelperText>You cannot change this until the end of the month</FormHelperText>
                            </FormControl>
                            <FormControlLabel sx={{ mt: 3, mb: 2 }} control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handlePaidChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            } label="Want to pay right now? You can pay at any time till the end of the enrollment. The enrollment cost is Rs 500" />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 2 }}
                                onClick={() => {
                                    enroll()
                                }}
                            >
                                Enroll
                            </Button>
                            <Copyright sx={{ mt: 1 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default Enroll