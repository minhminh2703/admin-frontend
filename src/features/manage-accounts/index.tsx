import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { useTheme } from '../../theme';  // Assuming custom theme is applied
import { User } from '../../types/User';
import { useAuth } from '../../context/auth-context';
import ManageAccountsTable from './components/manage-accounts-table';

const ManageAccount = () => {
    const theme = useTheme(); 
    const [user, setUser] = useState<User | null>(null);    
    const { userId } = useAuth();

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
            <ManageAccountsTable />
        </Box>
    );
};

export default ManageAccount;
