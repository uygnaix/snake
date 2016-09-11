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
            var fb = new FloatingBanner('start');
            this.addChild(fb);
            fb.move();
        }

        /**
         * 飘出关卡信息
         */
        public showLevelInfo(){

        }

        /**
         * 飘出目标分数
         */
        public showTargetScore(){

        }

        /**
         * 显示星星矩阵
         */
        public showStarMatrix(){

        }

        /**
         * 刷新顶部信息
         */
        public refreshTopStatus(){

        }

        public update(){

        }

        public gameOver(){

        }
    }
}