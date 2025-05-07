import React, { useState, useMemo } from 'react';
import PieChart, { PieData } from './d3-pie-chart';
import { useStatsData, ApiResponse, StatsData } from '../../../hooks/use-stats-data';
import { Button, Box, Typography } from '@mui/material';
import { useTheme } from '../../../theme';
import StatusCard from './status-card';

interface AnalyticsReportProps {
    fetchReport: () => Promise<ApiResponse>;
    title: string;
}

const AnalyticsReport: React.FC<AnalyticsReportProps> = ({ fetchReport, title }) => {
    const theme = useTheme();
    const { data, loading, error } = useStatsData(fetchReport);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    /* ---------- pick the category ---------- */
    const stats: StatsData | null = useMemo(() => {
        if (!data || !selectedCategory) return null;
        return data[selectedCategory] || null;
    }, [data, selectedCategory]);

    /* ---------- build the pie data ---------- */
    const chartData: PieData[] = useMemo(() => {
        if (!stats) return [];
        return [
            { label: 'count', value: stats.count },
            { label: 'succeeded', value: stats.succeeded },
            { label: 'failed', value: stats.failed },
        ];
    }, [stats]);

    if (loading) return <Typography gutterBottom
        sx={{
            fontFamily: theme.typography.body2.fontFamily,
            fontSize: '1.5em',
            fontWeight: '700',
            color: theme.status.inProgress.backgroundColor,
            textAlign: 'left',
        }}>
        Loading&nbsp;{title}…
    </Typography>;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return (
        <Box sx={{ mb: 4 }}>
            <Typography gutterBottom
                sx={{
                    fontFamily: theme.typography.body2.fontFamily,
                    fontSize: '1.5em',
                    fontWeight: '700',
                    color: theme.status.inProgress.backgroundColor,
                    textAlign: 'left',
                }}>
                {title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                {data && Object.keys(data).map(cat => (
                    <Button
                        key={cat}
                        variant={cat === selectedCategory ? 'contained' : 'outlined'}
                        onClick={() => {
                            setSelectedCategory(cat);
                        }}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Button>
                ))}
            </Box>

            {stats && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <StatusCard
                            status="all"
                            count={stats.count}
                        />
                        <StatusCard
                            status="completed"
                            count={stats.succeeded}
                        />
                        <StatusCard
                            status="failed"
                            count={stats.failed}
                        />
                    </Box>
                    <PieChart data={chartData} />
                </Box>
            )}
        </Box>
    );
};

export default AnalyticsReport;