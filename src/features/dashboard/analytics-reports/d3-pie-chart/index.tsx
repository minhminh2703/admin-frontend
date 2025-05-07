import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export interface PieData {
    label: string;
    value: number;
}

interface PieChartProps {
    data: PieData[];
    width?: number;
    height?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, width = 200, height = 200 }) => {
    const ref = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove();

        const radius = Math.min(width, height) / 2;
        const pieGen = d3.pie<PieData>().value(d => d.value);
        const arcGen = d3.arc<d3.PieArcDatum<PieData>>().innerRadius(0).outerRadius(radius);

        const color = d3.schemeCategory10;
        const pieData = pieGen(data);

        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        g.selectAll('path')
            .data(pieData)
            .enter()
            .append('path')
            .attr('d', arcGen as any)
            .attr('fill', (_, i) => (color[i % color.length] as string))
            .style('cursor', 'pointer')
    }, [data, height, width]);

    return <svg ref={ref} />;
};

export default PieChart;