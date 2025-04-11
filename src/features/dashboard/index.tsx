import React from 'react';
import { Box, Typography } from '@mui/material';
import StatCard from './stat-card';
import DateRangePicker from '../../components/date-range-picker';

const Dashboard = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Box display="flex" gap={2} mb={4}>
                <DateRangePicker />
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap">
                <StatCard
                    icon={<span>Icon 1</span>}
                    title="Total Users"
                    value="1,234"
                    percentage="+5%"
                    description="from last month"
                    isPositive={true}
                />
                <StatCard
                    icon={<span>Icon 2</span>}
                    title="Active Users"
                    value="567"
                    percentage="-2%"
                    description="from last month"
                    isPositive={false}
                />
                <StatCard
                    icon={<span>Icon 3</span>}
                    title="New Signups"
                    value="89"
                    percentage="+10%"
                    description="from last month"
                    isPositive={true}
                />
            </Box>
        </Box>
    );
}

export default Dashboard;