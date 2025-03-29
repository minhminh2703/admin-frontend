import React, { useEffect } from "react";
import { Box, TextField, Button, Typography, Divider, Checkbox } from "@mui/material";
import { useTheme } from '@mui/material/styles';  
import GoogleLoginButton from '../auth/components/SocialLoginButton/GoogleLoginButton/auth-google-login-button'; 
import FacebookLoginButton from '../auth/components/SocialLoginButton/FacebookLoginButton/auth-facebook-login-button';  // Adjust path as needed
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useLocation } from 'react-router-dom';  // If using react-router for navigation

const Auth = () => {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();

    useEffect(() => {
        // Logic that runs on component mount (if needed)
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // API call logic here using axios
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Login
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Checkbox color="primary" />
                    <Typography variant="body2" color="textSecondary">
                        Remember Me
                    </Typography>
                </Box>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                    Login
                </Button>
            </form>
            <Box sx={{ marginTop: 2 }}>
                <GoogleLoginButton />
                <FacebookLoginButton />
            </Box>
        </Box>
    );
};

export default Auth;
