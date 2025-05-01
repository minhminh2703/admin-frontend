import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { CalendarPicker } from '../../../components/calendar-pickers';
import PeriodSelector from '../../../components/period-selector';
import { fetchTrafficReport } from '../../../api/web-traffic.api';
import { format } from 'date-fns/format';
import { transformTrafficData } from '../../../utils/transform-traffic';
import { D3LineChart } from './d3-line-chart';

const mapFilterToType = (filter: 'By Day' | 'By Week' | 'By Year'): 'day' | 'week' | 'year' => {
  switch (filter) {
    case 'By Day':
      return 'day';
    case 'By Week':
      return 'week';
    case 'By Year':
      return 'year';
    default:
      return 'day';
  }
};

export default function WebTraffic() {
  const [filter, setFilter] = useState<'By Day' | 'By Week' | 'By Year'>('By Day');
  const [currentDay, setCurrentDay] = useState<string>('');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);


  const handleFilterSelect = (selectedFilter: string) => {
    setFilter(selectedFilter as 'By Day' | 'By Week' | 'By Year');
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setCurrentDay(formattedDate);
    }
  };

  const handleFetchReport = async () => {
    if (!currentDay) return;
    setLoading(true);
    try {
      const data = await fetchTrafficReport({
        current_day: currentDay,
        type: mapFilterToType(filter),
      });
      setReportData(transformTrafficData(data));
    } catch (error) {
      console.error('Error fetching traffic report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentDay) {
      handleFetchReport();
    }
  }, [currentDay, filter]);

  return (
    <Box p={10} >
      <Typography variant="h4" gutterBottom>
        Web Traffic Report
      </Typography>
      <PeriodSelector onFilterSelect={handleFilterSelect} />
      <CalendarPicker filter={filter} onDateChange={handleDateChange} />
      {loading && <div>Loading...</div>}
      {reportData && (
        <div style={{ width: '100%', height: '500px' }}>
          <D3LineChart data={reportData} width={800} height={400} />
        </div>
      )}
    </Box>
  );
}

