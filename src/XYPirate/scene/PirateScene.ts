/**
 * Created by xiang on 9/22/16.
 */
module XYPirate {
    export class PirateScene extends egret.DisplayObjectContainer{

        private gridLayer:GridLayer;
        private controlLayer:ControlLayer;

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
        private loadControl(){
            this.controlLayer = new ControlLayer();
            this.addChild(this.controlLayer);
        }
        public start() {

        }
    }
}