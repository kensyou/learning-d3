import * as d3 from 'd3';
import { BasicChart } from '../ch1/basicChart';

export class UlamSpiral extends BasicChart {
    constructor(data) {
        super(data, 800, 800);
        let dot = d3.symbol().type(d3.symbolCircle).size(3),
            center = 400,
            l = 2,
            x = (x, l) => center + l * x,
            y = (y, l) => center + l * y;
    }
/*    generatePrimes(n){
        function* numbers(start){
            while(true){
                yield start++;
            }
        }
        function* primes(){
            var seq = <any>numbers(2);
            var prime;
            while (true){
                prime = seq.next().value;
                yield prime;
            }
        }
    }*/

    generateSpiral(n) {
        let spiral = <{ x: number, y: number, n: number }[]>[],
            x = 0, y = 0,
            min = [0, 0],
            max = [0, 0],
            add = [0, 0],
            direction = 0,
            directions = {
                up: [0, -1],
                left: [-1, 0],
                down: [0, 1],
                right: [1, 0]
            };
        d3.range(1, n).forEach((i) => {
            spiral.push({ x: x, y: y, n: i });
            add = directions[['up', 'left', 'down', 'right'][direction]];
            x += add[0], y += add[1];
            if (x < min[0]) {
                direction = (direction + 1) % 4;
                min[0] = x;
            }
            if (x > max[0]) {
                direction = (direction + 1) % 4;
                max[0] = x;
            }
            if (y < min[1]) {
                direction = (direction + 1) % 4;
                min[1] = y;
            }
            if (y > max[1]) {
                direction = (direction + 1) % 4;
                max[1] = y;
            }
        });
        return spiral;
    }
}
