import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useTheme } from '../../../theme';

interface CreateVoucherPopupProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (voucher: { code: string; token: number; max_usage: number; expired_time: string }) => void;
}

export const CreateVoucherPopup: React.FC<CreateVoucherPopupProps> = ({ open, onClose, onSubmit }) => {
    const [code, setCode] = useState('');
    const [token, setToken] = useState(0);
    const [maxUsage, setMaxUsage] = useState(0);
    const [expiredTime, setExpiredTime] = useState<Dayjs | null>(dayjs());

    const theme = useTheme();

    const handleSubmit = () => {
        if (!code || !expiredTime) return;
        onSubmit({
            code,
            token,
            max_usage: 5,
            expired_time: expiredTime.toISOString(),
        });
    };

    const dateTimePickerSx = {
        slotProps: {
            popper: {
                sx: {
                    '.MuiPaper-root': { border: 'none', borderRadius: 3 },
                    '& .MuiDialogActions-root .MuiButtonBase-root': {
                        fontFamily: 'Sora',
                        fontSize: '16px',
                        color: '#1E3E62',
                        fontWeight: 700,
                        '&:hover': {
                            backgroundColor: '#B7E0FF',
                        },
                        '&:focus, &:active': {
                            outline: 'none !important',
                            boxShadow: 'none !important',  
                        }
                    },
                    '& .MuiDateCalendar-root': {
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        color: 'black',
                    },
                    '& .MuiPickersFadeTransitionGroup-root': {
                        fontFamily: 'Poppins',
                        fontSize: '1em',
                        color: 'black',
                    },
                    '& .MuiMultiSectionDigitalClock-root': {
                        '& .MuiButtonBase-root': {
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                        },
                    },
                    '& .MuiPickersCalendarHeader-switchViewButton': {
                        border: 'none !important',
                        boxShadow: 'none !important',
                        '&:focus, &:active': {
                            outline: 'none !important',
                            boxShadow: 'none !important',
                        },
                    },
                    '& .MuiPickersYear-yearButton': {
                        fontFamily: 'Poppins',
                        fontSize: '0.9em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        '&:focus, &:active': {
                            outline: 'none !important',
                            boxShadow: 'none !important',
                        },
                        '&:hover': {
                            backgroundColor: '#B7E0FF',
                        }
                    },
                    '& .MuiPickersArrowSwitcher-button': {
                        '&:focus, &:active': {
                            outline: 'none !important',
                            boxShadow: 'none !important',
                        },
                    },
                    '& .MuiDayCalendar-header .MuiTypography-root': {
                        fontFamily: 'Poppins',
                        fontSize: '0.8em',
                        fontWeight: 500,
                    },

                    '& .MuiPickersDay-root': {
                        fontFamily: 'Poppins',
                        fontSize: '0.8em',
                        '&:focus, &:active': {
                            outline: 'none !important',
                        },
                        '&:hover': {
                            backgroundColor: '#B7E0FF',
                        },
                    },
                    '& .MuiPickersDay-hiddenDaySpacingFiller': {
                        fontFamily: 'Poppins',
                    },
                    '& .MuiPickersTimeListItemButton-root.Mui-selected': {
                        borderRadius: 3,
                    },
                    '& .MuiMultiSectionDigitalClock-root .Mui-selected': {
                        borderRadius: 3,
                    },
                },
            },
            textField: {
                fullWidth: true,
                sx: {
                    '& .MuiInputLabel-root': {
                        color: theme.fontColor.yellow,
                    },
                    '& fieldset': {
                        borderColor: theme.fontColor.white,
                    },
                    '& .MuiIconButton-root': {
                        color: theme.fontColor.white,
                    },
                },
                InputProps: {
                    disableUnderline: true,
                    sx: {
                        color: '#FFF',
                    },
                },
            },
        },
        PopperProps: {
            sx: { '&.MuiPickersPopper-root': { border: '4px solid red' } },
        },
    };



    const textFieldInputSx = {
        sx: {
            '& .MuiInputLabel-root': {
                color: '#FFFF',
            },
            '& .MuiOutlinedInput-root': {
                color: '#FFFF',
                '& fieldset': {
                    borderColor: '#FFFF',
                },
                '&:hover fieldset': {
                    borderColor: '#0041C2',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'primary',
                },
            },
        },
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiPaper-root': {
                    background: `linear-gradient(180deg, ${theme.background.dark} 0%, ${theme.background.lightDark} 100%)`,
                    color: '#ffff',
                },
            }}
        >
            <DialogTitle sx={{ color: '#ffff' }}>Create New Voucher</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Code"
                        fullWidth
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        {...textFieldInputSx}
                    />
                    <TextField
                        label="Token"
                        type="number"
                        fullWidth
                        value={token}
                        onChange={(e) => setToken(parseInt(e.target.value))}
                        {...textFieldInputSx}
                    />
                    <TextField
                        label="Max usage"
                        type="number"
                        fullWidth
                        value={maxUsage}
                        onChange={(e) => setMaxUsage(parseInt(e.target.value))}
                        {...textFieldInputSx}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Expired Time"
                            value={expiredTime}
                            onChange={(newValue) => setExpiredTime(newValue)}
                            {...dateTimePickerSx}
                            localeText={
                                {
                                    okButtonLabel: 'Confirm',
                                }
                            }
                        />
                    </LocalizationProvider>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
