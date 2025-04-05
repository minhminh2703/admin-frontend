import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useTheme } from '../../theme';  // Assuming custom theme is applied

const ManageAccount = () => {
    const theme = useTheme(); // Use custom theme to apply styles

    // State to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        // Handle form submission logic here (e.g., API call)
        console.log(formData);
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: theme.background.white }}>
            <Typography variant="h4" gutterBottom color={theme.fontColor.black}>
                Manage Your Account
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                        label="Full Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        label="Email Address"
                        variant="outlined"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ marginBottom: 2 }}
                        />
                    </Grid>
                </Grid>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                        marginTop: 2,
                        backgroundColor: theme.status.inProgress.backgroundColor,  // Use theme color for button
                        color: theme.status.inProgress.fontColor,  // Button text color from theme
                    }}
                >
                    Save Changes
                </Button>
            </form>
        </Box>
    );
};

export default ManageAccount;
