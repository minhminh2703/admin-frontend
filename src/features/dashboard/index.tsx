import OverallStatistic from './overal-statistic';
import WebTraffic from './web-traffic';
import MediaReport from './media-report';

const Dashboard = () => {
    return (
        <>
            <OverallStatistic />
            <WebTraffic />
            <MediaReport />
        </>
    );
}

export default Dashboard;