import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../../theme';  // Assuming custom theme
import Sidebar from './side-bar';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/index';

const MainLayout: React.FC = () => {
    const theme = useTheme(); // Access the custom theme

    return (
        <Box sx={{ 
            display: 'flex', 
            height: '100%', 
            background: `linear-gradient(180deg, ${theme.background.dark} 0%, ${theme.background.lightDark} 100%)`,
            backgroundBlendMode: 'multiply',
        }}>
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main content area */}
            <Box sx={{ flexGrow: 1 }}>
                {/* Navbar */}
                <Navbar
                    sx={{
                        background: theme.background.dark,
                        backgroundBlendMode: 'multiply',
                    }}
                />

                {/* Main content (children) */}
                <Box sx={{ padding: '20px' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
