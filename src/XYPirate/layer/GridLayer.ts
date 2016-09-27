/**
 * Created by xiang on 9/22/16.
 */
module XYPirate {
    export class GridLayer extends egret.DisplayObjectContainer {

        constructor(width:number,height:number){
            super();
            this.width = width;
            this.height = height;
            this.loadBG();
        }

        private loadBG() {
            var bg = new egret.Bitmap(RES.getRes('grid_bg_png'));
            bg.fillMode = egret.BitmapFillMode.REPEAT;
            bg.width = this.width;
            bg.height = this.height;
            this.addChild(bg);
        }
    }
}