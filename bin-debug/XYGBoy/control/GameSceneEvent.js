var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author
     *
     */
    var GameSceneEvent = (function (_super) {
        __extends(GameSceneEvent, _super);
        function GameSceneEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=GameSceneEvent,p=c.prototype;
        GameSceneEvent.GAMEOVER = 'game_over';
        GameSceneEvent.WIN = 'win';
        return GameSceneEvent;
    })(egret.Event);
    XYGBoy.GameSceneEvent = GameSceneEvent;
    egret.registerClass(GameSceneEvent,'XYGBoy.GameSceneEvent');
})(XYGBoy || (XYGBoy = {}));
