/**
 * Created by xiang on 10/3/16.
 */
module XYSweeper {
    import GridLayer = XY.GridLayer;
    export class SweeperScene extends egret.DisplayObjectContainer {

        private gridLayer: GridLayer;
        private controller: Controller;

        constructor(width: number, height: number) {
            super();
            this.width = width;
            this.height = height;
            this.loadGrid();
            this.start();
        }

        private loadGrid() {
            this.gridLayer = new GridLayer(this.width, this.height);
            this.addChild(this.gridLayer);
        }
        public running: boolean = false;
        public start() {
            this.controller = new Controller();
            this.addChild(this.controller);
            egret.startTick(this.update, this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                this.running = true;
            }, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                this.running = false;
            }, this);
        }
        
        public update(timeStamp: number): boolean {
            if (this.running) {
                this.controller.update();
            }
            return false;
        }
    }
}