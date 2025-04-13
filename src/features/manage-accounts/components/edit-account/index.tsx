import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button, Avatar, Grid, FormControl, MenuItem, Select } from "@mui/material";
import { useTheme } from "../../../../theme";
import { getUser, getUserAvatar, updateUser } from "../../../../api/user.api";
import SuccessPopup from "../success-popup/index";
import LabeledInput from "./labled-input";
import { useNavigate } from "react-router-dom";
import LabeledFormControl from "./labled-formcontrol";

interface UserDetails {
    id: string,
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    status: string,
    createdDate: string;
    userRole: string;
    premiumExpiredDate: string;
    avatarSrc: string;
}

interface EditAccountProps {
    userId: number;
    onBack: () => void;
}

const EditAccount: React.FC<EditAccountProps> = ({ userId, onBack}) => {
    const [userData, setUserData] = useState<UserDetails | null>(null);;
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Manage snackbar state
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const [avatar, setAvatar] = useState<string>("image.png");
    const navigate = useNavigate();


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
                    premiumExpiredDate: '',
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
        console.log('UPDATING USER');
        if (!userId || !userData) {
            console.error("User ID is null. Cannot update user data.");
            return;
        }

        try {
            const updatedData = {
                first_name: userData.firstName,
                last_name: userData.lastName,
                username: userData.username,
                email: userData.email,
                status: userData.status,
                premium: false,
                role: userData.userRole
            }

            const updatedDataResponse = await updateUser(String(userId), updatedData);
            console.log(updatedDataResponse);
            
            // if (fileInputRef.current?.files && fileInputRef.current.files[0]) {
            //     const file = fileInputRef.current.files[0];
            //     console.log("Uploading avatar...");
            //     await uploadAvatar(file);
            //     console.log("Avatar uploaded successfully!");
            // }

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
                        fontWeight: 600, 
                        fontSize: '1rem', 
                        mb: 2, 
                        cursor: 'pointer' 
                    }}
                >
                    &lt;&lt; Back to Account List
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Account Details
                </Typography>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography sx={{ mb: 2 }}>Profile avatar</Typography>
                            <Avatar
                            src={avatar || "image.png"}
                            alt="Avatar"
                            sx={{ width: 80, height: 80, mb: 2 }}
                            />
                            <Button variant="outlined" size="small" sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                            Upload
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <LabeledInput
                                    label="First name"
                                    name="firstName"
                                    value={userData.firstName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LabeledInput
                                    label="Last name"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LabeledInput
                                    label="Username"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LabeledInput
                                    label="Email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LabeledInput
                                    label="Created date"
                                    name="createdDate"
                                    value={userData.createdDate}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LabeledFormControl
                                    label="User role"
                                    name="userRole"
                                    value={userData.userRole}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: "userRole",
                                                value: e.target.value,
                                            },
                                        } as any)
                                    }
                                    options={["ADMIN", "USER", "MANAGER"]}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LabeledFormControl
                                    label="User status"
                                    name="userStatus"
                                    value={userData.status.toUpperCase()}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: "status",
                                                value: e.target.value,
                                            },
                                        } as any)
                                    }
                                    options={["ACTIVE", "DELETED", "SUSPENDED"]}
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
                            borderRadius: "10px",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            padding: "0.6rem 2rem",
                            marginLeft: "auto",
                            marginTop: "20px",
                            boxShadow: "none"
                        }}
                        onClick={handleSave}
                    >
                        SAVE
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
