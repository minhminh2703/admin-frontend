import React, { useState } from "react";
import { Box, AppBar, Toolbar, Typography, TextField, IconButton, Menu, MenuItem, Button, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "../../../theme";
import { useAuth } from "../../../context/auth-context"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

const Navbar: React.FC<{ sx?: any }> = ({ sx }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
    const [language, setLanguage] = useState("EN");
    const { userId } = useAuth();

    // For handling dropdown menu (user profile menu)
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLangMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setLangAnchorEl(event.currentTarget);
    };
    
    const handleLangMenuClose = () => {
        setLangAnchorEl(null);
    };
    
    const handleLangChange = (lang: string) => {
        setLanguage(lang);
        setLangAnchorEl(null);
    };

    return (
        <AppBar 
            sx={{
                ...sx, // Apply the passed background style (gradient)
                boxShadow: 'none', // Remove shadow for smooth transition with layout background
            }}
            position="sticky" 
        >
            <Toolbar sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center" 
            }}>
                {/* Search Section */}
                <Box sx={{ 
                    flexGrow: 1, 
                    display: "flex", 
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        sx={{ 
                            backgroundColor: theme.background.dark, 
                            borderRadius: "100%",
                            borderColor: "white", // White border
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: theme.background.dark, // Matching the navbar background color
                                borderColor: "white",  
                                borderRadius: "10px",
                                height: "90%",
                                paddingLeft: 1.5,
                                paddingRight: 3.5
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white", 
                                addingLeft: 1.5,
                                paddingRight: 1.5
                            },
                            width: "50%",
                            height: "50px"
                        }}
                        InputProps={{
                            style: { color: "white" },
                            endAdornment: (
                                <IconButton edge="end" aria-label="search">
                                    <Search sx={{ color: "white" }} />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>

                {/* Language and Profile Section */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={handleLangMenuOpen} sx={{ ml: 1 }}>
                        <img
                            src={language === "EN" ? "https://flagcdn.com/gb.svg" : "https://flagcdn.com/vn.svg"}
                            alt={language}
                            style={{
                                width: "24px",
                                height: "24px",
                                objectFit: "cover", // ensure the image fills the circle
                                borderRadius: "50%", // perfect circle
                            }}
                        />
                    </IconButton>
                    <Menu
                        anchorEl={langAnchorEl}
                        open={Boolean(langAnchorEl)}
                        onClose={handleLangMenuClose}
                    >
                        <MenuItem onClick={() => handleLangChange("EN")}>
                            <img src="https://flagcdn.com/gb.svg" alt="EN" width={20} style={{ marginRight: 8 }} />
                            English
                        </MenuItem>
                        <MenuItem onClick={() => handleLangChange("VI")}>
                            <img src="https://flagcdn.com/vn.svg" alt="VI" width={20} style={{ marginRight: 8 }} />
                            Vietnamese
                        </MenuItem>
                    </Menu>

                    <IconButton sx={{ ml: 2 }}>
                        <NotificationsNoneIcon sx={{ color: "white" }} />
                    </IconButton>

                    {/* User Profile Menu */}
                    <IconButton
                        edge="end"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                        sx={{ marginLeft: "10px" }}
                    >
                        <Avatar />
                    </IconButton>

                    {/* Menu for profile options */}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                        anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                        }}
                        transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                        }}
                    >
                        <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
