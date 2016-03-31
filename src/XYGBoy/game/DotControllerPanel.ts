module XYGBoy {
    /**
     *
     * @author Xiang.y
     * 控制区域
     *
     */
    export class DotControllerPanel extends egret.DisplayObjectContainer {
        private gameMap:DotSnakePanel;
        private btnA:DotMap;
        private btnB;
        private btnUp;
        private btnDown;
        private btnRight;
        private btnLeft;

        public constructor(gameMap:DotSnakePanel, width:number, height:number) {
            super();
            this.width = width;
            this.height = height;
            this.gameMap = gameMap;
            this.initBtn();
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
            this.btnA = new DotMap(3, 3, 25);
            this.btnA.x = 600;
            this.btnA.y = 200;
            this.btnA.touchEnabled = true;
            this.addChild(this.btnA);
            this.btnA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnA, this);
        }

        private tapBtnA(event:egret.TouchEvent) {
            this.gameMap.dispatchEvent(new ControllerEvent(ControllerEvent.A));
        }

        private initBtnB() {
            this.btnB = new DotMap(4, 3, 25);
            this.btnB.x = 600;
            this.btnB.y = 400;
            this.btnB.touchEnabled = true;
            this.addChild(this.btnB);
            this.btnB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnB, this);
        }

        private tapBtnB(event:egret.TouchEvent) {
            var tapBEvent = new ControllerEvent(ControllerEvent.B);
            this.gameMap.dispatchEvent(tapBEvent);
        }

        private initBtnUp() {
            this.btnUp = new DotMap(4, 3, 25);
            this.btnUp.x = 100;
            this.btnUp.y = 100;
            this.btnUp.touchEnabled = true;
            this.addChild(this.btnUp);
            this.btnUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapBtnUp, this);
        }

        private tapBtnUp() {
            this.gameMap.dispatchEvent(new ControllerEvent(ControllerEvent.UP));
        }

        private initBtnDown() {
            this.btnDown = new DotMap(4, 3, 25);
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
            this.btnLeft = new DotMap(4, 3, 25);
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
            this.btnRight = new DotMap(4, 3, 25);
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
