module XYGBoy {
    /**
     *
     * @author Xiang.y
     * 控制区域
     *
     */
    export class DotControllerPanel extends egret.DisplayObjectContainer {
        private gameMap:DotSnakePanel;
        private btnA:egret.Bitmap;
        private btnB:egret.Bitmap;
        private btnUp:egret.Bitmap;
        private btnDown:egret.Bitmap;
        private btnRight:egret.Bitmap;
        private btnLeft:egret.Bitmap;

        public constructor(gameMap:DotSnakePanel, width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.gameMap = gameMap;
            this.initBtn();
            this.initBG();
        }
        private initBG(){
            
        }

        private initBtn() {
            this.initBtnA();
            this.initBtnB();
            this.initBtnUp();
            this.initBtnDown();
            this.initBtnLeft();
            this.initBtnRight();
        }

        private initBtnA() {
            this.btnA = new egret.Bitmap(RES.getRes('btn_a_png'));
            this.btnA.x = 600;
            this.btnA.y = 200;
            this.btnA.width = 100;
            this.btnA.height = 100;
            this.btnA.touchEnabled = true;
            this.addChild(this.btnA);
            this.btnA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnA, this);
        }

        private tapBtnA(event:egret.TouchEvent) {
            this.gameMap.dispatchEvent(new ControllerEvent(ControllerEvent.A));
        }

        private initBtnB() {
            this.btnB = new egret.Bitmap(RES.getRes('btn_b_png'));
            this.btnB.x = 600;
            this.btnB.y = 400;
            this.btnB.width = 100;
            this.btnB.height = 100;
            this.btnB.touchEnabled = true;
            this.addChild(this.btnB);
            this.btnB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnB, this);
        }

        private tapBtnB(event:egret.TouchEvent) {
            var tapBEvent = new ControllerEvent(ControllerEvent.B);
            this.gameMap.dispatchEvent(tapBEvent);
        }

        private initBtnUp() {
            this.btnUp = new egret.Bitmap(RES.getRes('btn_up_png'));
            this.btnUp.x = 100;
            this.btnUp.y = 100;
            this.btnUp.width = 100;
            this.btnUp.height = 100;
            this.btnUp.touchEnabled = true;
            this.addChild(this.btnUp);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnUp, this);
        }

        private tapBtnUp() {
            this.gameMap.dispatchEvent(new ControllerEvent(ControllerEvent.UP));
        }

        private initBtnDown() {
            this.btnDown = new egret.Bitmap(RES.getRes('btn_down_png'));
            this.btnDown.width = 100;
            this.btnDown.height = 100;
            this.btnDown.x = 100;
            this.btnDown.y = 400;
            this.btnDown.touchEnabled = true;
            this.addChild(this.btnDown);
            this.btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnDown, this);
        }

        private tapBtnDown() {
            this.gameMap.dispatchEvent(new ControllerEvent(ControllerEvent.DOWN));
        }

        private initBtnLeft() {
            this.btnLeft = new egret.Bitmap(RES.getRes('btn_left_png'));
            this.btnLeft.width = 100;
            this.btnLeft.height = 100;
            this.btnLeft.x = 50;
            this.btnLeft.y = 250;
            this.btnLeft.touchEnabled = true;
            this.addChild(this.btnLeft);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnLeft, this);
        }

        private tapBtnLeft() {
            this.gameMap.dispatchEvent(new ControllerEvent(ControllerEvent.LEFT));
        }

        private initBtnRight() {
            this.btnRight = new egret.Bitmap(RES.getRes('btn_right_png'));
            this.btnRight.width = 100;
            this.btnRight.height = 100;
            this.btnRight.x = 150;
            this.btnRight.y = 250;
            this.btnRight.touchEnabled = true;
            this.addChild(this.btnRight);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnRight, this);
        }

        private tapBtnRight() {
            this.gameMap.dispatchEvent(new ControllerEvent(ControllerEvent.RIGHT));
        }
    }
}
