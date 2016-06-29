/**
 * Created by xiang on 6/29/16.
 */
module XYStar {
    export class MenuScene extends egret.DisplayObjectContainer {
        public constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.addChild(new MenuLayer(width,height));
        }
    }
}