var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author Xiang.y
     * 控制区域
     *
     */
    var DotControllerPanel = (function (_super) {
        __extends(DotControllerPanel, _super);
        function DotControllerPanel(gameMap, width, height) {
            _super.call(this);
            this.width = width;
            this.height = height;
            this.gameMap = gameMap;
            this.initBtn();
        }
        var d = __define,c=DotControllerPanel,p=c.prototype;
        p.initBtn = function () {
            this.initBtnA();
            this.initBtnB();
            this.initBtnUp();
            this.initBtnDown();
            this.initBtnLeft();
            this.initBtnRight();
        };
        p.initBtnA = function () {
            this.btnA = new XYGBoy.DotMap(3, 3, 25);
            this.btnA.x = 600;
            this.btnA.y = 200;
            this.btnA.touchEnabled = true;
            this.addChild(this.btnA);
            this.btnA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnA, this);
        };
        p.tapBtnA = function (event) {
            this.gameMap.dispatchEvent(new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.A));
        };
        p.initBtnB = function () {
            this.btnB = new XYGBoy.DotMap(4, 3, 25);
            this.btnB.x = 600;
            this.btnB.y = 400;
            this.btnB.touchEnabled = true;
            this.addChild(this.btnB);
            this.btnB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnB, this);
        };
        p.tapBtnB = function (event) {
            var tapBEvent = new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.B);
            this.gameMap.dispatchEvent(tapBEvent);
        };
        p.initBtnUp = function () {
            this.btnUp = new XYGBoy.DotMap(4, 3, 25);
            this.btnUp.x = 100;
            this.btnUp.y = 100;
            this.btnUp.touchEnabled = true;
            this.addChild(this.btnUp);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnUp, this);
        };
        p.tapBtnUp = function () {
            this.gameMap.dispatchEvent(new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.UP));
        };
        p.initBtnDown = function () {
            this.btnDown = new XYGBoy.DotMap(4, 3, 25);
            this.btnDown.x = 100;
            this.btnDown.y = 400;
            this.btnDown.touchEnabled = true;
            this.addChild(this.btnDown);
            this.btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnDown, this);
        };
        p.tapBtnDown = function () {
            this.gameMap.dispatchEvent(new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.DOWN));
        };
        p.initBtnLeft = function () {
            this.btnLeft = new XYGBoy.DotMap(4, 3, 25);
            this.btnLeft.x = 50;
            this.btnLeft.y = 250;
            this.btnLeft.touchEnabled = true;
            this.addChild(this.btnLeft);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnLeft, this);
        };
        p.tapBtnLeft = function () {
            this.gameMap.dispatchEvent(new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.LEFT));
        };
        p.initBtnRight = function () {
            this.btnRight = new XYGBoy.DotMap(4, 3, 25);
            this.btnRight.x = 150;
            this.btnRight.y = 250;
            this.btnRight.touchEnabled = true;
            this.addChild(this.btnRight);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnRight, this);
        };
        p.tapBtnRight = function () {
            this.gameMap.dispatchEvent(new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.RIGHT));
        };
        return DotControllerPanel;
    }(egret.DisplayObjectContainer));
    XYGBoy.DotControllerPanel = DotControllerPanel;
    egret.registerClass(DotControllerPanel,'XYGBoy.DotControllerPanel');
})(XYGBoy || (XYGBoy = {}));
