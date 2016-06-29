/**
 * Created by xiang on 6/29/16.
 */
module XYStar {
    export class MenuLayer extends egret.DisplayObjectContainer {
        public constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.loadBG();
        }
        public loadBG(){
            var bg = new egret.Bitmap( RES.getRes('bg_menuscene_jpg'));
            bg.width = this.width;
            bg.height = this.height;
            this.addChild(bg);
        }
    }
}
