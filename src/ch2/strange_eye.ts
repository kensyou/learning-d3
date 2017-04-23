import * as d3 from 'd3';
import { TableBuilder } from './table-builder';
import { BasicChart } from '../ch1/basicChart';
import * as entries from 'lodash/fp/entries';
import * as forEach from 'lodash/fp/forEach';
import * as compose from 'lodash/fp/compose';

let applySelection = (sel) => ([key, value]) => sel.attr(key, value);
let applyAttr = (sel) => compose(forEach(applySelection(sel)), entries);

let svg = new BasicChart([], 1800, 1600).chart;
applyAttr(svg.append('text').text('A picture!'))
    ({ x: 10, y: 150, "text-anchor": "start" });
applyAttr(svg.append('line'))
    ({ x1: 10, y1: 10, x2: 100, y2: 100, stroke: 'blue', 'stroke-width': 3 });
applyAttr(svg.append('rect'))
    ({ x: 200, y: 50, width: 300, height: 400, stroke: 'green', 'stroke-width': 0.5, fill: 'white', rx: 20, ry: 40 });
applyAttr(svg.append('circle'))
    ({ cx: 350, cy: 250, r: 100, fill: 'green', 'fill-opacity': 0.5, stroke: 'steelblue', 'stroke-width': 2 });
applyAttr(svg.append('ellipse'))
    ({cx: 350,
      cy: 250,
      rx: 150,
      ry: 70,
      fill: 'green',
      'fill-opacity': 0.3,
      stroke: 'steelblue',
      'stroke-width': 0.7
    });
applyAttr(svg.append('ellipse'))
    ({cx: 350,
      cy: 250,
      rx: 20,
      ry: 70
    });
svg.selectAll('ellipse, circle')
    .attr('transform', 'translate(150, 0)');

/*
let url =
    'https://cdn.rawgit.com/fivethirtyeight/data/master/daily-show-guests/daily_show_guests.csv';
let table = new TableBuilder(url).build();

*/