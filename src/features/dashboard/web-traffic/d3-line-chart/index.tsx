import React, { useRef, useEffect, useMemo } from 'react';
import {
    select,
    scalePoint,
    scaleLinear,
    axisBottom,
    axisLeft,
    pointer,
} from 'd3';
import { line as d3Line, area as d3Area, curveMonotoneX } from 'd3-shape';


type Point = { date: string; value: number };

interface Props {
    data: Point[];
    width: number;
    height: number;
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
}

export function D3LineChart({
    data,
    width,
    height,
    margin = {}
}: Props) {
    const svgRef = useRef<SVGSVGElement>(null);

    // Default margin values with overrides from props
    const marginTop = margin.top ?? 20;
    const marginRight = margin.right ?? 20;
    const marginBottom = margin.bottom ?? 100;
    const marginLeft = margin.left ?? 40;

    // Memoize expensive computations
    const maxValue = useMemo(() => Math.max(...data.map(d => d.value)), [data]);
    const xValues = useMemo(() => data.map(d => d.date), [data]);

    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

        const innerW = width - marginLeft - marginRight;
        const innerH = height - marginTop - marginBottom;

        // Clear previous SVG content
        const svg = select<SVGSVGElement, unknown>(svgRef.current);
        svg.selectAll('*').remove();

        // Setup scales
        const xScale = scalePoint<string>()
            .domain(xValues)
            .range([0, innerW])
            .padding(0.5);

        const headRoom = 0.1 * maxValue;
        const adjustedMaxValue = maxValue + headRoom;
        const yScale = scaleLinear()
            .domain([0, adjustedMaxValue])
            .nice()
            .range([innerH, 0]);

        // Create generators
        const lineGenerator = d3Line<Point>()
            .curve(curveMonotoneX)
            .x(d => xScale(d.date) ?? 0)
            .y(d => yScale(d.value) ?? 0);

        const areaGenerator = d3Area<Point>()
            .curve(curveMonotoneX)
            .x(d => xScale(d.date) ?? 0)
            .y0(innerH)
            .y1(d => yScale(d.value) ?? 0);

        // Define gradient
        const defs = svg.append('defs');
        const gradient = defs.append('linearGradient')
            .attr('id', 'areaGrad')
            .attr('x1', '0').attr('y1', '0')
            .attr('x2', '0').attr('y2', '1');
        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#ff7300')
            .attr('stop-opacity', 0.4);
        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#ff7300')
            .attr('stop-opacity', 0.1);

        // Main chart group
        const g = svg.append<SVGGElement>('g')
            .attr('transform', `translate(${marginLeft},${marginTop})`);

        // Create axes
        const xAxis = g.append<SVGGElement>('g')
            .attr('transform', `translate(0,${innerH})`)
            .call(axisBottom(xScale)
                .tickSize(0)
                .tickPadding(12)
            );

        const yAxis = g.append<SVGGElement>('g')
            .attr('transform', `translate(0,0), ${innerH}`)
            .call(axisLeft(yScale)
                .tickSize(0)
                .tickPadding(12)
            );

        // Style axis text
        xAxis.selectAll('text')
            .attr('transform', d => (typeof d === 'string' && d.includes(':') ? 'rotate(-90)' : null))
            .attr('text-anchor', d => ((d as string).includes(':') ? 'end' : 'middle'))
            .attr('dx', d => ((d as string).includes(':') ? '-0.6em' : '0'))
            .attr('dy', d => (typeof d === 'string' && d.includes(':') ? '-0.3em' : '0.71em'));

        [xAxis, yAxis].forEach(axis => {
            axis.selectAll('text')
                .attr('font-family', 'Poppins, Sora, sans-serif')
                .attr('font-size', '13px')
                .attr('fill', '#F1EFEC');
        });

        // Draw area
        g.append<SVGPathElement>('path')
            .datum(data)
            .attr('fill', 'url(#areaGrad)')
            .attr('d', areaGenerator);

        // Draw line
        g.append<SVGPathElement>('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#ff7300')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator);

        // Setup tooltip
        const tooltip = g.append<SVGGElement>('g')
            .style('display', 'none')
            .attr('pointer-events', 'none');

        tooltip.append('circle')
            .attr('r', 5)
            .attr('fill', '#fff')
            .attr('stroke', '#ff7300')
            .attr('stroke-width', 2);

        return () => {

        };
    }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft, maxValue, xValues]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{
                overflow: 'visible'
            }}
            role="img"
            aria-label="Interactive line chart showing data over time"
        />
    );
}