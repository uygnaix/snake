module XYMount {
    import Point = XY.Point
    export class Coordinate {

        /**
         * 获取间隔的点
         */
        public computePoints(curve: ICurve, minX: number, maxX: number, step: number = 0.05): Array<Point> {
            let points = new Array<Point>();
            let xs = [];
            for (let x = minX; x < maxX + step; x += step) {
                xs.push(x);
            }
            for (let x of xs) {
                let y = curve.fun(x);
                points.push(new Point(x, y));
            }
            return points;
        }
    }
}