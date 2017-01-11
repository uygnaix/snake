/**
 * Created by xiang on 10/3/16.
 */
module XYMount {
    import GridLayer = XY.GridLayer;
    export class MountScene extends egret.DisplayObjectContainer {

        private gridLayer: GridLayer;
        private coordinateLayer: CoordinateLayer;

        constructor(width: number, height: number) {
            super();
            this.width = width;
            this.height = height;
            this.loadGrid();
            this.loadCoordinate();
            this.start();
            this.showInfo();
        }

        private loadGrid() {
            this.gridLayer = new GridLayer(this.width, this.height);
            this.addChild(this.gridLayer);
        }
        private loadCoordinate() {
            this.coordinateLayer = new CoordinateLayer(this.width, this.height, this.width / 3,  this.height / 2);
            this.addChild(this.coordinateLayer);
            this.coordinateLayer.densityX = 10;
            this.coordinateLayer.densityY = 8;
            this.coordinateLayer.draw(new MountCurve(), -10, 30, 0.01);
        }

        public running: boolean = false;
        public start() {

            egret.startTick(this.update, this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                this.running = true;
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                this.running = false;
            }, this);
        }

        public update(timeStamp: number): boolean {
            if (this.running) {

            }
            return false;
        }

        private showInfo() {
            //监视器放在右上角
            var mw = 200;

        }
    }
}