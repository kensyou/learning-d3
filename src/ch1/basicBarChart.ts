import * as d3 from 'd3';
import { BasicChart } from './basicChart';
import { type1, layoutMargin } from './models';

export class BasicBarChart extends BasicChart {
    constructor(data: type1[], chartWidth: number, chartHeight: number) {
        super(data, chartWidth, chartHeight);
        let x = d3.scaleBand()
            .rangeRound([this.margin.left, this.width - this.margin.right]).paddingInner(0.1);
        let y = d3.scaleLinear().range([this.height, this.margin.bottom]);
        let xAxis = d3.axisBottom(x);
        let yAxis = d3.axisLeft(y);
        x.domain(data.map((d) => d.name));
        y.domain([0, d3.max(data, (d: type1) => d.population)]);
        this.chart.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0, ${this.height})`)
            .call(xAxis);
        this.chart.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(${this.margin.left}, 0)`)
            .call(yAxis);
        this.chart.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d) => { return x(d.name); })
            .attr('width', x.bandwidth())
            //.attr('y', (d) => { return y(d.population); })
            //.attr('height', (d) => { return this.height - y(d.population); });
            .attr('y', (d) => { return y(this.margin.bottom); })
            .attr('height', 0)
            .transition()
            .delay((d, i) => { return i * 60; })
            .duration(800)
            .attr('y', (d) => { return y(d.population); })
            .attr('height', (d) => this.height - y(d.population));
    }
}