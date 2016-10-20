/**
 * Created by xiang on 10/20/16.
 */
module XYSweeper {
    export class Monitor extends egret.DisplayObjectContainer {
        private ticks: egret.TextField;
        private generation: egret.TextField;

        constructor() {
            super();
                var shape = new egret.Shape();
            shape.graphics.beginFill(0x0000ff);
            shape.graphics.drawCircle(0,0,5);
            shape.graphics.endFill();
            this.addChild(shape);
            this.init();

        }
        private init() {
            this.ticks = new egret.TextField();
            this.ticks.text = '0';
            this.addChild(this.ticks);
            this.generation = new egret.TextField();
            this.generation.text = '0';
            this.addChild(this.generation);
        }

        public setTicks(t: number) {
            this.ticks.text = t + '';
        }
        public setGeneration(g: number) {
            this.generation.text = g + '';
        }
    }
}