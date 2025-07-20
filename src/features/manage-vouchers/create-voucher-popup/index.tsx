import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import { CustomButton } from '../../../components/custom-button'
import { useTheme } from '../../../theme'
interface CreateVoucherPopupProps {
    open: boolean
    onClose: () => void
    onSubmit: (voucher: {
        code: string
        token: number
        max_usage: number
        expired_time: string
    }) => void
}

export const CreateVoucherPopup: React.FC<CreateVoucherPopupProps> = ({
    open,
    onClose,
    onSubmit,
}) => {
    const [code, setCode] = useState('')
    const [token, setToken] = useState(0)
    const [maxUsage, setMaxUsage] = useState(0)
    const [expiredTime, setExpiredTime] = useState<Dayjs | null>(dayjs())

    const theme = useTheme()

    const handleSubmit = () => {
        if (!code || !expiredTime) return
        onSubmit({
            code,
            token,
            max_usage: 5,
            expired_time: expiredTime.toISOString(),
        })
    }

    const dateTimePickerSx = {
        slotProps: {
            popper: {
                sx: {
                    '.MuiPaper-root': {
                        border: 'none',
                        borderRadius: 3,
                        p: 1,
                        backgroundColor: '#F7FFCD',
                    },
                    '& .MuiDialogActions-root .MuiButtonBase-root': {
                        fontFamily: 'Sora',
                        fontSize: '16px',
                        color: '#1E3E62',
                        fontWeight: 600,
                        '&:hover': {
                            backgroundColor: '#B7E0FF',
                        },
                        '&:focus, &:active': {
                            outline: 'none !important',
                            boxShadow: 'none !important',
                        },
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
                        },
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
    }

    const textFieldInputSx = {
        sx: {
            '& .MuiInputLabel-root': {
                color: '#FFFF',
                fontFamily: 'Poppins, Sora, sans-serif',
                fontSize: '0.8em',
                fontWeight: 500,
            },
            '& .MuiInputBase-input': {
                color: '#3F3F44',
                fontFamily: 'Poppins, Sora, sans-serif',
                fontSize: '0.9em',
                fontWeight: 500,
                textTransform: 'uppercase',
            },
            '& .MuiFormHelperText-root': {
                fontFamily: 'Poppins, Sora, sans-serif',
                fontSize: '0.7em',
                color: '#393E46',
                fontWeight: 400,
            },
            '& .MuiOutlinedInput-root': {
                color: '#FFFF',
                '& fieldset': {
                    borderColor: '#FFFF',
                },
                '&:hover fieldset': {
                    borderColor: '#CCEABB',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'primary',
                },
            },
        },
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiPaper-root': {
                    background: `linear-gradient(180deg, ${'#BDD1C5'} 0%, ${'#9EABA2'} 100%)`,
                    color: '#ffff',
                    borderRadius: 3,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
                    padding: 2,
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: '#213A58',
                    fontFamily: 'Poppins, Sora, sans-serif',
                    fontSize: '1.2em',
                    fontWeight: 550,
                }}
            >
                Create New Voucher
            </DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: 2,
                        }}
                    >
                        <Typography>
                            <span
                                style={{
                                    fontFamily: 'Poppins, Sora, sans-serif',
                                    fontSize: '0.8em',
                                    color: '#213A58',
                                    fontWeight: 400,
                                }}
                            >
                                Voucher Code
                            </span>
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: 2,
                                width: '100%',
                            }}
                        >
                            <ConfirmationNumberIcon
                                sx={{
                                    color: '#213A58',
                                    fontSize: '2em',
                                }}
                            />
                            <TextField
                                helperText="Your voucher code should be unique"
                                defaultValue="VOUCHER123"
                                fullWidth
                                variant="standard"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                {...textFieldInputSx}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: 4,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                width: '48%',
                            }}
                        >
                            <Typography>
                                <span
                                    style={{
                                        fontFamily: 'Poppins, Sora, sans-serif',
                                        fontSize: '0.8em',
                                        color: '#213A58',
                                        fontWeight: 400,
                                    }}
                                >
                                    Tokens
                                </span>
                            </Typography>
                            <TextField
                                type="number"
                                variant="standard"
                                fullWidth
                                value={token}
                                onChange={(e) =>
                                    setToken(parseInt(e.target.value))
                                }
                                {...textFieldInputSx}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                flexGrow: 1,
                            }}
                        >
                            <Typography>
                                <span
                                    style={{
                                        fontFamily: 'Poppins, Sora, sans-serif',
                                        fontSize: '0.8em',
                                        color: '#213A58',
                                        fontWeight: 400,
                                    }}
                                >
                                    Max Usage Tokens
                                </span>
                            </Typography>
                            <TextField
                                variant="standard"
                                type="number"
                                fullWidth
                                value={maxUsage}
                                onChange={(e) =>
                                    setMaxUsage(parseInt(e.target.value))
                                }
                                {...textFieldInputSx}
                            />
                        </Box>
                    </Box>

                    <Box>
                        <Typography>
                            <span
                                style={{
                                    fontFamily: 'Poppins, Sora, sans-serif',
                                    fontSize: '0.8em',
                                    color: '#213A58',
                                    fontWeight: 400,
                                    marginTop: 2,
                                }}
                            >
                                Expired Time
                            </span>
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                value={expiredTime}
                                onChange={(newValue) =>
                                    setExpiredTime(newValue)
                                }
                                localeText={{
                                    okButtonLabel: 'Confirm',
                                    cancelButtonLabel: 'Cancel',
                                }}
                                slotProps={{
                                    popper: dateTimePickerSx.slotProps.popper,
                                    textField: {
                                        variant: 'standard',
                                        InputLabelProps: { shrink: true },
                                        sx: {
                                            ...textFieldInputSx.sx,
                                            width: '48%',
                                            '& .MuiInputAdornment-root .MuiIconButton-root':
                                                {
                                                    outline: 'none !important',
                                                    boxShadow:
                                                        'none !important',
                                                    '&:focus, &:focusVisible, &:active':
                                                        {
                                                            outline:
                                                                'none !important',
                                                            boxShadow:
                                                                'none !important',
                                                        },
                                                },
                                        },
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    text="Cancel"
                    onClick={onClose}
                    sx={{
                        bgcolor: 'transparent',
                        border: 'none !important',
                        borderShadow: 'none',
                        color: '#213A58',
                        '&:hover': {
                            backgroundColor: '#B7E0FF',
                        },
                    }}
                />
                <CustomButton text="Create" onClick={handleSubmit} />
            </DialogActions>
        </Dialog>
    )
}
