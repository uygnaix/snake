module XYMount {
    import Point = XY.Point
    export class CoordinateLayer extends egret.DisplayObjectContainer {

        /**
         * 坐标轴
         */
        private coordinate: Coordinate = new Coordinate();
        /**
         * 原点坐标
         */
        public origin: Point = new Point(0, 0);
        /**
         * 点阵密度X
         */
        public densityX: number = 1;
        /**
         * 点阵密度Y
         */
        public densityY: number = 1;
        constructor(width: number, height: number, originX: number = 0, originY: number = 0) {
            super();
            this.width = width;
            this.height = height;
            this.origin = new Point(originX, originY);
        }

        /**
         * 绘制曲线方程
         */
        public draw(curve: ICurve, minX: number, maxX: number, step: number) {
            let points = this.coordinate.computePoints(curve, minX, maxX, step);
            if (points.length > 0) {
                var shape = new egret.Shape();
                shape.graphics.lineStyle(2, 0x00ff00);
                let start = this.transToLocalCoordinate(points[0]);
                shape.graphics.moveTo(start.x, start.y);
                for (let i = 1; i < points.length; i++) {
                    let local = this.transToLocalCoordinate(points[i]);
                    shape.graphics.lineTo(local.x, local.y);
                }
                shape.graphics.endFill;
                this.addChild(shape);
            }
        }

        private transToLocalCoordinate(point: Point): Point {
            return new Point(this.origin.x + point.x * this.densityX, this.origin.y - point.y * this.densityY);
        }
    }
}