module XYGBoy {
    /**
     *
     * @author Xiang.y
     *
     */
    export class GameScene extends egret.DisplayObjectContainer {

        private dotSize = 25;

        private gamePanel:DotSnakePanel;
        private gameController:DotControllerPanel;

        public constructor(width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.gamePanel = new DotSnakePanel(20, 10, this.dotSize);
            //调整gampanel的位置
            this.gamePanel.x = (width - this.gamePanel.width) / 2;
            this.addChildAt(this.gamePanel, 10);

            this.gameController = new DotControllerPanel(this.gamePanel, width, height);
            this.addChild(this.gameController);
        }
    }
}
