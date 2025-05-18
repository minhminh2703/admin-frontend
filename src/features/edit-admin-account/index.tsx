import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, Button, Avatar, Grid, FormControl, MenuItem, Select } from "@mui/material";
import { useTheme } from "../../theme";
import { getPresignedImageURL, getUser, getUserAvatar, updateAvatar, updateUser } from "../../api/user.api";
import SuccessPopup from "../manage-accounts/components/success-popup/index";
import { LabeledInput } from "../manage-accounts/components/edit-account/labeled-input/index";
import { useNavigate, useParams } from "react-router-dom";
import LabeledFormControl from "../manage-accounts/components/edit-account/labeled-form-control/index";
import axios from "axios";

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

const s3ApiClient = axios.create({
    // No base URL, timeouts, or headers needed here
});

const uploadImageToS3 = async (uploadUrl: string, file: File) => {
    try {
        console.log(uploadUrl);
        console.log(file.type);
        const response = await s3ApiClient.put(uploadUrl, file, {
            headers: {
                'Content-Type': file.type  // As needed, based on your server's presigned URL expectations
            }
        });
        return response;
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
}

const uploadAvatar = async (file: File) => {
    try {
        const responseGeneratePresignedImageUpload = await getPresignedImageURL(file.name, file.type);
        if (responseGeneratePresignedImageUpload.status === 200) {
            console.log('Generate presigned url for image successfully:', responseGeneratePresignedImageUpload.data);
            const avatarUploadUrl = responseGeneratePresignedImageUpload.data.upload_url.split('?X-Amz-Algorithm')[0].replace('video_frames', 'avatars');
            console.log('Avatar upload URL:', avatarUploadUrl);

            const s3UploadImageResponse = await uploadImageToS3(avatarUploadUrl, file);
            if (s3UploadImageResponse.status === 200) {
                console.log('Avatar uploaded to S3 successfully');
            } else {
                console.error('Failed to upload avatar to S3:', s3UploadImageResponse);
            }
        } else {
            console.log('Failed to generate presigned image');
            console.log(responseGeneratePresignedImageUpload);
        }

    } catch (e) {
        console.error('Error uploading file: ' + e)
    }
}

const EditAdminAccount: React.FC<EditAccountProps> = ({ userId, onBack}) => {
    const [userData, setUserData] = useState<UserDetails | null>(null);;
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Manage snackbar state
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState<string>("image.png");

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();

            // Read the file as a data URL to display as an image
            reader.onload = () => {
                if (reader.result) {
                    setAvatar(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current !== null) {
            fileInputRef.current.click();
        }
    };

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
                    // const response = await getUserAvatar(userData.id);
                    // const avatarUrl = response.replace(/\/\//g, '/');
                    // console.log('AVATAR RESPONSE: ', response);
                    const avatarUrl = userData.avatarSrc.split('?X-Amz-Algorithm')[0];
                    console.log('AVATAR SRC: ', avatarUrl);
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
            const file = fileInputRef.current?.files?.[0];
            console.log('File Name: ', file?.name);
            if (file) {
                await uploadAvatar(file);
                const updateAvatarDb = await updateAvatar(String(userId), file.name);
                console.log('Update avatar in DB response: ', updateAvatarDb);
            }
            
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
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                            <Button 
                                variant="outlined" 
                                size="small" 
                                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
                                onClick={handleClick}
                            >
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

const EditAdminAccountWrapper = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  if (!userId) return <div>Missing userId</div>;

  return <EditAdminAccount userId={+userId} onBack={() => navigate(-1)} />;
};

export default EditAdminAccountWrapper;
