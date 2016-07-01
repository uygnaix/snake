module XYStar {
    /**
     * GameScene
     */
   export class GameScene extends egret.DisplayObjectContainer {
        constructor(width:number,height:number) {
            super();
            this.width = width;
            this.height = height;
            this.start();
        }
        public start(){
            var label = new egret.TextField();
            label.text = 'start';
            label.x = this.width/2;
            this.addChild(label);
            var fb = new FloatingBanner('strat');
            this.addChild(fb);
            fb.move();
        }
    }
}