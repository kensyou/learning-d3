import * as d3 from 'd3';
interface type1{
  name: string;
  population: number;
}
export class BasicChart {
  data: type1[];
  svg: SVGElement | any;
  margin: any;
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
export class BasicBarChart extends BasicChart {
  constructor(data) {
    super(data);
    let x = d3.scaleBand()
        .rangeRound([this.margin.left, this.width - this.margin.right]).paddingInner(0.1);
    let y = d3.scaleLinear().range([this.height, this.margin.bottom]);
    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);
    x.domain(data.map((d) => d.name));
    y.domain([0, d3.max(data, (d:type1) => d.population)]);
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
        .attr('y', (d) => { return y(d.population); })
        .attr('height', (d) => { return this.height - y(d.population); });
  }
}

var data = require('./data/chapter1.json'); // Data from UNHCR, 2015.11.01: http://data.unhcr.org/api/population/regional.json

let totalNumbers = data.filter((obj) => {return obj.population.length; })
  .map((obj) => {
    return {
      name: obj.name,
      population: Number(obj.population[0].value)
    };
  });
var chart = new BasicBarChart(totalNumbers);