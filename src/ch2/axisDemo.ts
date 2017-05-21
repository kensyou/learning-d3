import * as d3 from 'd3';
import * as d3Symbol from 'd3-symbol-extra';
import { BasicChart } from '../ch1/basicChart';
import * as entries from 'lodash/fp/entries';
import * as forEach from 'lodash/fp/forEach';
import * as compose from 'lodash/fp/compose';

let applySelection = (sel) => ([key, value]) => sel.attr(key, value);
let applyAttr = (sel) => compose(() => sel, forEach(applySelection(sel)), entries);

let chart = new BasicChart([], 1000, 600);
let svg = chart.svg;

let x = d3.scaleLinear()
    .range([chart.margin.left, chart.width-chart.margin.right])
    .domain([0, 100]);
let axis = d3.axisBottom(x);
let axes = [
    d3.axisBottom(x),
    d3.axisBottom(x).ticks(5),
    d3.axisTop(x).tickValues([0,25,50,75,100])
        .tickFormat((d,i)=>['a','e','i','o','u'][i]) 
]
axes.forEach((axis, i)=>{
let a = svg.append('g')
    .classed('axis', true)
    .classed('dotted', i%2==0)
    .data(d3.range(0,100))
    .call(axis);
applyAttr(a)({transform: `translate(0,${i*50+chart.margin.top})`});


/*applyAttr(a.selectAll('path'))
    ({
        fill:'none',
        stroke:'steelblue',
        'stroke-width': 0.5
    });
applyAttr(a.selectAll('line'))
    ({
        fill: 'none',
        stroke: 'steelblue',
        'stroke-width': 0.3
    });*/
});
