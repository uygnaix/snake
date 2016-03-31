var XYGBoy;
(function (XYGBoy) {
    /**
     *
     * @author Xiang.y
     *
     */
    var DotSnakePanel = (function (_super) {
        __extends(DotSnakePanel, _super);
        function DotSnakePanel(row, col, dotSize) {
            _super.call(this);
            this.speed = 1;
            this.delay = 1000;
            this.width = col * dotSize;
            this.height = row * dotSize;
            this.map = new XYGBoy.DotMap(row, col, dotSize);
            this.body = new XYGBoy.DotMapPointerGroup();
            this.body.points.push(new XYGBoy.DotMapPointer(row / 2, col / 2));
            this.addChild(this.map);
            this.speed = 1;
            this.direction = new XYGBoy.DotMapDirection;
            egret.startTick(this.draw, this);
            this.initControllerEvent();
            //创建一个计时器对象
            this.timer = new egret.Timer(this.delay / this.speed, 0);
            //注册事件侦听器
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.gameTimer, this);
            //开始计时
            this.timer.start();
        }

        var d = __define, c = DotSnakePanel, p = c.prototype;
        p.draw = function (time) {
            this.map.turnOffAllDot();
            this.map.turnOnDotAtGroup(this.body);
            return true;
        };
        p.gameTimer = function () {
            this.body.first().row += this.direction.row;
            this.body.first().column += this.direction.column;
        };
        p.speedUp = function () {
            this.speed++;
            this.timer.delay = this.delay / this.speed;
        };
        p.speedDown = function () {
            if (this.speed > 1)
                this.speed--;
            this.timer.delay = this.delay / this.speed;
        };
        /**
         * 随机在可出现的范围内产生食物
         */
        p.feed = function () {
            var mapSize = this.map.getRow() * this.map.getColumn();
            var bodySize = this.body.points.length;
            var freeSpace = mapSize - bodySize;
        };
        p.eat = function () {
        };
        p.initControllerEvent = function () {
            this.addEventListener(XYGBoy.ControllerEvent.A, this.tapBtnA, this);
            this.addEventListener(XYGBoy.ControllerEvent.B, this.tapBtnB, this);
            this.addEventListener(XYGBoy.ControllerEvent.UP, this.tapBtnUp, this);
            this.addEventListener(XYGBoy.ControllerEvent.DOWN, this.tapBtnDown, this);
            this.addEventListener(XYGBoy.ControllerEvent.LEFT, this.tapBtnLeft, this);
            this.addEventListener(XYGBoy.ControllerEvent.RIGHT, this.tapBtnRight, this);
        };
        p.tapBtnA = function () {
            this.speedUp();
        };
        p.tapBtnB = function () {
            this.speedDown();
        };
        p.tapBtnUp = function () {
            this.direction.up();
        };
        p.tapBtnDown = function () {
            this.direction.down();
        };
        p.tapBtnLeft = function () {
            this.direction.left();
        };
        p.tapBtnRight = function () {
            this.direction.right();
        };
        return DotSnakePanel;
    })(egret.DisplayObjectContainer);
    XYGBoy.DotSnakePanel = DotSnakePanel;
    egret.registerClass(DotSnakePanel, 'XYGBoy.DotSnakePanel');
})(XYGBoy || (XYGBoy = {}));
