// Parent.tsx
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { CalendarPicker } from '../../../components/calendar-pickers'; // Your existing code
import PeriodSelector from '../../../components/period-selector'; // Your existing code

export default function Parent() {
  const [filter, setFilter] = useState<'By Day' | 'By Week' | 'By Year'>('By Day');

  const handleFilterSelect = (selectedFilter: string) => {
    setFilter(selectedFilter as 'By Day' | 'By Week' | 'By Year');
  };

  return (
    <Box p={2}>
      <PeriodSelector onFilterSelect={handleFilterSelect} />
      <CalendarPicker filter={filter} />
    </Box>
  );
}
