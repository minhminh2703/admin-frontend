import OverallStatistic from './overall-statistic';
import WebTraffic from './web-traffic';
import { fetchMediaReport, fetchPipelineReport } from '../../api/dashboard.api';
import AnalyticsReport from './analytics-reports';


const Dashboard = () => {
    return (
        <div style={{
            overflowY: 'auto',         
        }}>
            <OverallStatistic />
            <WebTraffic />
            <AnalyticsReport
                fetchReport={fetchMediaReport}
                title="MEDIA REPORT"
            />
            <AnalyticsReport
                fetchReport={fetchPipelineReport}
                title="PIPELINE REPORT"
            />
        </div>
    );
}

export default Dashboard;