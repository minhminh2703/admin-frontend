import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../../../theme';

interface StatCardProps {
    icon: React.ReactElement;
    title: string;
    value: string | number;
    percentage?: string;
    description?: string;
    isPositive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ( { icon, title, value, percentage, description, isPositive }) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: '#2c3e50',
                borderRadius: '10px',
                padding: '1em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '250px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                {icon}
                <Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#e0e0e0', fontWeight: 'bold' }}>
                        {value}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: isPositive ? theme.status.complete.fontColor : theme.status.failed.fontColor,
                            fontWeight: 'bold',
                        }}
                    >
                        {percentage} {description}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default StatCard;