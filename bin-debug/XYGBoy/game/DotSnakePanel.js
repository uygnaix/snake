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
            this.speed = 2;
            this.direction = new XYGBoy.DotMapDirector;
            egret.startTick(this.draw, this);
            this.initControllerEvent();
            //创建一个计时器对象
            this.timer = new egret.Timer(this.delay / this.speed, 0);
            //注册事件侦听器
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.gameTimer, this);
            //开始计时
            this.timer.start();
            //初始化食物
            this.feed();
            //初始化body
            this.map.turnOnDotAtGroup(this.body);
        }
        var d = __define,c=DotSnakePanel,p=c.prototype;
        p.draw = function (time) {
            return true;
        };
        p.gameTimer = function () {
            if (this.canEat()) {
                this.eat();
                //变长
                this.growUp(this.food);
                this.feed();
            }
            this.move();
            if (this.isOver()) {
                this.gameover();
            }
        };
        /**
         * 随机在可出现的范围内产生食物，线性化空闲位置坐标，使得保证随机在空点
         */
        p.feed = function () {
            var mapSize = this.map.getRow() * this.map.getColumn();
            var bodySize = this.body.points.length;
            var freeSpace = mapSize - bodySize;
            if (freeSpace == 0) {
            }
            var feedingPoint = Math.floor(Math.random() * freeSpace);
            this.food = this.feedingPoint2MapPointer(feedingPoint);
            this.map.flickerDotAtPointer(this.food);
        };
        /**
         * 食物随机位置转换成二维坐标
         */
        p.feedingPoint2MapPointer = function (feedingPoint) {
            var index = 0;
            for (var i = 0; i < this.map.getRow(); i++) {
                for (var j = 0; j < this.map.getColumn(); j++) {
                    if (this.map.getDotAt(i, j).getStatus() == XYGBoy.DotStatus.OFF) {
                        index++;
                        if (index == feedingPoint) {
                            return new XYGBoy.DotMapPointer(i, j);
                        }
                    }
                }
            }
            return null;
        };
        p.canEat = function () {
            return this.body.first().equals(this.food);
        };
        p.eat = function () {
            this.map.turnOnDotAtPointer(this.food);
        };
        p.growUp = function (food) {
            // 将食物吃到最后
            this.body.points.push(food);
        };
        p.move = function () {
            this.map.turnOffDotAtPointer(this.body.last());
            for (var i = this.body.size() - 1; i > 0; i--) {
                var dot = this.body.getAt(i);
                var pre = this.body.getAt(i - 1);
                dot.set(pre);
            }
            this.body.first().row += this.direction.row;
            this.body.first().column += this.direction.column;
            this.map.turnOnDotAtGroup(this.body);
        };
        p.isOver = function () {
            //自己撞自己,头在身体里
            for (var i = 1; i < this.body.size(); i++) {
                if (this.body.getAt(i).equals(this.body.first())) {
                    return true;
                }
            }
            //超出边界
            if (this.body.first().row >= this.map.getRow()
                || this.body.first().row < 0
                || this.body.first().column >= this.map.getColumn()
                || this.body.first().column < 0) {
                return true;
            }
            return false;
        };
        p.gameover = function () {
            this.timer.stop();
            this.gameScene.dispatchEvent(new XYGBoy.GameSceneEvent(XYGBoy.GameSceneEvent.GAMEOVER));
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
            if (this.direction.getStatus() != XYGBoy.DotMapDirection.DOWN)
                this.direction.up();
        };
        p.tapBtnDown = function () {
            if (this.direction.getStatus() != XYGBoy.DotMapDirection.UP)
                this.direction.down();
        };
        p.tapBtnLeft = function () {
            if (this.direction.getStatus() != XYGBoy.DotMapDirection.RIGHT)
                this.direction.left();
        };
        p.tapBtnRight = function () {
            if (this.direction.getStatus() != XYGBoy.DotMapDirection.LEFT)
                this.direction.right();
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
        return DotSnakePanel;
    }(egret.DisplayObjectContainer));
    XYGBoy.DotSnakePanel = DotSnakePanel;
    egret.registerClass(DotSnakePanel,'XYGBoy.DotSnakePanel');
})(XYGBoy || (XYGBoy = {}));
