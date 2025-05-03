import React, { useRef, useEffect, useMemo } from 'react';
import {
    select,
    scalePoint,
    scaleLinear,
    axisBottom,
    axisLeft,
    pointer,
    transition,
} from 'd3';
import { line as d3Line, area as d3Area, curveMonotoneX, line } from 'd3-shape';


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
            .y0(innerH)                  // baseline at the bottom
            .y1(d => yScale(d.value) ?? 0);

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

        // Create axes (same as before)
        const xAxis = g.append<SVGGElement>('g')
            .attr('transform', `translate(0,${innerH})`)
            .call(axisBottom(xScale)
                .tickSize(0)
                .tickPadding(12));

        const yAxis = g.append<SVGGElement>('g')
            .call(axisLeft(yScale)
                .tickSize(0)
                .tickPadding(12));

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

        g.append<SVGPathElement>('path')
            .datum(data)
            .attr('fill', 'url(#areaGrad)')
            .attr('stroke', 'none')
            .attr('d', areaGenerator);

        g.append<SVGPathElement>('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#ff7300')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator);

        // Setup tooltip

        // Hover circle
        const hoverCircle = g.append('circle')
            .attr('r', 0)
            .attr('fill', '#ff7300')
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            .style('opacity', 0);

        // Tooltip background
        const tooltipWidth = 150;
        const tooltipHeight = 60;

        const tooltip = g.append('g')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('pointer-events', 'none');

        const tooltipBg = tooltip.append('rect')
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeight)
            .attr('rx', 4)
            .attr('fill', 'rgba(30, 30, 30, 0.9)')


        // Tooltip date text
        const tooltipDate = tooltip.append('text')
            .attr('x', 10)
            .attr('y', 20)
            .attr('font-family', 'Poppins, Sora, sans-serif')
            .attr('font-size', '15px')
            .attr('fill', '#F1EFEC');

        // Tooltip value text
        const tooltipValue = tooltip.append('text')
            .attr('x', 10)
            .attr('y', 38)
            .attr('font-family', 'Poppins, Sora, sans-serif')
            .attr('font-size', '15px')
            .attr('fill', '#ff7300');

        const getValueAtX = (mouseX: number) => {
            const points = data
                .map(d => ({ date: d.date, value: d.value, x: xScale(d.date) ?? 0 }))
                .sort((a, b) => a.x - b.x);

            let leftIdx = 0, rightIdx = points.length - 1;
            for (let i = 0; i < points.length - 1; i++) {
                if (mouseX >= points[i].x && mouseX <= points[i + 1].x) {
                    leftIdx = i; rightIdx = i + 1;
                    break;
                }
            }

            const leftPoint = points[leftIdx];
            const rightPoint = points[rightIdx];
            if (mouseX === leftPoint.x) return leftPoint;
            if (mouseX === rightPoint.x) return rightPoint;

            const ratio = (mouseX - leftPoint.x) / (rightPoint.x - leftPoint.x);
            return {
                date: ratio < 0.5 ? leftPoint.date : rightPoint.date,
                value: leftPoint.value + ratio * (rightPoint.value - leftPoint.value),
                x: mouseX,
            };
        };

        const handleMouseMove = (event: MouseEvent) => {
            const [mouseX] = pointer(event, g.node()!);
            const interpolatedData = getValueAtX(mouseX);
            // Update hover circle
            hoverCircle
                .attr("cx", mouseX)
                .attr("cy", yScale(interpolatedData.value) ?? 0)
                .attr("r", 5)
                .style("opacity", 1);

            tooltip
                .attr("transform", `translate(${interpolatedData.x + 10},${yScale(interpolatedData.value) - 30})`)
                .style("opacity", 1);
            tooltipDate.text(interpolatedData.date);
            tooltipValue.text(interpolatedData.value.toFixed(2));
        };

        const handleMouseLeave = () => {
            hoverCircle.style("opacity", 0);
            tooltip.style("opacity", 0);
        };

        svg
            .on("mousemove", handleMouseMove)
            .on("mouseleave", handleMouseLeave);

        return () => {
            svg.on("mousemove", null).on("mouseleave", null);
        };
    }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft, maxValue, xValues]);

    return (
        <svg
            ref={svgRef}
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{
                overflow: 'visible',
                backgroundColor: 'transparent'
            }}
            role="img"
            aria-label="Interactive line chart showing data over time"
        />
    );
}