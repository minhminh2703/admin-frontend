import React from 'react';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { startOfWeek, endOfWeek } from 'date-fns';

interface CustomPickersDayProps extends PickersDayProps<Date> {
  selectedDate: Date | null;
}

const CustomPickersDay: React.FC<CustomPickersDayProps> = (props) => {
  const { day, selectedDate, ...other } = props;

  let isWithinSelectedWeek = false;
  if (selectedDate) {
    const start = startOfWeek(selectedDate, { weekStartsOn: 0 }); // Sunday
    const end = endOfWeek(selectedDate, { weekStartsOn: 0 });     // Saturday
    isWithinSelectedWeek = day >= start && day <= end;
  }

  return (
    <PickersDay
      {...other}
      day={day}
      sx={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.9em',
        fontWeight: isWithinSelectedWeek ? 600 : 400,
        margin: 0,
        padding: 0,
        minWidth: '36px',
        width: '36px',
        height: '36px',
        ...(isWithinSelectedWeek
          ? {
            borderRadius: 0,
            backgroundColor: 'rgba(42, 54, 99, 0.5)',
            color: '#FFD63A',
            '&:hover, &:focus': {
              backgroundColor: 'rgba(42, 54, 99, 0.7)',
            },
            '&:not(:last-of-type)': {
              borderRight: 'none',
            },
            '&:first-of-type': {
              borderTopLeftRadius: '50%',
              borderBottomLeftRadius: '50%',
            },
            '&:last-of-type': {
              borderTopRightRadius: '50%',
              borderBottomRightRadius: '50%',
              borderRight: '1px solid rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(42, 54, 99, 0.5)',
              color: '#FFD63A',
            },
          }
          : {}),
      }}
    />
  );
};

export default CustomPickersDay;