import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import img from '../assets/background.jpg';
import { useTheme } from '../theme';

interface LayoutProps {
    children: ReactNode;
}

const LoginSignup: React.FC<LayoutProps> = ({ children }) => {
    const theme = useTheme();
    
    return (
        <Box sx={{ 
            display: "flex", 
            flexDirection: "row", 
            minHeight: '100vh',
            background: theme.background.white }}>
            {/* Left Side - Form */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 4 }}>
                <Box sx={{ maxWidth: 500, margin: "auto" }}>
                    {children}
                </Box>
            </Box>

            {/* Right Side - Image */}
            <Box
                sx={{
                    flex: 1, 
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderTopLeftRadius: '5%',  
                    borderBottomLeftRadius: '5%',
                    overflow: "hidden",
                    minHeight: '100vh'
                }}
            />
        </Box>
    );
};

export default LoginSignup;
