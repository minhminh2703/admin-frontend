import React, { useEffect } from "react";
import { Box, TextField, Button, Typography, Checkbox } from "@mui/material";
import LoginSignup from '../../layouts/authen-layout';
import { useTheme } from '../../theme';
import axios from 'axios';
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/auth-context'
import baseApi from "../../api/base.api";

const InputStyles = (theme: any) => ({
    sx: {
        '& input::placeholder': {
            fontSize: '0.9rem',
            color: theme.fontColor.gray,
        },
        borderRadius: 2,
    }
});


const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {

            navigate('/', { replace: true });
        }
    }, [navigate]);

    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();
    const { login } = useAuth();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const location = useLocation();

    useEffect(() => {

        if (location.state?.successMessage) {
            enqueueSnackbar(location.state.successMessage, { variant: 'success' });
        }
    }, [location.state, enqueueSnackbar]);

    const validateEmail = () => setEmailError(!email);
    const validatePassword = () => setPasswordError(!password);

    const handleLogin = async () => {
        setError('');
        let valid = true;

        if (!email) {
            setEmailError(true);
            valid = false;
        }

        if (!password) {
            setPasswordError(true);
            valid = false;
        }

        if (!valid) return;
        setLoading(true);

        try {
            const response = await baseApi.post('/users/login', {
                email: email,
                password: password
            });

            if (response.status === 200) {
                console.log(response.data);
                login(response.data.token, response.data.user_id);

                console.log(response.data.user_id);

                navigate('/manage_accounts');
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 400) {
                    setError("Validation error. Please check your inputs.");
                } else if (err.response?.status === 401) {
                    setError("Invalid credentials. Please try again.");
                } else {
                    setError("Failed to login. Please try again.");
                }
            } else {
                setError("Failed to login. Please check your connection.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LoginSignup>
            <Typography variant="h4" gutterBottom sx={{
                color: theme.fontColor.black,
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: 60,
                marginTop: 3,
            }}>
                Welcome back !
            </Typography>
            <Typography variant="body1" sx={{
                marginBottom: 3,
                color: theme.fontColor.black,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: 500,
                fontSize: 16,
            }}>
                Enter your Credentials to access your account
            </Typography>

            {/* Email Input */}
            <Typography sx={{
                fontFamily: theme.typography.body1.fontFamily,
                color: theme.fontColor.black,
                fontSize: 14,
                fontWeight: 600,
                marginTop: 2.5,
            }}>
                Email address
            </Typography>
            <TextField
                placeholder="Enter your email"
                type="email"
                fullWidth
                margin="normal"
                size="small"
                required
                slotProps={{
                    input: InputStyles(theme),
                    formHelperText: {
                        sx: {
                            fontFamily: theme.typography.body1.fontFamily,
                            fontColor: theme.status.failed.fontColor,
                            marginLeft: 0,
                            fontSize: 12,
                        },
                    }
                }}

                sx={{
                    marginTop: 0.6,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: theme.background.main
                        },
                    },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={emailError}
                helperText={emailError ? 'Email is required' : ''}

            />

            {/* Password Input */}
            <Typography sx={{
                fontFamily: theme.typography.body1.fontFamily,
                fontColor: theme.status.failed.fontColor,
                color: theme.fontColor.black,
                fontSize: 14,
                marginTop: 2,
                fontWeight: 600,
            }}>
                Password
            </Typography>
            <TextField
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                fullWidth
                margin="normal"
                size="small" // Use the small size for the input field
                required
                slotProps={{
                    input: InputStyles(theme),
                    formHelperText: {
                        sx: {
                            fontFamily: theme.typography.body1.fontFamily,
                            fontColor: theme.status.failed.fontColor,
                            marginLeft: 0,
                            fontSize: 12,
                        },
                    }
                }}
                sx={{
                    marginTop: 0.6,
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: theme.background.main
                        },
                    },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                error={passwordError}
                helperText={passwordError ? 'Password is required' : ''}

            />

            {/* Error Message */}
            {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                    {error}
                </Typography>
            )}

            {/* Remember Me and Forgot Password */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2, marginTop: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Checkbox id="rememberMe" size="small" sx={{
                        padding: 0,
                        '&.Mui-checked': {
                            color: theme.background.main,
                        }
                    }} checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                    <Typography
                        htmlFor="rememberMe"
                        component="label"
                        sx={{
                            marginLeft: 1,
                            fontSize: '0.8rem',
                            color: theme.fontColor.gray,
                            display: 'flex',
                            alignItems: 'center',

                        }}
                    >
                        Remember for 30 days
                    </Typography>

                </Box>
                <Typography variant="body2" sx={{
                    cursor: "pointer",
                    color: theme.status.inProgress.fontColor,
                    fontFamily: theme.typography.body1.fontFamily,
                    fontSize: '0.8rem',
                    '&:hover': {
                        textDecoration: 'underline',  // Underline on hover
                    },
                }}>
                    Forgot password?

                </Typography>
            </Box>

            {/* Login Button */}
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin} // Add onClick event
                sx={{
                    marginBottom: 2,
                    marginTop: 3.5,
                    borderRadius: 2.5,
                    backgroundColor: theme.background.main,
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: '1rem',
                    height: '2.5rem',
                    '&:hover': {
                        backgroundColor: theme.background.main,
                    },

                }}
                disabled={loading} // Disable button while loading
            >
                {loading ? 'Logging in...' : 'LOG IN'}
            </Button>
        </LoginSignup >
    );
};

export default Login;
function isTokenExpired(authToken: string) {
    throw new Error("Function not implemented.");
}

