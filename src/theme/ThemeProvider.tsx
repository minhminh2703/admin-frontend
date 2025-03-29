import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the custom theme

// Create the theme context
const ThemeContext = createContext(theme);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(theme);

    return (
        <ThemeContext.Provider value={currentTheme}>
            <MuiThemeProvider theme={currentTheme}>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

// Custom hook to access the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
