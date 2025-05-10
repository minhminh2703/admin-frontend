import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '../../../../theme';  

interface SuccessPopupProps {
    open: boolean;
    onClose: () => void;
    message: string;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ open, onClose, message }) => {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="success-popup-title"
            aria-describedby="success-popup-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2
            }}>
                <CheckCircleIcon sx={{
                    fontSize: 100,
                    color: theme.status.complete.fontColor,
                    alignSelf: 'center',
                }} />

                <Typography sx={{
                    fontFamily: theme.typography.fontFamily,
                    fontWeight: theme.typography.fontWeightBold,
                    fontSize: '1.5rem',
                    marginTop: 5,
                    color: theme.status.complete.fontColor,
                }}>
                    {message}
                </Typography>
            </Box>
        </Modal>
    );
};

export default SuccessPopup;
