/**
 * Created by xiang on 8/12/16.
 */
module XYHRD {
    /**
     * GameScene
     */
    export class GameScene extends egret.DisplayObjectContainer {
        private gameLayer:GameLayer;

        constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.loadData();
            this.loadBG();
            this.start();
        }

        private loadBG() {
            var bg = new egret.Bitmap(RES.getRes('main_bg0_png'));
            bg.width = this.width;
            bg.height = this.height;
            this.addChild(bg);
        }

        /**
         * 载入必须数据
         */
        private loadData() {
            //载入角色数据
            Role.load();
            //载入关卡数据
            Level.load();
        }

        public start() {
            this.gameLayer = new GameLayer(0);
            this.gameLayer.x = Constant.PADDING_LEFT;
            this.gameLayer.y = Constant.PADDING_TOP;
            this.addChild(this.gameLayer);
        }
    }
}