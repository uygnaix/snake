/**
 * Created by xiang on 10/2/16.
 */
module XYSweeper {
    import Shape = egret.Shape;
    /**
     * 地雷
     */
    export class Mine extends egret.Sprite{
        private shape:Shape;

        constructor(){
            super();
            this.draw();
        }

        public reset(){

        }

        private draw(){
            this.shape = new Shape();
            this.shape.graphics.beginFill(0x0000ff);
            this.shape.graphics.drawCircle(0,0,5);
            this.shape.graphics.endFill();
            this.addChild(this.shape);
        }
    }
}