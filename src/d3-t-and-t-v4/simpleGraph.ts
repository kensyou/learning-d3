import { ChartLayout } from '../common/chartLayout';
import * as d3 from 'd3';

export class SimpleGraph extends ChartLayout {
    constructor(chartWidth: number, chartHeight: number) {
        super(chartWidth, chartHeight);
        let parseTime = d3.timeParse("%d-%b-%y");
        let x = d3.scaleTime().range([0, this.width]);
        let y = d3.scaleLinear().range([this.height, 0]);
 
        let valueLine = d3.line()
            .x((d: any) => x(d.date))
            .y((d: any) => y(d.close));
        d3.csv('./d3-t-and-t-v4/data/data.csv', (error, dat) => {
            if (error) throw error; 
            let data = dat.map((d: any) => <Data>{
                date: parseTime(d.date),
                close: +d.close
            })
            x.domain(<Date[]>d3.extent(data, (d) => d.date));
            y.domain([0, <number>d3.max(data, (d) => d.close)]);

            // Add the valueline path.
            this.chart.append("path")
                .data([data])
                .attr("class", "line")
                .attr("d", valueLine);

            // Add the X Axis
            this.chart.append("g")
                .attr("transform", "translate(0," + this.height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            this.chart.append("g")
                .call(d3.axisLeft(y));
        });
    }
}
class Data {
    date: Date;
    close: number;
}