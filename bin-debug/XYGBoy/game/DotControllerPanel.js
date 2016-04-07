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
            this.initBG();
            this.initBtn();
        }
        var d = __define,c=DotControllerPanel,p=c.prototype;
        p.initBG = function () {
            var bg = new egret.Bitmap(RES.getRes('bg_png'));
            bg.width = this.width;
            bg.height = this.height;
            this.addChildAt(bg, -1);
        };
        p.initBtn = function () {
            this.initBtnA();
            this.initBtnB();
            this.initBtnUp();
            this.initBtnDown();
            this.initBtnLeft();
            this.initBtnRight();
        };
        p.initBtnA = function () {
            this.btnA = new egret.Bitmap(RES.getRes('btn_a_png'));
            this.btnA.x = 367;
            this.btnA.y = 652;
            this.btnA.width = 100;
            this.btnA.height = 100;
            this.btnA.touchEnabled = true;
            this.addChild(this.btnA);
            this.btnA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnA, this);
        };
        p.tapBtnA = function (event) {
            this.gameMap.dispatchEvent(new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.A));
        };
        p.initBtnB = function () {
            this.btnB = new egret.Bitmap(RES.getRes('btn_b_png'));
            this.btnB.x = 297;
            this.btnB.y = 746;
            this.btnB.width = 100;
            this.btnB.height = 100;
            this.btnB.touchEnabled = true;
            this.addChild(this.btnB);
            this.btnB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnB, this);
        };
        p.tapBtnB = function (event) {
            var tapBEvent = new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.B);
            this.gameMap.dispatchEvent(tapBEvent);
        };
        p.initBtnUp = function () {
            this.btnUp = new egret.Bitmap(RES.getRes('btn_up_png'));
            this.btnUp.x = 100;
            this.btnUp.y = 652;
            this.btnUp.width = 100;
            this.btnUp.height = 100;
            this.btnUp.touchEnabled = true;
            this.addChild(this.btnUp);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnUp, this);
        };
        p.tapBtnUp = function () {
            this.gameMap.dispatchEvent(new XYGBoy.ControllerEvent(XYGBoy.ControllerEvent.UP));
        };
        p.initBtnDown = function () {
            this.btnDown = new egret.Bitmap(RES.getRes('btn_down_png'));
            this.btnDown.width = 100;
            this.btnDown.height = 100;
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
            this.btnLeft = new egret.Bitmap(RES.getRes('btn_left_png'));
            this.btnLeft.width = 100;
            this.btnLeft.height = 100;
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
            this.btnRight = new egret.Bitmap(RES.getRes('btn_right_png'));
            this.btnRight.width = 100;
            this.btnRight.height = 100;
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
