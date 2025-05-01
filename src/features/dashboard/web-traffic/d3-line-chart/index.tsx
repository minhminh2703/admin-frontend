import React, { useRef, useEffect } from 'react'
import {
    select,
    scalePoint,
    scaleLinear,
    axisBottom,
    axisLeft,
    extent,
    pointer,
} from 'd3'
import { line as d3Line, area as d3Area, curveMonotoneX } from 'd3-shape'
import { bisector } from 'd3-array'

type Point = { date: string; value: number }

interface Props {
    data: Point[]
    width: number
    height: number
}

export function D3LineChart({ data, width, height }: Props) {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (!svgRef.current) return

        const margin = { top: 20, right: 30, bottom: 30, left: 40 }
        const innerW = width - margin.left - margin.right
        const innerH = height - margin.top - margin.bottom

        const xValues = data.map(d => d.date)

        // Scales
        const xScale = scalePoint()
            .domain(xValues)
            .range([0, innerW])
            .padding(0.5)

        const yScale = scaleLinear()
            .domain([0, Math.max(...data.map(d => d.value))])
            .nice()
            .range([innerH, 0])

        // Generators
        const lineGenerator = d3Line<Point>()
            .curve(curveMonotoneX)
            .x(d => xScale(d.date)!)
            .y(d => yScale(d.value))

        const areaGenerator = d3Area<Point>()
            .curve(curveMonotoneX)
            .x(d => xScale(d.date)!)
            .y0(innerH)
            .y1(d => yScale(d.value))

        // Clear previous svg content
        const svg = select(svgRef.current)
        svg.selectAll('*').remove()

        // Define gradient
        const defs = svg.append('defs')
        const gradient = defs.append('linearGradient')
            .attr('id', 'areaGrad')
            .attr('x1', '0').attr('y1', '0')
            .attr('x2', '0').attr('y2', '1')
        gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#ff7300')
            .attr('stop-opacity', 0.4)
        gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#ff7300')
            .attr('stop-opacity', 0)

        // Main group
        const g = svg
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)

        // Axes
        g.append('g')
            .attr('transform', `translate(0,${innerH})`)
            .call(axisBottom(xScale))

        g.append('g')
            .call(axisLeft(yScale))

        // Draw area
        g.append('path')
            .datum(data)
            .attr('fill', 'url(#areaGrad)')
            .attr('d', areaGenerator)

        // Draw line
        const linePath = g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', '#ff7300')
            .attr('stroke-width', 2)
            .attr('d', lineGenerator)

        // Invisible hover path
        const hoverPath = g.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'transparent')
            .attr('stroke-width', 12)
            .attr('d', lineGenerator)

        // Tooltip setup
        const tooltip = g.append('g').style('display', 'none')
        tooltip.append('circle')
            .attr('r', 5)
            .attr('fill', '#fff')
            .attr('stroke', '#ff7300')
            .attr('stroke-width', 2)
        tooltip.append('rect')
            .attr('x', 8)
            .attr('y', -24)
            .attr('width', 100)
            .attr('height', 24)
            .attr('fill', 'rgba(255,255,255,0.8)')
            .attr('rx', 4)
        const tipText = tooltip.append('text')
            .attr('x', 12)
            .attr('y', -8)
            .style('font-size', '12px')
            .attr('fill', '#333')

        // Bisector
        const bisectIndex = bisector<Point, string>(d => d.date).center

        hoverPath
            .on('mouseover', () => tooltip.style('display', null))
            .on('mouseout', () => tooltip.style('display', 'none'))
            .on('mousemove', (event) => {
                const [mx] = pointer(event, g.node()!)
                const index = Math.round((mx / innerW) * (xValues.length - 1))
                const x0 = xValues[Math.max(0, Math.min(index, xValues.length - 1))]
                const i = bisectIndex(data, x0)
                const d = data[i]
                const prev = data[Math.max(i - 1, 0)]
                const rel = prev.value
                    ? ((d.value - prev.value) / prev.value * 100).toFixed(1) + '%'
                    : '–'

                tooltip.attr('transform', `translate(${xScale(d.date)},${yScale(d.value)})`)
                tipText.text(`${d.date}: ${d.value} (${rel})`)
            })

    }, [data, width, height])

    return <svg ref={svgRef} width={width} height={height} />
}