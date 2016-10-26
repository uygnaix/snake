/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    import Shape = egret.Shape;
    /**
     * 地雷
     */
    export class Mine extends egret.Sprite {
        private shape: Shape = new Shape();

        constructor() {
            super();
            this.reset();
        }

        public reset() {
            this.draw();
            //随机位置出现
            var position = Environment.randomPosition();
            this.x = position[0];
            this.y = position[1];
        }

        private draw() {
            this.shape.graphics.beginFill(0x0000ff);
            this.shape.graphics.drawCircle(0, 0, 5);
            this.shape.graphics.endFill();
            this.addChild(this.shape);
        }
    }
}