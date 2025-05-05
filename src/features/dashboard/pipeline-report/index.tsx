import { useEffect, useState } from 'react';
import { fetchPipelineReport } from '../../../api/dashboard.api';
import { Typography, Box } from '@mui/material';
import { useTheme } from '../../../theme';

export default function PipelineReport() {
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const handleFetchReport = async () => {
        setLoading(true);
        try {
            const data = await fetchPipelineReport();
            setReportData(data);
        } catch (error) {
            console.error('Error fetching media report:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchReport();
    }, []);

    return (
        <Box>
            <Typography gutterBottom
                sx={{
                    fontFamily: theme.typography.body2.fontFamily,
                    fontSize: '1.5em',
                    fontWeight: '700',
                    color: theme.status.inProgress.backgroundColor,
                    textAlign: 'left',
                }} >
                PIPELINE REPORT
            </Typography>
            <button onClick={handleFetchReport}>Refresh Report</button>
            {loading && <p>Loading...</p>}
            {loading ? <p>Loading...</p> : <pre>{JSON.stringify(reportData, null, 2)}</pre>}
        </Box>
    );
}