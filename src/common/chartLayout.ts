import * as d3 from 'd3';

export class ChartLayout {

    svg: SVGElement | any;
    margin: layoutMargin;
    width: number;
    height: number;
    chart: SVGElement | any;
    constructor(chartWidth: number, chartHeight: number) {
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
export interface layoutMargin {
  left: number;
  top: number;
  right: number;
  bottom: number;
}