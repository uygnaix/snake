module XYMount {
    import Point = XY.Point
    import Shape = egret.Shape;
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
        /**
         * 画点
         */
        public points:Array<Shape>=[];
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

        public drawPoints(points:Array<Point>){
        	for(let shape of this.points){
        		shape.parent.removeChild(shape);
					}
        	for(let i=0;i<points.length;i++){
        		if(this.points[i]==null){
        			this.points[i] = this.getPointShape();
						}
						let position = this.transToLocalCoordinate(points[i]);
        		this.points[i].x = position.x;
        		this.points[i].y = position.y;
        		this.addChild(this.points[i]);
					}
        }

        private getPointShape():Shape{
					var shp:egret.Shape = new egret.Shape();
					shp.graphics.lineStyle( 1, 0x00ff00 );
					shp.graphics.beginFill( 0xff0000, 1);
					shp.graphics.drawCircle( 0, 0, 3 );
					shp.graphics.endFill();
					return shp;
				}
    }
}