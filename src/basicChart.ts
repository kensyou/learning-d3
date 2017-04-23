import * as d3 from 'd3';
import {type1, layoutMargin} from './models';
export class BasicChart {
  data: type1[];
  svg: SVGElement | any;
  margin: layoutMargin;
  width: number;
  height: number;
  chart: SVGElement | any;
  constructor(data) {
    this.data = data;
    this.svg = d3.select('div#chart').append('svg');
    this.margin = {
      left: 30,
      top: 30,
      right: 30,
      bottom: 30
    };
    this.svg.attr('width', window.innerWidth);
    this.svg.attr('height', window.outerHeight);
    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = window.outerHeight - this.margin.top - this.margin.bottom;
    this.chart = this.svg.append('g')
      .attr('width', this.width)
      .attr('height', this.height)
.attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }
}