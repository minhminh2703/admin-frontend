import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Dayjs } from 'dayjs';
import theme from '../theme/theme';


interface DateInputProps {
    label: string;
    value: Dayjs | null;
    onChange: (newValue: Dayjs | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (newValue: Dayjs | null) => {
        onChange(newValue);
        handleClose();
    };

    return (
        <DatePicker
            label={label}
            value={value}
            onChange={handleChange}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            slots={{
                textField: TextField,
                desktopPaper: Paper,
            }}
            slotProps={{
                textField: {
                    variant: 'filled',
                    sx: {
                        backgroundColor: '#2c3e50',
                        borderRadius: '10px',
                        '& .MuiOutlinedInput-root': {
                            fontFamily: theme.typography.body2.fontFamily,
                            fontSize: '0.9em',
                            fontWeight: '600',
                            color: 'white',
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                            fontFamily: theme.typography.body2.fontFamily,
                            fontSize: '0.9em',
                            fontWeight: '600',
                        },
                        '& .MuiFilledInput-root': {
                            backgroundColor: '#2c3e50',
                            borderRadius: '10px',
                            color: 'white',
                            fontFamily: theme.typography.body2.fontFamily,
                            '&:before': {
                                borderBottom: 'none',
                            },
                            '&:after': {
                                borderBottom: 'none',
                            },
                            '&:hover:not(.Mui-disabled):before': {
                                borderBottom: 'none',
                            },
                            '&:hover:not(.Mui-disabled):after': {
                                borderBottom: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#2c3e50',
                            },
                        },
                    },
                    InputProps: {
                        endAdornment: (
                            <IconButton onClick={handleOpen}>
                                <CalendarTodayIcon sx={{ color: 'white' }} />
                            </IconButton>
                        ),
                    },
                },

                desktopPaper: {
                    sx: {
                        background: 'linear-gradient(to right, #4b79a1, #283e51)',
                        color: 'white',
                        borderRadius: '10px',
                        padding: '0.5em',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        '& .MuiCalendarPicker-root': {
                            backgroundColor: 'linear-gradient(to right, #000428, #004e92)',
                        },
                        '& .MuiPickersDay-root': {
                            '&:hover': {
                                backgroundColor: '#2c3e50',
                            },
                            border: 'none',
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#2c3e50 !important',
                            '&:hover': {
                                backgroundColor: '#2c3e50',
                            },
                        },
                        '& .MuiTypography-root': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.9em',
                            fontWeight: '500',
                        },
                        '& .MuiButtonBase-root': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.9em',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                            border: 'none',
                        },
                        '& .MuiIconButton-root': {
                            fontSize: '1.5em',
                        },
                        '& .MuiPickersCalendarHeader-label': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                        },
                        '& .MuiDateCalendar-root': {
                            color: 'white',
                            fontFamily: 'Poppins, sans-serif',
                            '& .MuiPickersDay-root': {
                                color: 'white',
                            },
                            '& .MuiPickersYear-root': {
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Poppins, sans-serif',
                                '&.Mui-selected': {
                                    backgroundColor: 'none',

                                },
                            },
                        },
                        '& .MuiPickersYear-yearButton': {
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '0.9em',
                            fontWeight: '500',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }
                    },
                },
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 10],
                            },
                        },
                    ],
                    sx: {
                        zIndex: 1300,
                    }
                }
            }}
        />
    );
};

const DateRangePicker = () => {
    const [fromDate, setFromDate] = useState<Dayjs | null>(null);
    const [toDate, setToDate] = useState<Dayjs | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2}}>
                <DateInput label="From" value={fromDate} onChange={setFromDate} />
                <DateInput label="To" value={toDate} onChange={setToDate} />
            </Box>
        </LocalizationProvider>

    );
};

export default DateRangePicker;
