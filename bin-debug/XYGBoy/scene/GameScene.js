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
            this.gamePanel = new XYGBoy.DotSnakePanel(20, 10, this.dotSize);
            //调整gampanel的位置
            this.gamePanel.x = (width - this.gamePanel.width) / 2;
            this.addChildAt(this.gamePanel, 10);
            this.gameController = new XYGBoy.DotControllerPanel(this.gamePanel, width, height);
            this.addChild(this.gameController);
        }

        var d = __define, c = GameScene, p = c.prototype;
        return GameScene;
    })(egret.DisplayObjectContainer);
    XYGBoy.GameScene = GameScene;
    egret.registerClass(GameScene, 'XYGBoy.GameScene');
})(XYGBoy || (XYGBoy = {}));
