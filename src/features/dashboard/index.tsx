import OverallStatistic from './overal-statistic';
import WebTraffic from './web-traffic';
import PipelineReport from './pipeline-report';

const Dashboard = () => {
    return (
        <div style={{
            overflowY: 'auto',         
        }}>
            <OverallStatistic />
            <WebTraffic />
            <PipelineReport />
        </div>
    );
}

export default Dashboard;