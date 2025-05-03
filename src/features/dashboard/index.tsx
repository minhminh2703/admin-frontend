import OverallStatistic from './overal-statistic';
import WebTraffic from './web-traffic';
import MediaReport from './media-report';

const Dashboard = () => {
    return (
        <div style={{
            overflowY: 'auto',         // Enable vertical scrolling
        }}>
            <OverallStatistic />
            <WebTraffic />
            {/* <MediaReport /> */}
        </div>
    );
}

export default Dashboard;