import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button, Avatar, FormControl, MenuItem, Select } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTheme } from "../../../../theme";
import { getUser, getUserAvatar, updateUser } from "../../../../api/user.api";
import SuccessPopup from "../success-popup/index";
import { LabeledInput } from "./labeled-input";
import LabeledFormControl from "./labled-form-control";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import dayjs from "dayjs";

interface UserDetails {
    id: string,
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    status: string,
    createdDate: string;
    userRole: string;
    premium: boolean;
    avatarSrc: string;
}

interface EditAccountProps {
    userId: number;
    onBack: () => void;
}

const EditAccount: React.FC<EditAccountProps> = ({ userId, onBack }) => {
    const [userData, setUserData] = useState<UserDetails | null>(null);;
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Manage snackbar state
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const [avatar, setAvatar] = useState<string>("image.png");


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser(String(userId));
                console.log('RESPONSE: ', response);
                setUserData({
                    id: String(response.user.id),
                    firstName: response.user.first_name,
                    lastName: response.user.last_name,
                    username: response.user.username,
                    email: response.user.email,
                    status: response.user.status,
                    createdDate: response.user.created_at,
                    userRole: response.user.role.toUpperCase(),
                    premium: response.user.premium,
                    avatarSrc: response.user.avatar || '',
                });
                setLoading(false);
            } catch (error) {
                console.error("Error loading user:", error);
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (userData?.id) {
                    const response = await getUserAvatar(userData.id);
                    const avatarUrl = response.replace(/\/\//g, '/');
                    console.log('AVATAR RESPONSE: ', avatarUrl);
                    setAvatar(avatarUrl);
                }
            } catch (error) {
                console.error("Error loading user avatar:", error);
            }
        };

        fetchUser();
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => {
            if (!prev) return prev; // prevent update if null
            return { ...prev, [name]: value };
        });
    };

    const handleSave = async () => {
        if (!userId || !userData) {
            console.error("User ID is null. Cannot update user data.");
            return;
        }

        try {
            const updatedData = {
                status: userData.status,
                premium: false,
                role: userData.userRole
            }
            await updateUser(String(userId), updatedData);
            setShowSuccessPopup(true);

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error('Failed to update user data:', error);
        }
    };

    if (loading || !userData) return <Box>Loading...</Box>;

    return (
        <>
            <Box >
                <Typography
                    onClick={onBack}
                    sx={{
                        color: theme.fontColor.greyWhite,
                        fontFamily: 'Sora, Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: '1rem',
                        mb: 2,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                            color: '#B6FFA1',
                        },
                    }}
                >
                    <KeyboardBackspaceIcon sx={{ fontSize: '2em', marginRight: '0.5rem', cursor: 'pointer' }} />
                    Back to Account List
                </Typography>
                <Typography sx={{
                    fontFamily: theme.typography.body2.fontFamily,
                    fontSize: '1.5em',
                    fontWeight: '600',
                    color: '#B6FFA1',
                    textAlign: 'left',
                    mb: '1em',
                }}>
                    Account Details
                </Typography>

                <Grid container spacing={3} sx={{ mt: 5 }}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Avatar
                                src={avatar || 'image.png'}
                                alt="Avatar"
                                sx={{ width: 150, height: 150, mb: 2 }}
                            />
                        </Box>
                    </Grid>

                    {/* Form */}
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LabeledInput
                                    label="First name"
                                    name="firstName"
                                    value={userData.firstName}
                                    readOnly
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LabeledInput
                                    label="Last name"
                                    name="lastName"
                                    value={userData.lastName}
                                    readOnly
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <LabeledInput
                                    label="Email"
                                    name="email"
                                    value={userData.email}
                                    readOnly
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LabeledInput
                                    label="Username"
                                    name="username"
                                    value={userData.username}
                                    readOnly
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LabeledInput
                                    label="Created date"
                                    name="createdDate"
                                    value={dayjs(userData.createdDate).format('DD MMM YYYY HH:mm')}
                                    readOnly
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LabeledInput
                                    label="Premium"
                                    name="premiumExpiredDate"
                                    value={userData.premium ? 'Yes' : 'No'}
                                    readOnly
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LabeledFormControl
                                    label="User role"
                                    name="userRole"
                                    value={userData.userRole}
                                    onChange={(e) =>
                                        handleChange({
                                            target: { name: 'userRole', value: e.target.value },
                                        } as any)
                                    }
                                    options={['ADMIN', 'USER', 'MANAGER']}
                                />
                            </Grid>

                            {/* Uncomment if you still need status ------------------- */}
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LabeledFormControl
                                    label="User status"
                                    name="userStatus"
                                    value={userData.status.toUpperCase()}
                                    onChange={(e) =>
                                        handleChange({
                                            target: { name: 'status', value: e.target.value },
                                        } as any)
                                    }
                                    options={['ACTIVE', 'DELETED', 'SUSPENDED']}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



                {/* Save Button */}
                <Box
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            marginLeft: "auto",
                            marginTop: "20px",
                            boxShadow: "none",
                            fontFamily: 'Poppins, sans-serif',
                            bgcolor: '#B6FFA1',
                            color: '#000',
                            fontSize: '1em',
                        }}
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Box>
            <SuccessPopup
                open={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                message="User details updated successfully!"
            />
        </>
    );
};

export default EditAccount;
