import * as d3 from 'd3';
import { BasicChart } from '../ch1/basicChart';
import * as entries from 'lodash/fp/entries';
import * as forEach from 'lodash/fp/forEach';
import * as compose from 'lodash/fp/compose';

let applySelection = (sel) => ([key, value]) => sel.attr(key, value);
let applyAttr = (sel) => compose(() => sel, forEach(applySelection(sel)), entries);

let chart = new BasicChart([], 1800, 1600);
let svg = chart.svg;

let sine = d3.range(0, 10).map(
    (k) => [0.5 * k * Math.PI, Math.sin(0.5 * k * Math.PI)]
);

let x =
    d3.scaleLinear()
        .range([0, chart.width / 2 - (chart.margin.left + chart.margin.right)])
        .domain(d3.extent(sine, (d) => d[0]));

let y =
    d3.scaleLinear()
        .range([chart.height / 2 - (chart.margin.top + chart.margin.bottom), 0])
        .domain([-1, 1]);

let line = d3.line()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));

let g = svg.append('g');
applyAttr(g.append('path').datum(sine))
    ({
        'd': line,
        stroke: 'steelblue',
        'stroke-width': 2,
        fill: 'none'
    });
applyAttr(g.append('path').datum(sine))
    ({
        'd': line.curve(d3.curveStepBefore),
        stroke: 'black',
        'stroke-width': 1,
        fill: 'none'
    });
let g2 = applyAttr(svg.append('g'))
    ({ transform: `translate(${chart.width / 2 + (chart.margin.left + chart.margin.right)}, ${chart.margin.top})` })

let area = d3.area()
    .x((d) => x(d[0]))
    .y0(chart.height / 2)
    .y1((d) => y(d[1]))
    .curve(d3.curveBasis);

applyAttr(g2.append('path')
    .datum(sine))
    ({
        d: area,
        fill: 'steelblue',
        'fill-opacity': 0.4
    });
applyAttr(g2.append('path')
    .datum(sine))
    ({
        d: d3.line().curve(d3.curveBasis)
            .x((d) => x(d[0]))
            .y((d) => y(d[1])),
        stroke: 'steelblue',
        'stroke-width': 2,
        fill: 'none'
    });
  