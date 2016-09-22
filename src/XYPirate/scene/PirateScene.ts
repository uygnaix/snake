/**
 * Created by xiang on 9/22/16.
 */
module XYPirate {
    export class PirateScene extends egret.DisplayObjectContainer{

        constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.loadBG();
            this.start();
        }

        private loadBG() {
            var bg = new egret.Bitmap(RES.getRes('grid_bg_png'));
            bg.fillMode = egret.BitmapFillMode.REPEAT;
            bg.width = this.width;
            bg.height = this.height;
            this.addChild(bg);
        }

        public start() {
            var layer = new GridLayer();
            this.addChild(layer);
        }
    }
}