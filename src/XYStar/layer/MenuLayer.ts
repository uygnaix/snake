/**
 * Created by xiang on 6/29/16.
 */
module XYStar {

    export class MenuLayer extends egret.DisplayObjectContainer {
        private startStarBtn:eui.Button;

        public constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.loadBG();
            this.loadButton();
        }

        public loadBG() {
            var bg = new egret.Bitmap(RES.getRes('bg_menuscene_jpg'));
            bg.width = this.width;
            bg.height = this.height;
            this.addChild(bg);
        }

        public loadButton() {

            this.startStarBtn = new eui.Button();
            this.startStarBtn.label = 'start';
            this.startStarBtn.width = 300;
            this.startStarBtn.x = (this.width - this.startStarBtn.width) / 2;
            this.startStarBtn.y = this.height * 0.6;
            this.startStarBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
            this.addChild(this.startStarBtn);
        }

        public start(event:egret.TouchEvent) {
            alert('start');
            var gs = new GameScene(this.width, this.height);
            this.stage.addChild(gs);
            this.parent.removeChild(this);
        }
    }
}
