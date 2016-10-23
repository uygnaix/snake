/**
 * Created by xiang on 10/20/16.
 */
module XYSweeper {
    export class Monitor extends egret.DisplayObjectContainer {
        private ticks: egret.TextField;
        private generation: egret.TextField;

        constructor(x,y,w,h) {
            super();
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.init();
        }
        private init() {
            this.ticks = new egret.TextField();
            this.ticks.text = '0';
            this.ticks.textColor = 0x3e3c3d;
            this.addChild(this.ticks);

            this.generation = new egret.TextField();
            this.generation.textColor = 0x43454a;
            this.generation.text = '0';
            this.addChild(this.generation);
            this.generation.x = this.x/2;
        }

        public setTicks(t: number) {
            this.ticks.text = t + '';
        }
        public setGeneration(g: number) {
            this.generation.text = g + '';
        }
    }
}