import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, TextField, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "../../../theme";
import { useAuth } from "../../../context/auth-context"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { getUser } from "../../../api/user.api";

const Navbar: React.FC<{ sx?: any }> = ({ sx }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [langAnchorEl, setLangAnchorEl] = useState<null | HTMLElement>(null);
    const [language, setLanguage] = useState("EN");
    const [avatarUrl, setAvatarUrl] = useState("avatar.png");
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
    });
    const [fullName, setFullName] = useState("");
    const [isLoading, setIsLoading] = useState(true); 
    const { userId } = useAuth();

    // For handling dropdown menu (user profile menu)
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

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }
            try {
                // Retrieve user_id from local storage
                // const userId = localStorage.getItem('user_id');
                const token = localStorage.getItem('authToken');

                try {
                    const userData = await getUser(userId);
                    setUserData({
                        firstName: userData.user.first_name,
                        lastName: userData.user.last_name,
                    });
                    setFullName(`${userData.user.first_name.charAt(0)}${userData.user.last_name.charAt(0)}`);
                } catch (error) {
                    throw new Error(`Failed to fetch user data: ${error}`);
                }

                const avatarResponse = await fetch(`http://localhost:8080/api/users/${userId}/avatar-download-url`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add token to the Authorization header
                        'Content-Type': 'application/json'
                    }
                });

                const avatarData = await avatarResponse.json();
                const avatarDownloadUrl = avatarData.avatar_download_url;
                setAvatarUrl(avatarDownloadUrl.split('?X-Amz-Algorithm')[0]);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [userId]);

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
                {/* Left (empty spacer) */}
                <Box sx={{ flex: 1 }} />

                {/* Search Section */}
                <Box sx={{ 
                    flex: 1, 
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
                            width: "100%",
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
                <Box sx={{ 
                    flex: 1,
                    display: "flex", 
                    justifyContent: "flex-end", 
                    alignItems: "center" 
                }}>
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

                    {/* Profile Section */}
                    <Box>
                        {!isLoading && (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 3,
                                marginLeft: '1rem',
                                alignItems: 'center',
                                borderRadius: '0.4rem',
                            }}>
                                <Box>
                                    <Typography variant="body2" sx={{
                                        color: "white",
                                        fontFamily: theme.typography.body1,
                                        fontWeight: 'bold',
                                        fontSize: '0.95rem'
                                    }}>
                                        {`${userData?.firstName} ${userData?.lastName}`}
                                    </Typography>
                                </Box>
                                <Avatar src={avatarUrl} alt={fullName} sx={{ width: '2.8rem', height: '2.5rem' }} />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
