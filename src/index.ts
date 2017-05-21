import * as d3 from 'd3';

//require('./ch1/ch1');
/*r
require('./ch2/ch2');
*/
//require('./ch3/ch3');
require('./index.css');
//import { SimpleGraph } from './d3-t-and-t-v4/simpleGraph';
import { SimpleGmap } from './gmap/simpleGmap';
let gmap = new SimpleGmap(960, 500);
//let sg = new SimpleGraph(800, 600);

declare var window: {
    initMap: Function,
    google: any
}

window.initMap = () => {
    let mapElem = document.querySelector('#map');
    if (mapElem) gmap.initMap(mapElem, window.google);
}