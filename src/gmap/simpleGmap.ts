import * as d3 from 'd3';
import { ChartLayout } from '../common/chartLayout';

export class SimpleGmap extends ChartLayout {
    constructor(chartWidth: number, chartHeight: number) {
        super(chartWidth, chartHeight);
    }

    initMap(el: Element, google: any) {

        // http://www.colourlovers.com/palette/937624/Dance_To_Forget
        var colors = ['#FF4E50', '#FC913A', '#F9D423', '#EDE574', '#E1F5C4', '#FF4E50', '#FC913A', '#F9D423'];

        function SVGOverlay(map) {
            this.map = map;
            this.svg = null;
            this.coords = [];

            this.onPan = this.onPan.bind(this);

            this.setMap(map);
        }

        SVGOverlay.prototype = new google.maps.OverlayView();

        SVGOverlay.prototype.onAdd = function () {
            this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.svg.style.position = 'absolute';
            this.svg.style.top = 0;
            this.svg.style.left = 0;
            this.svg.style.width = '960px';
            this.svg.style.height = '500px';
            this.svg.style.pointerEvents = 'none';

            var bounds = this.map.getBounds(),
                center = bounds.getCenter(),
                ne = bounds.getNorthEast(),
                sw = bounds.getSouthWest();
            for (var i = 0; i < 40; i++) {
                this.coords.push({
                    id: i,
                    color: colors[i % colors.length],
                    latLng: new google.maps.LatLng(
                        center.lat() + (Math.random() - 0.5) * Math.abs(ne.lat() - sw.lat()),
                        center.lng() + (Math.random() - 0.5) * Math.abs(ne.lng() - sw.lng())
                    )
                });
            }

            var proj = this.getProjection();

            d3.select(this.svg)
                .attr('width', 960)
                .attr('height', 500)
                .append('g')
                .attr('class', 'coords')
                .selectAll('circle')
                .data(this.coords, (d: any) => d.id)
                .enter().append('circle')
                .attr('cx', (d) => proj.fromLatLngToContainerPixel(d.latLng).x)
                .attr('cy', (d) => proj.fromLatLngToContainerPixel(d.latLng).y)
                .attr('r', 5)
                .attr('fill', (d) => d.color);

            this.onPan();
            document.body.appendChild(this.svg);
            this.map.addListener('center_changed', this.onPan);
        };

        SVGOverlay.prototype.onPan = function () {
            var proj = this.getProjection();
            d3.select(this.svg)
                .select('.coords')
                .selectAll('circle')
                .data(this.coords)
                .attr('cx', (d: any) => proj.fromLatLngToContainerPixel(d.latLng).x)
                .attr('cy', (d: any) => proj.fromLatLngToContainerPixel(d.latLng).y);
        };

        SVGOverlay.prototype.onRemove = function () {
            this.map.removeListener('center_changed', this.onPan);
            this.svg.parentNode.removeChild(this.svg);
            this.svg = null;
        };

        SVGOverlay.prototype.draw = function () {
            console.log('draw');
        };

        var map = new google.maps.Map(el, {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            disableDefaultUI: true,
            backgroundColor: '#002732'
        });

        fetch('map-styles.json')
            .then((response) => response.json())
            .then(function (styles) {
                map.mapTypes.set('neutral-blue', new google.maps.StyledMapType(styles));
                map.setMapTypeId('neutral-blue');
            });

        var overlay = new SVGOverlay(map);
    };

}