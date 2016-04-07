var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author Xiang.y
     *
     */
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene(width, height) {
            _super.call(this);
            this.dotSize = 25;
            this.width = width;
            this.height = height;
            this.snake();
        }
        var d = __define,c=GameScene,p=c.prototype;
        p.showGameOver = function () {
            alert('game over');
            this.snake();
        };
        p.snake = function () {
            this.gamePanel = new XYGBoy.DotSnakePanel(20, 10, this.dotSize);
            //游戏进程控制
            this.gamePanel.gameScene = this;
            this.addEventListener(XYGBoy.GameSceneEvent.GAMEOVER, this.showGameOver, this);
            //调整gampanel的位置
            this.gamePanel.x = (this.width - this.gamePanel.width) / 2;
            this.gameController = new XYGBoy.DotControllerPanel(this.gamePanel, this.width, this.height);
            this.addChildAt(this.gameController, 0);
            this.addChildAt(this.gamePanel, 10);
        };
        return GameScene;
    }(egret.DisplayObjectContainer));
    XYGBoy.GameScene = GameScene;
    egret.registerClass(GameScene,'XYGBoy.GameScene');
})(XYGBoy || (XYGBoy = {}));
