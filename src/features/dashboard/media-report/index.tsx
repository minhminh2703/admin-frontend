import { useEffect, useState } from 'react';
import { fetchMediaReport } from '../../../api/media-report.api';



export default function MediaReport() {
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleFetchReport = async () => {
        setLoading(true);
        try {
            const data = await fetchMediaReport();
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
        <div>
            <h1>Media Report</h1>
            <button onClick={handleFetchReport}>Refresh Report</button>
            {loading && <p>Loading...</p>}
            {loading ? <p>Loading...</p> : <pre>{JSON.stringify(reportData, null, 2)}</pre>}
        </div>
    );
}