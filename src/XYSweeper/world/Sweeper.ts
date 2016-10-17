/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    import Shape = egret.Shape;
    export class Sweeper extends egret.Sprite {

        public brain: NeuronNet;
        //面对方向,初始方法望向x轴正方向
        public lookAt: Array<number> = [1, 0];
        //转动角度,弧度为单位
        public rotationR: number = 0;
        public speed: number;

        //左侧履带速度
        public leftTrack: number;
        //右侧履带速度
        public rightTrack: number;

        //适应性分数
        public fitness: number;
        //最近的地雷
        public closestMine: Mine;

        private leftShape: Shape;
        private rightShape: Shape;
        private coreShape: Shape;

        constructor() {
            super();
            this.reset();
        }

        /**
         *  进化大脑
         * @param weights
         */
        public evolve(weights: Array<number>) {
            this.brain.evolve(weights);
        }

        /**
         * 重置状态
         */
        public reset() {
            this.draw();
            //随机位置出现
            var position = Environment.randomPosition();
            this.x = position[0];
            this.y = position[1];
        }
        /**
         * 注入大脑权重
         */
        public injectBrain(weights: Array<number>) {
            this.brain.evolve(weights);
        }

        /**
         * 利用探测处的地雷更新人工网络
         */
        public update(mines: Array<Mine>) {
            //获取输入
            var inputs: Array<number> = [];
            var target: Mine = this.getClosestMine(mines);
            inputs = inputs.concat(this.getTargetVector());
            inputs = inputs.concat(this.lookAt);
            //计算输出
            var output = this.brain.update(inputs);
            this.leftTrack = output[0];
            this.rightTrack = output[1];
            //更新状态
            this.updateLookAt();
            this.updateSpeed();
            this.updatePosition();
        }

        /**
         * 计算转动角度,弧度为单位,定义为左轮减去右轮的力
         * 更新视线向量
         */
        private updateLookAt() {
            this.rotationR += (this.rightTrack-this.leftTrack);
            //更新视线角度
            this.lookAt[0] = Math.cos(this.rotationR);
            this.lookAt[1] = Math.sin(this.rotationR);
            //更新模型,弧度话角度
            this.rotation = 180*this.rotationR/Math.PI;
        }
        private updateSpeed() {
            this.speed = this.leftTrack + this.rightTrack;
        }

        /**
         * 更新位置
         */
        private updatePosition() {
            this.x += this.lookAt[0] * this.speed;
            this.y += this.lookAt[1] * this.speed;
            //若到达边缘,则让扫雷机实行环绕,从而掉头
            this.x = Math.min(this.x, Environment.ZONE_RIGHT);
            this.x = Math.max(this.x, Environment.ZONE_LEFT);
            this.y = Math.min(this.y, Environment.ZONE_BOTTOM);
            this.y = Math.max(this.y, Environment.ZONE_TOP);
        }

        /**
         * 获取目标向量
         */
        private getTargetVector(): Array<number> {
            if (this.closestMine) {
                var dx = this.closestMine.x - this.x;
                var dy = this.closestMine.y - this.y;
                return Sweeper.norm(dx, dy);
            }
            return [];
        }

        /**
         * 获取最近的地雷
         */
        public getClosestMine(mines: Array<Mine>) {
            if (!mines || mines.length == 0) {
                return null;
            }
            this.closestMine = mines[0];
            var minDistance: number = this.getDistanceSquare(this.closestMine);
            for (var i = 1; i < mines.length; i++) {
                var distance = this.getDistanceSquare(mines[i]);
                if (distance < minDistance) {
                    this.closestMine = mines[i];
                    minDistance = distance;
                }
            }
            return this.closestMine;
        }

        /**
         * 获取距离的平方
         */
        public getDistanceSquare(mine: Mine) {
            return (mine.x - this.x) ^ 2 + (mine.y - this.y) ^ 2;
        }

        /**
         * 扫描机是否发现地雷,允许发现多个
         * 与地雷距离平方为一定数值则表示发现
         */
        public findMine(mines: Array<Mine>): Array<Mine> {
            var found: Array<Mine> = [];
            for (var i = 0; i < mines.length; i++) {
                if (this.getDistanceSquare(mines[i]) < Environment.MAX_FIND_DISTANCE) {
                    found.push(mines[i]);
                }
            }
            return found;
        }

        /**
         * 归一化向量
         */
        private static norm(x, y) {
            var length = Math.pow(Math.pow(x,2) + Math.pow(y,2),0.5);
            return [x / length, y / length];
        }

        /**
         * 将force限定在min与max中间
         */
        private static clamp(force: number, min: number, max: number): number {
            force = Math.min(force, max);
            force = Math.max(force, min);
            return force;
        }

        /**
         * 绘制扫描仪
         */
        public draw() {
            this.drawLeft();
            this.drawCore();
            this.drawRight();
        }
        private drawLeft() {
            this.leftShape = new Shape();
            this.leftShape.graphics.beginFill(0xf70000);
            this.leftShape.graphics.drawRect(0, 0, 20, 4);
            this.leftShape.graphics.endFill();
            this.addChild(this.leftShape);
        }
        private drawRight() {
            this.rightShape = new Shape();
            this.rightShape.graphics.beginFill(0xf70000);
            this.rightShape.graphics.drawRect(0, 12, 20, 4);
            this.rightShape.graphics.endFill();
            this.addChild(this.rightShape);
        }
        private drawCore() {
            this.coreShape = new Shape();
            this.coreShape.graphics.beginFill(0x00ff00);
            this.coreShape.graphics.drawCircle(4, 8, 4);
            this.coreShape.graphics.endFill();
            this.addChild(this.coreShape);
        }
    }
}