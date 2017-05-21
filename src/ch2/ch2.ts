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

let rings = 15;
let slices = 20;

let colors = d3.schemeCategory20b;
let angle = d3.scaleLinear().domain([0, slices]).range([0, 2 * Math.PI]);

/*let arc = d3.arc()
arc((d) => {
    innerRadius: d * 50 /rings
});
    .innerRadius(d => d * 50 / rings)
    .outerRadius(d => 50 + d * 50 / rings)
*/
