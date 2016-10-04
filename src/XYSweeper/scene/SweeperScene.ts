/**
 * Created by xiang on 10/3/16.
 */
module XYSweeper {
    import GridLayer = XY.GridLayer;
    export class SweeperScene extends egret.DisplayObjectContainer{

        private gridLayer:GridLayer;
        private controller:Controller;

        constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.loadGrid();
            this.start();
        }

        private loadGrid(){
            this.gridLayer = new GridLayer(this.width,this.height);
            this.addChild(this.gridLayer);
        }

        public start() {
            this.controller = new Controller();
            this.addChild(this.controller);
            egret.startTick(this.update,this);
        }

        private update(timeStamp:number):boolean {
            this.controller.update();
            return false;
        }
    }
}