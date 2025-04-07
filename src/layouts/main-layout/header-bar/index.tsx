import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, TextField, IconButton, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "../../../theme";
import { useAuth } from "../../../context/auth-context"
import LogoutIcon from '@mui/icons-material/Logout';
import { getUser } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";

const HeaderBar: React.FC<{ sx?: any }> = ({ sx }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState('avatar.jpg');
    const [userData, setUserData] = useState({
        firstName: 'Minh Minh',
        lastName: 'Nguyen'
    })
    const [fullName, setFullName] = useState("Nguyen Minh Minh");
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) {
                setIsLoading(false);
                return;
            }
            try {
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
                        'Authorization': `Bearer ${token}`, 
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
                ...sx,
                boxShadow: 'none',
            }}
            position="sticky"

        >
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                {/* Left (empty spacer) */}
                <Box sx={{ flex: 1, maxWidth: '17em' }} />

                {/* Search Section */}
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        sx={{
                            backgroundColor: theme.background.dark,
                            borderRadius: "100%",
                            borderWidth: 1,
                            width: "100%", // Full width of the container
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: theme.background.dark,
                                borderRadius: "10px",
                                height: "90%",
                                paddingLeft: 1.5,
                                paddingRight: 3.5,
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white",
                                },
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "white",
                            },
                            height: "50px",
                        }}
                        slotProps={{
                            input: {
                                style: { color: "white", fontFamily: theme.typography.body2.fontFamily, fontSize: '0.9em' },
                                endAdornment: (
                                    <IconButton edge="end" aria-label="search">
                                        <Search sx={{ color: "white" }} />
                                    </IconButton>
                                ),
                            },
                            inputLabel: {
                                style: { color: "white", fontFamily: theme.typography.body2.fontFamily, fontSize: '0.9em' },
                            }
                        }}
                    />
                </Box>

                {/* Logout and Profile Section */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    maxWidth: '20em',
                    gap: 2,
                }}>
                    {/* Profile Section */}
                    <Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 2,
                            marginLeft: '1rem',
                            alignItems: 'center',
                            borderRadius: '0.4rem',
                        }}>
                            <Box>
                                <Typography variant="body2" sx={{
                                    color: "white",
                                    fontFamily: theme.typography.body1,
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    {`${userData?.firstName} ${userData?.lastName}`}
                                </Typography>
                            </Box>
                            <Avatar src={avatarUrl} alt={fullName} sx={{ width: '2.8rem', height: '2.5rem' }} />
                        </Box>
                    </Box>
                    <IconButton
                        onClick={() => {
                            localStorage.removeItem('authToken');
                            navigate("/auth");
                        }}
                        sx={{
                            color: "white",
                            marginRight: "1rem",
                            gap: 1,
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;
