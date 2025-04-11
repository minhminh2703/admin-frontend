import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, TextField, IconButton, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "../../../theme";
import { useAuth } from "../../../context/auth-context";
import LogoutIcon from '@mui/icons-material/Logout';
import { getUser, getUserAvatar } from "../../../api/user.api";
import { useNavigate } from "react-router-dom";

const HeaderBar: React.FC<{ sx?: any }> = ({ sx }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { userId, logout } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState('');
    const [userData, setUserData] = useState({ firstName: '', lastName: '' });

    const handleLogout = () => {
        logout();
        navigate("/auth");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const userData = await getUser(userId);
                setUserData({
                    firstName: userData.user.first_name,
                    lastName: userData.user.last_name,
                });

                const avatarUrl = await getUserAvatar(userId);
                setAvatarUrl(avatarUrl);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <AppBar sx={{ ...sx, boxShadow: 'none' }} position="sticky">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box sx={{ flex: 1, maxWidth: '17em' }} />

                <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        sx={{
                            backgroundColor: theme.background.dark,
                            borderRadius: "100%",
                            borderWidth: 1,
                            width: "100%",
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

                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", maxWidth: '20em', gap: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginLeft: '1rem', alignItems: 'center', borderRadius: '0.4rem' }}>
                        <Typography variant="body2" sx={{ color: "white", fontFamily: theme.typography.body1, fontWeight: '600', fontSize: '0.95rem' }}>
                            {`${userData.firstName} ${userData.lastName}`}
                        </Typography>
                        <Avatar src={avatarUrl} alt={`${userData.firstName} ${userData.lastName}`} sx={{ width: '2.8rem', height: '2.5rem' }} />
                    </Box>
                    <IconButton onClick={handleLogout} sx={{ color: "white", marginRight: "1rem", gap: 1 }}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;