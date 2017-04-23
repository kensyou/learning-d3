import * as d3 from 'd3';
import { type1, layoutMargin } from './models';
export class BasicChart {
    data: type1[];
    svg: SVGElement | any;
    margin: layoutMargin;
    width: number;
    height: number;
    chart: SVGElement | any;
    constructor(data: type1[], chartWidth: number, chartHeight: number) {
        this.data = data;
        this.svg = d3.select('div#chart').append('svg');
        this.margin = {
            left: 30,
            top: 30,
            right: 30,
            bottom: 30
        };
        this.svg.attr('width', chartWidth);
        this.svg.attr('height', chartHeight);
        this.width = chartWidth - this.margin.left - this.margin.right;
        this.height = chartHeight - this.margin.top - this.margin.bottom;
        this.chart = this.svg.append('g')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    }
}