import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { fetchMediaReport, fetchPipelineReport } from '../../api/dashboard.api'
import { StatsResponse } from '../../types/stats'
import PipelineAnnotation from '../dashboard/pipeline-annotation'
import AnalyticsReport from './analytics-status-reports'
import LollipopChart from './analytics-types-reports/lollipop-chart'
import WebTraffic from './web-traffic'

const Dashboard = () => {
    const [mediaStats, setMediaStats] = useState<StatsResponse | null>(null)
    const [articleStats, setArticleStats] = useState<StatsResponse | null>(null)

    useEffect(() => {
        fetchMediaReport().then(setMediaStats)
        fetchPipelineReport().then(setArticleStats)
    }, [])

    return (
        <Box
            sx={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '2em',
                px: '1em',
            }}
        >
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                gap={2}
            >
                <AnalyticsReport
                    fetchReport={fetchMediaReport}
                    title="MEDIA REPORT"
                />

                {mediaStats && (
                    <LollipopChart data={mediaStats} width={500} height={300} />
                )}
            </Box>
            <WebTraffic />

            <PipelineAnnotation />
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                gap={2}
            >
                <AnalyticsReport
                    fetchReport={fetchPipelineReport}
                    title="PIPELINE REPORT"
                />
                {articleStats && (
                    <LollipopChart
                        data={articleStats}
                        width={500}
                        height={300}
                    />
                )}
            </Box>
        </Box>
    )
}

export default Dashboard
