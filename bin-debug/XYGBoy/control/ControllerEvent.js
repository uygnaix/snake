var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author Xiang.y
     *
     */
    var ControllerEvent = (function (_super) {
        __extends(ControllerEvent, _super);
        function ControllerEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
        }
        var d = __define,c=ControllerEvent,p=c.prototype;
        ControllerEvent.UP = "up";
        ControllerEvent.DOWN = "down";
        ControllerEvent.LEFT = "left";
        ControllerEvent.RIGHT = "right";
        ControllerEvent.A = "a";
        ControllerEvent.B = "b";
        return ControllerEvent;
    }(egret.Event));
    XYGBoy.ControllerEvent = ControllerEvent;
    egret.registerClass(ControllerEvent,'XYGBoy.ControllerEvent');
})(XYGBoy || (XYGBoy = {}));
