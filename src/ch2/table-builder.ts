import * as d3 from 'd3';
export class TableBuilder {
    header: any[];
    data: any[];
    table: any;
    tableHeader: any;
    tableBody: any;
    rows: any;
    constructor(url) {
        this.load(url);
        this.table = d3.select('body').append('table')
            .attr('class', 'table2');
        this.tableHeader = this.table.append('thead');
        this.tableBody = this.table.append('tbody');

    }
    load(url) {
        d3.csv(url, (data) => {
            this.data = data;
            this.redraw();
        });
    }
    redraw() {
        let nested = d3.nest()
            .key(d => d['Raw_Guest_List'])
            .entries(this.data);
        this.data = nested.map(d => {
            let earliest = d.values.sort((a, b) => d3.ascending(a.YEAR, b.YEAR)).shift();

            return {
                name: d.key,
                category: earliest.Group,
                'earliest appearance': earliest.YEAR
            }
        });

        this.rows = this.tableBody.selectAll('tr').data(this.data);
        let newRows = this.rows.enter().append('tr');
        this.rows.exit().remove();

        newRows.selectAll('td')
            .data(d => d3.values(d))
            .enter()
            .append('td')
            .text(d => d);
        /*
          this.rows = this.tableBody.selectAll('tr').data(this.data);
          this.rows.exit().remove();
          let newRows = this.rows.enter().append('tr');
          let tds = newRows.selectAll('td')
              .data(d => d3.values(d))
              .enter()
              .append('td')
              .text(d => d);
          this.tableBody.selectAll('tr')
              .sort((a, b) => d3.ascending(a.Group, b.Group));*/
    }
    build() {
        return this.table;
    }
}